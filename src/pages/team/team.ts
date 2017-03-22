import {Component} from '@angular/core';
import {NavController, Refresher} from 'ionic-angular';
import {SharedDataService} from '../../providers/sharedData-service';
import {TeamService} from '../../providers/team-service';
import {PoolPage} from "../pool/pool";
import {TournamentPage} from "../tournament/tournament";
import {Observable} from "rxjs";

@Component({
    selector: 'page-team',
    templateUrl: 'team.html'
})

export class TeamPage {

    private _event;
    private _team;
    private _pool: any = {id: ''};
    private _teamData: any = {};

    get event() {
        return this._event
    }

    get teamData() {
        return this._teamData
    }

    constructor(private navCtrl: NavController, private sharedDataProvider: SharedDataService, private teamProvider: TeamService) {
        this.loadData().subscribe();
    }

    loadData() {
        this.sharedDataProvider.httpError = false;
        // Get the current _event
        this._event = this.sharedDataProvider.currentEvent;
        // Get the current team
        this._team = this.sharedDataProvider.currentTeam;

        // Get the team
        const o1 = this.teamProvider.getTeam(this._team.id, this._event.id).do(data => this._teamData = data);

        return Observable.forkJoin(o1);
    }

    // Refresh the current page
    refresh(refresher: Refresher) {
        this.loadData().subscribe(null, () => refresher.complete(), () => refresher.complete());;
    }

    // Go to page detail _pool
    goToPool(tournament, pool_id) {
        // Add a spinner when the view is loaded
        document.getElementById('spinnerContent').style.visibility = 'visible';

        this.sharedDataProvider.currentTournament = tournament;
        this._pool.id = pool_id;
        this.sharedDataProvider.currentPool = this._pool;
        this.navCtrl.push(PoolPage);
    }

    // Go to page detail tournament
    goToTournament(tournament) {
        // Add a spinner when the view is loaded
        document.getElementById('spinnerContent').style.visibility = 'visible';

        this.sharedDataProvider.currentTournament = tournament;
        this.navCtrl.push(TournamentPage);
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

    displayMenu() {
        this.sharedDataProvider.displayMenu();
    }

    // Add a spinner when the view is loading
    ionViewDidLoad() {
        document.getElementById('spinnerContent').style.visibility = 'hidden';
    }
}

