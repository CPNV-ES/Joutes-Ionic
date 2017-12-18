import {Component} from '@angular/core';
import {NavController, Refresher} from 'ionic-angular';
import {SharedDataService} from '../../providers/sharedData-service';
import {TournamentService} from '../../providers/tournament-service';
import {TeamPage} from "../team/team";
import {PoolPage} from "../pool/pool";
import {Observable} from "rxjs";
import {KeysPipe} from "../../pipes/KeysPipe";

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
    private _poolsData: any = [];
    private _currentStage;
    private _sliderOptions = {pager:true, initialSlide:0 };

    get tournamentData() {
        return this._tournamentData
    }
    get poolsData()
    {
        return this._poolsData;
    }
    get currentStage()
    {
        return this._currentStage;
    }
    get sliderOptions()
    {
        return this._sliderOptions;
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
        const o1 = this.tournamentProvider.getTournament(this._event.id, this._tournament.id).do(data => {
            this._tournamentData = data.tournament;
            this._poolsData = this.sortByStage(this.tournamentData.pools);

            console.log("sliderOptions",this.sliderOptions);
        });

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

    displayMenu() {
        this.sharedDataProvider.displayMenu();
    }
    sortByStage(pools)
    {
        let poolPerStage = [];
        //sort by finished
        pools.sortBy(function(o){ return [o.id,o.isFinished, o.stage];});
        console.log(pools);
        let poolStage = [];
        let stageId = pools[0].stage;
        let stageIdx;
        for(let pool of pools)
        {
            if(stageId != pool.stage) {
                poolPerStage.push(poolStage);
                poolStage = [];
                stageId = pool.stage;
            }
            poolStage.push(pool);
        }
        this._sliderOptions.initialSlide = this.getCurrentStage(poolPerStage);

        return poolPerStage;
    }
    getCurrentStage(stages)
    {
        //loop on each stage then on each pool
        for(let i = 0; i < stages.length; i++)
        {
            for(let pool of stages[i])
            {
                if(pool.isFinished == 0 ) return i;
            }
        }
        return 0;
    }

    // Add a spinner when the view is loading
    ionViewDidLoad() {
        document.getElementById('spinnerContent').style.visibility = 'hidden';
    }

}
