import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
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

    constructor(public navCtrl: NavController, public storage: Storage, public teamProvider: TeamService, public tournamentProvider: TournamentService, public participantProvider: ParticipantService, public sharedDataProvider: SharedDataService) {
        this.event = this.sharedDataProvider.getCurrentEvent();
        this.userFavoritesTeamsPromise = this.sharedDataProvider.getCurrentEventFavoritesTeams();

        this.userFavoritesTeamsPromise.then(val => {
            if (val) {
                this.userFavoritesTeamsIds = val.split(',');
            }
            this.teamProvider.getTeamsByEvent(this.event.id).subscribe(data => {
                this.teams = data.teams;
                this.filteredTeams = data.teams;
                this.filterTeams();
            });
        }).catch(e => {
            console.log(e);
        });

        this.tournamentProvider.getTournamentsByEvent(this.event.id).subscribe(data => {
            this.tournaments = data.tournaments;
        });

        this.participantProvider.getParticipantsByEvent(this.event.id).subscribe(data => {
            this.participants = data.participants;
            this.filteredParticipants = this.participants;
        });

        this.eventContent = "teams";
    }

    filterTeams() {
        var self = this;
        this.filteredTeams = this.teams.filter((team) => {
            return team.name.toLowerCase().indexOf(this.searchTermTeam.toLowerCase()) > -1;
        });
        //Put the favorites in front of the array
        var temp = [];

        this.filteredTeams.forEach(function (team) {
            //If we have no favorite, do nothing
            if (self.userFavoritesTeamsIds) {
                if (self.userFavoritesTeamsIds.indexOf(team.id.toString()) != -1) {
                    //Add the favorite in front of the array
                    team.favorite = true;
                    temp.unshift(team);
                }
                else {
                    //If it's not a favorite add it at the end
                    team.favorite = false;
                    temp.push(team)
                }
                self.filteredTeams = temp;
            }
        });
    }

    filterParticipants() {
        this.filteredParticipants = this.participants.filter((participant) => {
            var participantFullName = participant.lastname + ' ' + participant.firstname;
            return participantFullName.toLowerCase().indexOf(this.searchTermParticipant.toLowerCase()) > -1;
        });
    }

    toggleFavoriteTeam(team) {
        this.userFavoritesTeamsPromise = this.sharedDataProvider.getCurrentEventFavoritesTeams();

        this.userFavoritesTeamsPromise.then(val => {
            if (val) {
                this.userFavoritesTeamsIds = val.split(',');
                var index = this.userFavoritesTeamsIds.indexOf(team.id.toString());
                if (index != -1) {
                    this.userFavoritesTeamsIds.splice(index, 1);
                    team.favorite = false;
                }
                else {
                    this.userFavoritesTeamsIds.push(team.id);
                    team.favorite = true;
                }
            }
            else {
                //If we have no value, set the first one
                this.userFavoritesTeamsIds = [team.id];
                team.favorite = true;
            }
            this.sharedDataProvider.setCurrentEventFavoritesTeams(this.userFavoritesTeamsIds.toString());
        }).catch(e => {
            console.log(e);
        });
    }

    goToTeam(team) {
        document.getElementById('spinnerContent').style.visibility = 'visible';
        this.sharedDataProvider.setCurrentTeam(team);
        this.navCtrl.push(TeamPage);
    }

    goToTournament(tournament) {
        document.getElementById('spinnerContent').style.visibility = 'visible';
        this.sharedDataProvider.setCurrentTournament(tournament);
        this.navCtrl.push(TournamentPage);
    }

    goToParticipant(participant) {
        document.getElementById('spinnerContent').style.visibility = 'visible';
        this.sharedDataProvider.setCurrentParticipant(participant);
        this.navCtrl.push(ParticipantPage);
    }

    ionViewDidLoad() {
        document.getElementById('spinnerContent').style.visibility = 'hidden';
    }
}