import { Component } from '@angular/core';
import { NavController, Refresher } from 'ionic-angular';
import { TeamService } from "../../providers/team-service";
import { TournamentService } from "../../providers/tournament-service";
import { SharedDataService } from '../../providers/sharedData-service';
import { TeamPage } from "../team/team";
import { TournamentPage } from "../tournament/tournament";
import { ParticipantService } from "../../providers/participant-service";
import { ParticipantPage } from "../participant/participant";
import { Observable } from "rxjs";


/*
 Generated class for the Search page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-search',
    templateUrl: 'search.html'
})
export class SearchPage {
    private _event;
    private _teams;
    private _participants;
    private _tournaments;
    private _filteredTeams;
    private _filteredParticipants;
    private _filteredTournaments;
    private _searchTerm: string = '';

    get event() {
        return this._event;
    }

    get filteredTeams() {
        return this._filteredTeams;
    }

    get filteredParticipants() {
        return this._filteredParticipants;
    }

    get filteredTournaments() {
        return this._filteredTournaments;
    }

    set searchTerm(value) {
        this._searchTerm = value;
    }

    get searchTerm() {
        return this._searchTerm;
    }

    constructor(private navCtrl: NavController,
        private teamProvider: TeamService,
        private participantProvider: ParticipantService,
        private tournamentProvider: TournamentService,
        private sharedDataProvider: SharedDataService) {
        this.loadData().subscribe();
    }

    loadData() {
        this.sharedDataProvider.httpError = false;
        // Get the current _event
        this._event = this.sharedDataProvider.currentEvent;

        // Get teams by _event
        const o1 = this.teamProvider.getTeamsByEvent(this._event.id).do(data => {
            this._teams = data.teams;
            this._filteredTeams = data.teams;
            this.sortTeams();
        });

        // Get participants by _event
        const o2 = this.participantProvider.getParticipantsByEvent(this._event.id).do(data => {
            this._participants = data.participants;
            this._filteredParticipants = this._participants;
            this.sortParticipants();
        });

        // Get tournaments by _event
        const o3 = this.tournamentProvider.getTournamentsByEvent(this._event.id).do(data => {
            this._tournaments = data.tournaments;
            this._filteredTournaments = this._tournaments;
            this.sortTournaments();
        });

        return Observable.forkJoin(o1, o2, o3);
    }

    // Refresh the current page
    refresh(refresher: Refresher) {
        this.loadData().subscribe(null, () => refresher.complete(), () => refresher.complete());
    }

    filterAll() {
        this.filterTeams();
        this.filterParticipants();
        this.filterTournaments();
    }

    // Filter teams
    filterTeams() {
        var self = this;
        this._filteredTeams = this._teams.filter((team) => {
            return team.name.toLowerCase().indexOf(this._searchTerm.toLowerCase()) > -1;
        });
        this.sortTeams();
    }

    // Filter participants
    filterParticipants() {
        this._filteredParticipants = this._participants.filter((participant) => {
            var participantFullName = participant.lastname + ' ' + participant.firstname;
            return participantFullName.toLowerCase().indexOf(this._searchTerm.toLowerCase()) > -1;
        });
        this.sortParticipants();
    }

    // Filter tournaments
    filterTournaments() {
        this._filteredTournaments = this._tournaments.filter((tournament) => {
            return tournament.name.toLowerCase().indexOf(this._searchTerm.toLowerCase()) > -1;
        });
        this.sortTournaments();
    }

    // Sort teams
    sortTeams() {
        this._filteredTeams.sort((a, b) =>  a.name.localeCompare(b.name));
    }

    // Sort tournaments
    sortTournaments() {
        this._filteredTournaments.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Sort participants
    sortParticipants() {
        this._filteredParticipants.sort((a, b) => a.lastname.localeCompare(b.lastname));
    }

    // Go to page detail team
    goToTeam(team) {
        // Add a spinner when the view is loaded
        document.getElementById('spinnerContent').style.visibility = 'visible';

        this.sharedDataProvider.currentTeam = team;
        this.navCtrl.push(TeamPage);
    }

    // Go to page detail _participant
    goToParticipant(participant) {
        // Add a spinner when the view is loaded
        document.getElementById('spinnerContent').style.visibility = 'visible';

        this.sharedDataProvider.currentParticipant = participant;
        this.navCtrl.push(ParticipantPage);
    }

    // Go to page detail _tournament
    goToTournament(tournament) {
        // Add a spinner when the view is loaded
        document.getElementById('spinnerContent').style.visibility = 'visible';

        this.sharedDataProvider.currentTournament = tournament;
        this.navCtrl.push(TournamentPage);
    }

    displayMenu() {
        this.sharedDataProvider.displayMenu();
    }
}
