import { Component } from '@angular/core';
import { NavController, Refresher } from 'ionic-angular';
import { TeamService } from "../../providers/team-service";
import { TournamentService } from "../../providers/tournament-service";
import { SharedDataService } from '../../providers/sharedData-service';
import { TeamPage } from "../team/team";
import { TournamentPage } from "../tournament/tournament";
import { ParticipantService } from "../../providers/participant-service";
import { ParticipantPage } from "../participant/participant";
import { SearchPage } from "../search/search";
import { Observable } from "rxjs";
import { NotificationService } from "../../providers/notification-service";


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

    get participants() {
        return this._participants;
    }

    get teams() {
        return this._teams;
    }

    get tournaments() {
        return this._tournaments;
    }

    constructor(private navCtrl: NavController,
        private teamProvider: TeamService,
        private tournamentProvider: TournamentService,
        private participantProvider: ParticipantService,
        private notificationProvider: NotificationService,
        private sharedDataProvider: SharedDataService) {
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
                this.sortTeams();
                this.filterTeams();
            });
        }).catch(e => {
            console.log(e);
        }));

        // Get tournaments by _event
        const o2 = this.tournamentProvider.getTournamentsByEvent(this._event.id).do(data => {
            this._tournaments = data.tournaments;
            this.sortTournaments();
        });

        // Get participants by _event
        const o3 = this.participantProvider.getParticipantsByEvent(this._event.id).do(data => {
            this._participants = data.participants;
            this.sortParticipants();
        });
        return Observable.forkJoin(o1, o2, o3);
    }

    // Refresh the current page
    refresh(refresher: Refresher) {
        this.loadData().subscribe(null, () => refresher.complete(), () => refresher.complete());
    }

    // Filter teams
    filterTeams() {
        var self = this
        // Put the favorites in front of the array
        var temp = []

        this._teams.forEach(function(team) {
            // If we have no favorite, do nothing
            if (self._userFavoritesTeamsIds) {
                // Add the favorite in front of the array
                if (self._userFavoritesTeamsIds.indexOf(team.id.toString()) != -1) {
                    team.favorite = true
                    self.initializeNotifications(team).subscribe()
                    temp.unshift(team)
                }
                // If it's not a favorite add it at the end
                else {
                    team.favorite = false
                    temp.push(team)
                }
                self._teams = temp
            }
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
                    this._userFavoritesTeamsIds.push(team.id.toString());
                    team.favorite = true;
                }
            }
            //If val contain nothing, set the first one
            else {
                this._userFavoritesTeamsIds = [team.id.toString()];
                team.favorite = true;
            }
            // Set the current favorite teams
            this.sharedDataProvider.currentEventFavoritesTeams = this._userFavoritesTeamsIds.toString();

            // Update the displayed list
            this.sortTeams();
            this.filterTeams();
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
        this.sharedDataProvider.currentTeam = team;
        this.navCtrl.push(TeamPage);
    }

    // Go to page detail _tournament
    goToTournament(tournament) {
        this.sharedDataProvider.currentTournament = tournament;
        this.navCtrl.push(TournamentPage);
    }

    // Go to page detail _participant
    goToParticipant(participant) {
        this.sharedDataProvider.currentParticipant = participant;
        this.navCtrl.push(ParticipantPage);
    }

    // Sort teams
    sortTeams() {
        this._teams.sort((a, b) =>  a.name.localeCompare(b.name));
    }

    // Sort tournaments
    sortTournaments() {
        this._tournaments.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Sort participants
    sortParticipants() {
        this._participants.sort((a, b) => {
            var fullnameA = a.lastname + " " + a.firstname;
            var fullnameB = b.lastname + " " + b.firstname;
            return fullnameA.localeCompare(fullnameB);
        });
    }

    initializeNotifications(team) {
        const o1 = this.teamProvider.getTeam(team.id, this._event.id).do(data => {
            let members = data["team"].members
            members.forEach(member => {
                this.loadNotifications(member.id).subscribe(data => {
                    console.log("DATA", data)
                    let notification = data["notification"]
                    if (notification != null) {
                        this.notificationProvider.createNotification(notification.id, notification.title, notification.description)
                        this.notificationProvider.viewedNotification(notification.id)
                    }

                })
            });
        })
        return Observable.forkJoin(o1)
    }

    loadNotifications(participantId) {
        const o1 = this.notificationProvider.getNotificationsByParticipant(participantId)
        return Observable.forkJoin(o1)
    }

    displayMenu() {
        this.sharedDataProvider.displayMenu();
    }

    goToSearch() {
        this.navCtrl.push(SearchPage);
    }
}
