import {Component} from '@angular/core';
import {NavController, Refresher} from 'ionic-angular';
import {ParticipantService} from "../../providers/participant-service";
import {SharedDataService} from "../../providers/sharedData-service";
import {TournamentPage} from "../tournament/tournament";
import {TeamPage} from "../team/team";
import {TeamService} from "../../providers/team-service";
import {PoolPage} from "../pool/pool";
import {Observable} from "rxjs";

/*
 Generated class for the Participant page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-participant',
    templateUrl: 'participant.html'
})
export class ParticipantPage {

    private _event;
    private _participant;
    private _participantData: any = {};
    private _teamData: any = {};
    private _pool: any = {id: ''};

    constructor(private navCtrl: NavController, private teamProvider: TeamService, private participantProvider: ParticipantService, private sharedDataProvider: SharedDataService) {
        this.loadData().subscribe();
    }

    loadData() {
        this.sharedDataProvider.httpError = false;
        // Get the current _event
        this._event = this.sharedDataProvider.currentEvent;
        // Get the current _participant
        this._participant = this.sharedDataProvider.currentParticipant;

        // Get the _participant
        const o1 = this.participantProvider.getParticipant(this._event.id, this._participant.id).do(data => {
            this._participantData = data;
            this.getTeamInfos();
        });
        return Observable.forkJoin(o1);
    }

    // Refresh the current page
    refresh(refresher: Refresher) {
        this.loadData().subscribe(null, () => refresher.complete(), () => refresher.complete());
    }

    // Get infos for the team
    getTeamInfos() {
        if(this._participantData.team.length > 0) {
            this.teamProvider.getTeam(this._participantData.team[0].id, this._event.id).subscribe(data => this._teamData = data);
        }
    }

    // Go the page detail _tournament
    goToTournament(tournament) {
        // Add a spinner when the view is loaded
        document.getElementById('spinnerContent').style.visibility = 'visible';

        this.sharedDataProvider.currentTournament = tournament;
        this.navCtrl.push(TournamentPage);
    }

    // Go to page detail team
    goToTeam(team) {
        // Add a spinner when the view is loaded
        document.getElementById('spinnerContent').style.visibility = 'visible';

        this.sharedDataProvider.currentTeam = team;
        this.navCtrl.push(TeamPage);
    }

    // Go to page detail _pool
    goToPool(pool_id) {
        // Add a spinner when the view is loaded
        document.getElementById('spinnerContent').style.visibility = 'visible';

        this.sharedDataProvider.currentTournament = this._participantData.tournament[0];
        this._pool.id = pool_id;
        this.sharedDataProvider.currentPool = this._pool;
        this.navCtrl.push(PoolPage);
    }

    // Set different icons for the sport
    setIconSports(sport)
    {
        switch (sport)
        {
            case 'Badminton':
                return 'badminton.png';
            case 'Basketball':
                return 'basketball.png';
            case 'Football':
                return 'football.png';
            case 'Pétanque':
                return 'petanque.png';
            case 'Unihockey':
                return 'unihockey.png';
            case 'Volley':
                return 'volley.png';
            case 'Marche':
                return 'walking.png';
            default:
                return 'default.png'
        }
    }

    // Add a spinner when the view is loading
    ionViewDidLoad() {
        document.getElementById('spinnerContent').style.visibility = 'hidden';
    }
}