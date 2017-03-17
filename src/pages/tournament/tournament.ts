import {Component} from '@angular/core';
import {NavController, Refresher} from 'ionic-angular';
import {SharedDataService} from '../../providers/sharedData-service';
import {TournamentService} from '../../providers/tournament-service';
import {TeamPage} from "../team/team";
import {PoolPage} from "../pool/pool";
import {Observable} from "rxjs";

/*
 Generated class for the Tournament page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-tournament',
    templateUrl: 'tournament.html'
})
export class TournamentPage {

    private _event;
    private _tournament;
    private _tournamentData: any = {};

    get tournamentData() {
        return this._tournamentData
    }

    constructor(private navCtrl: NavController, private tournamentProvider: TournamentService, private sharedDataProvider: SharedDataService) {
        this.loadData().subscribe();;
    }

    loadData() {
        this.sharedDataProvider.httpError = false;
        // Get the current _event
        this._event = this.sharedDataProvider.currentEvent;
        // get the current _tournament
        this._tournament = this.sharedDataProvider.currentTournament;

        // Get the _tournament
        const o1 = this.tournamentProvider.getTournament(this._event.id, this._tournament.id).do(data => this._tournamentData = data);

        return Observable.forkJoin(o1);
    }

    // Refresh the current page
    refresh(refresher: Refresher) {
        this.loadData().subscribe(null, () => refresher.complete(), () => refresher.complete());;
    }

    // Go to page detail _pool
    goToPool(pool) {
        // Add a spinner when the view is loaded
        document.getElementById('spinnerContent').style.visibility = 'visible';

        this.sharedDataProvider.currentPool = pool;
        this.navCtrl.push(PoolPage);
    }

    // Go to page detail team
    goToTeam(team) {
        // Add a spinner when the view is loaded
        document.getElementById('spinnerContent').style.visibility = 'visible';

        this.sharedDataProvider.currentTeam = team;
        this.navCtrl.push(TeamPage);
    }

    // Add a spinner when the view is loading
    ionViewDidLoad() {
        document.getElementById('spinnerContent').style.visibility = 'hidden';
    }

}