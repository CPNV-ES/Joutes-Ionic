import { Component } from '@angular/core';
import { NavController, Refresher } from 'ionic-angular';
import { PoolService } from "../../providers/pool-service";
import { SharedDataService } from "../../providers/sharedData-service";
import { TeamPage } from "../team/team";
import { SearchPage } from "../search/search";
import { Observable } from "rxjs";

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

    get tournament() {
        return this._tournament
    }

    get pool() {
        return this._poolData
    }

    get finish() {
        return this._finish
    }

    constructor(private navCtrl: NavController, private poolProvider: PoolService, private sharedDataProvider: SharedDataService) {
        this.loadData().subscribe();
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
        const o1 = this.poolProvider.getPool(this._event.id, this._tournament.id, this._pool.id).do(data => {
            this._poolData = data["pool"];
            this.isFinished();
        });
        return Observable.forkJoin(o1);
    }

    // Refresh the current page
    refresh(refresher: Refresher) {
        this.loadData().subscribe(null, () => refresher.complete(), () => refresher.complete());
    }

    // Verify if the match is finished
    isFinished() {
        var self = this;
        this._poolData.matches.forEach(function(match) {
            if (!match.isFinished) {
                self._finish = false;
            }
        });
    }

    // Go to page detail team
    goToTeam(team) {
        this.sharedDataProvider.currentTeam = { id: team.team_id, name: team.team, sport: '' };
        this.navCtrl.push(TeamPage);
    }

    goToSearch() {
        this.navCtrl.push(SearchPage);
    }
}
