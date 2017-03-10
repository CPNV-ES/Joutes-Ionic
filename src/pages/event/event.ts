import {Component} from '@angular/core';
import {NavController, Refresher} from 'ionic-angular';
import {TeamService} from "../../providers/team-service";
import {TournamentService} from "../../providers/tournament-service";
import {SharedDataService} from '../../providers/sharedData-service';
import {Storage} from '@ionic/storage';
import {TeamPage} from "../team/team";
import {TournamentPage} from "../tournament/tournament";
import {ParticipantService} from "../../providers/participant-service";
import {ParticipantPage} from "../participant/participant";


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
    public event: any;
    private teams: any;
    public tournaments: any;
    public participants: any;
    public filteredParticipants: any;
    public filteredTeams: any;
    public searchTermTeam: string = '';
    public searchTermParticipant: string = '';
    public userFavoritesTeamsPromise: any;
    public userFavoritesTeamsIds: any;
    public eventContent: any;

    constructor(public navCtrl: NavController, public storage: Storage,
                public teamProvider: TeamService, public tournamentProvider: TournamentService,
                public participantProvider: ParticipantService, public sharedDataProvider: SharedDataService) {
        this.loadData();
        this.eventContent = "teams";
    }

    loadData() {
        this.sharedDataProvider.httpError = false;
        // Get the current event
        this.event = this.sharedDataProvider.getCurrentEvent();
        // Get the current favorite teams
        this.userFavoritesTeamsPromise = this.sharedDataProvider.getCurrentEventFavoritesTeams();

        this.userFavoritesTeamsPromise.then(val => {
            // If val contain something, add the favorite teams and separate different teams with a ","
            if (val) {
                this.userFavoritesTeamsIds = val.split(',');
            }
            // Get teams by event
            this.teamProvider.getTeamsByEvent(this.event.id).subscribe(data => {
                this.teams = data.teams;
                this.filteredTeams = data.teams;
                this.filterTeams();
            });
        }).catch(e => {
            console.log(e);
        });

        // Get tournaments by event
        this.tournamentProvider.getTournamentsByEvent(this.event.id).subscribe(data => {
            this.tournaments = data.tournaments;
        });

        // Get participants by event
        this.participantProvider.getParticipantsByEvent(this.event.id).subscribe(data => {
            this.participants = data.participants;
            this.filteredParticipants = this.participants;
        });
    }

    refresh(refresher: Refresher) {
        this.loadData();

        setTimeout(() => {
            refresher.complete();
        }, 1000);
    }

    // Filter teams
    filterTeams() {
        var self = this;
        this.filteredTeams = this.teams.filter((team) => {
            return team.name.toLowerCase().indexOf(this.searchTermTeam.toLowerCase()) > -1;
        });
        // Put the favorites in front of the array
        var temp = [];

        this.filteredTeams.forEach(function (team) {
            // If we have no favorite, do nothing
            if (self.userFavoritesTeamsIds) {
                // Add the favorite in front of the array
                if (self.userFavoritesTeamsIds.indexOf(team.id.toString()) != -1) {
                    team.favorite = true;
                    temp.unshift(team);
                }
                // If it's not a favorite add it at the end
                else {
                    team.favorite = false;
                    temp.push(team)
                }
                self.filteredTeams = temp;
            }
        });
    }

    // Filter participants
    filterParticipants() {
        this.filteredParticipants = this.participants.filter((participant) => {
            var participantFullName = participant.lastname + ' ' + participant.firstname;
            return participantFullName.toLowerCase().indexOf(this.searchTermParticipant.toLowerCase()) > -1;
        });
    }

    // Toggle favorite teams
    toggleFavoriteTeam(team) {
        // Get the current favorite teams
        this.userFavoritesTeamsPromise = this.sharedDataProvider.getCurrentEventFavoritesTeams();

        this.userFavoritesTeamsPromise.then(val => {
            // If val contain something, add the favorite teams and separate different teams with a ","
            if (val) {
                this.userFavoritesTeamsIds = val.split(',');
                var index = this.userFavoritesTeamsIds.indexOf(team.id.toString());

                // Set no favorite teams
                if (index != -1) {
                    this.userFavoritesTeamsIds.splice(index, 1);
                    team.favorite = false;
                }
                // Set favorite teams
                else {
                    this.userFavoritesTeamsIds.push(team.id);
                    team.favorite = true;
                }
            }
            //If val contain nothing, set the first one
            else {
                this.userFavoritesTeamsIds = [team.id];
                team.favorite = true;
            }
            // Set the current favorite teams
            this.sharedDataProvider.setCurrentEventFavoritesTeams(this.userFavoritesTeamsIds.toString());
        }).catch(e => {
            console.log(e);
        });
    }

    setSegment(segment) {
        this.eventContent = segment;
    }

    // Go to page detail team
    goToTeam(team) {
        // Add a spinner when the view is loaded
        document.getElementById('spinnerContent').style.visibility = 'visible';

        this.sharedDataProvider.setCurrentTeam(team);
        this.navCtrl.push(TeamPage);
    }

    // Go to page detail tournament
    goToTournament(tournament) {
        // Add a spinner when the view is loaded
        document.getElementById('spinnerContent').style.visibility = 'visible';

        this.sharedDataProvider.setCurrentTournament(tournament);
        this.navCtrl.push(TournamentPage);
    }

    // Go to page detail participant
    goToParticipant(participant) {
        // Add a spinner when the view is loaded
        document.getElementById('spinnerContent').style.visibility = 'visible';

        this.sharedDataProvider.setCurrentParticipant(participant);
        this.navCtrl.push(ParticipantPage);
    }

    // Add a spinner when the view is loading
    ionViewDidLoad() {
        document.getElementById('spinnerContent').style.visibility = 'hidden';
    }
}