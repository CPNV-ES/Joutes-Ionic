import {Component} from '@angular/core';
import {NavController, Refresher} from 'ionic-angular';
import {PoolService} from "../../providers/pool-service";
import {SharedDataService} from "../../providers/sharedData-service";
import {TeamPage} from "../team/team";

/*
 Generated class for the Pool page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-pool',
    templateUrl: 'pool.html'
})
export class PoolPage {

    private _event;
    private _tournament;
    private _pool;
    private _poolData: any = {};
    private _finish: boolean = true;

    constructor(private navCtrl: NavController, private poolProvider: PoolService, private sharedDataProvider: SharedDataService) {
        this.loadData();
    }

    loadData() {
        this.sharedDataProvider.httpError = false;
        // Get the current _event
        this._event = this.sharedDataProvider.currentEvent;
        // Get the current _tournament
        this._tournament = this.sharedDataProvider.currentTournament;
        // Get the current _pool
        this._pool = this.sharedDataProvider.currentPool;

        // Get the _pool
        this.poolProvider.getPool(this._event.id, this._tournament.id, this._pool.id).subscribe(data => {
            this._poolData = data;
            this.isFinished();
        });
    }

    // Refresh the current page
    refresh(refresher: Refresher) {
        this.loadData();

        setTimeout(() => {
            refresher.complete();
        }, 1000);
    }

    // Verify if the match is finished
    isFinished() {
        var self = this;
        this._poolData.matches.forEach(function (match) {
            if(match.status == 'A venir') {
                self._finish = false;
            }
        });
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
