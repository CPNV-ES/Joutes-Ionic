import {Component} from '@angular/core';
import {NavController, Refresher} from 'ionic-angular';
import {TeamService} from "../../providers/team-service";
import {TournamentService} from "../../providers/tournament-service";
import {SharedDataService} from '../../providers/sharedData-service';
import {TeamPage} from "../team/team";
import {TournamentPage} from "../tournament/tournament";
import {ParticipantService} from "../../providers/participant-service";
import {ParticipantPage} from "../participant/participant";
import {Observable} from "rxjs";


/*
 Generated class for the Teams page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-event',
    templateUrl: 'event.html'
})
export class EventPage {
    private _event;
    private _teams;
    private _tournaments;
    private _participants;
    private _filteredParticipants;
    private _filteredTeams;
    private _searchTermTeam: string = '';
    private _searchTermParticipant: string = '';
    private _userFavoritesTeamsPromise;
    private _userFavoritesTeamsIds;
    private _eventContent;

    get event() {
        return this._event;
    }

    get eventContent() {
        return this._eventContent;
    }

    set eventContent(value) {
        this._eventContent = value;
    }

    get filteredParticipants() {
        return this._filteredParticipants;
    }

    get filteredTeams() {
        return this._filteredTeams;
    }

    get tournaments() {
        return this._tournaments;
    }

    get searchTermTeam() {
        return this._searchTermTeam;
    }

    set searchTermTeam(value) {
        this._searchTermTeam = value;
    }

    get searchTermParticipant() {
        return this._searchTermParticipant;
    }

    set searchTermParticipant(value) {
        this._searchTermParticipant = value;
    }

    constructor(private navCtrl: NavController,
                private teamProvider: TeamService, private tournamentProvider: TournamentService,
                private participantProvider: ParticipantService, private sharedDataProvider: SharedDataService) {
        this.loadData().subscribe();
        this._eventContent = "teams";
    }

    loadData() {
        this.sharedDataProvider.httpError = false;
        // Get the current _event
        this._event = this.sharedDataProvider.currentEvent;
        // Get the current favorite teams
        this._userFavoritesTeamsPromise = this.sharedDataProvider.currentEventFavoritesTeams;

        const o1 = Observable.fromPromise(this._userFavoritesTeamsPromise.then(val => {
            // If val contain something, add the favorite teams and separate different teams with a ","
            if (val) {
                this._userFavoritesTeamsIds = val.split(',');
            }
            // Get teams by _event
            this.teamProvider.getTeamsByEvent(this._event.id).subscribe(data => {
                this._teams = data.teams;
                this._filteredTeams = data.teams;
                this.filterTeams();
            });
        }).catch(e => {
            console.log(e);
        }));

        // Get tournaments by _event
        const o2 = this.tournamentProvider.getTournamentsByEvent(this._event.id).do(data => {
            this._tournaments = data.tournaments;
        });

        // Get participants by _event
        const o3 = this.participantProvider.getParticipantsByEvent(this._event.id).do(data => {
            this._participants = data.participants;
            this._filteredParticipants = this._participants;
        });
        return Observable.forkJoin(o1, o2, o3);
    }

    // Refresh the current page
    refresh(refresher: Refresher) {
        this.loadData().subscribe(null, () => refresher.complete(), () => refresher.complete());
    }

    // Filter teams
    filterTeams() {
        var self = this;
        this._filteredTeams = this._teams.filter((team) => {
            return team.name.toLowerCase().indexOf(this._searchTermTeam.toLowerCase()) > -1;
        });
        // Put the favorites in front of the array
        var temp = [];

        this._filteredTeams.forEach(function (team) {
            // If we have no favorite, do nothing
            if (self._userFavoritesTeamsIds) {
                // Add the favorite in front of the array
                if (self._userFavoritesTeamsIds.indexOf(team.id.toString()) != -1) {
                    team.favorite = true;
                    temp.unshift(team);
                }
                // If it's not a favorite add it at the end
                else {
                    team.favorite = false;
                    temp.push(team)
                }
                self._filteredTeams = temp;
            }
        });
    }

    // Filter participants
    filterParticipants() {
        this._filteredParticipants = this._participants.filter((participant) => {
            var participantFullName = participant.lastname + ' ' + participant.firstname;
            return participantFullName.toLowerCase().indexOf(this._searchTermParticipant.toLowerCase()) > -1;
        });
    }

    // Toggle favorite teams
    toggleFavoriteTeam(team) {
        // Get the current favorite teams
        this._userFavoritesTeamsPromise = this.sharedDataProvider.currentEventFavoritesTeams;

        this._userFavoritesTeamsPromise.then(val => {
            // If val contain something, add the favorite teams and separate different teams with a ","
            if (val) {
                this._userFavoritesTeamsIds = val.split(',');
                var index = this._userFavoritesTeamsIds.indexOf(team.id.toString());

                // Set no favorite teams
                if (index != -1) {
                    this._userFavoritesTeamsIds.splice(index, 1);
                    team.favorite = false;
                }
                // Set favorite teams
                else {
                    this._userFavoritesTeamsIds.push(team.id);
                    team.favorite = true;
                }
            }
            //If val contain nothing, set the first one
            else {
                this._userFavoritesTeamsIds = [team.id];
                team.favorite = true;
            }
            // Set the current favorite teams
            this.sharedDataProvider.currentEventFavoritesTeams = this._userFavoritesTeamsIds.toString();
        }).catch(e => {
            console.log(e);
        });
    }

    // Content de different segments for a _event
    setSegment(segment) {
        this._eventContent = segment;
    }

    // Go to page detail team
    goToTeam(team) {
        // Add a spinner when the view is loaded
        document.getElementById('spinnerContent').style.visibility = 'visible';

        this.sharedDataProvider.currentTeam = team;
        this.navCtrl.push(TeamPage);
    }

    // Go to page detail _tournament
    goToTournament(tournament) {
        // Add a spinner when the view is loaded
        document.getElementById('spinnerContent').style.visibility = 'visible';

        this.sharedDataProvider.currentTournament = tournament;
        this.navCtrl.push(TournamentPage);
    }

    // Go to page detail _participant
    goToParticipant(participant) {
        // Add a spinner when the view is loaded
        document.getElementById('spinnerContent').style.visibility = 'visible';

        this.sharedDataProvider.currentParticipant = participant;
        this.navCtrl.push(ParticipantPage);
    }

    // Add a spinner when the view is loading
    ionViewDidLoad() {
        document.getElementById('spinnerContent').style.visibility = 'hidden';
    }
}