import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
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

    public event: any;
    public tournament: any;
    public pool: any;
    public poolData: any = {};
    public finish: boolean = true;

    constructor(public navCtrl: NavController, public navParam: NavParams, public poolProvider: PoolService, public sharedDataProvider: SharedDataService) {
        // Get the current event
        this.event = sharedDataProvider.getCurrentEvent();
        // Get the current tournament
        this.tournament = sharedDataProvider.getCurrentTournament();
        // Get the current pool
        this.pool = sharedDataProvider.getCurrentPool();

        // Get the pool
        this.poolProvider.getPool(this.event.id, this.tournament.id, this.pool.id).subscribe(data => {
            this.poolData = data;
            this.isFinished();
        });
    }

    // Verify if the match is finished
    isFinished() {
        var self = this;
        this.poolData.matches.forEach(function (match) {
            if(match.status == 'A venir') {
                self.finish = false;
            }
        });
    }

    // Go to page detail team
    goToTeam(team) {
        // Add a spinner when the view is loaded
        document.getElementById('spinnerContent').style.visibility = 'visible';

        this.sharedDataProvider.setCurrentTeam(team);
        this.navCtrl.push(TeamPage);
    }

    // Add a spinner when the view is loading
    ionViewDidLoad() {
        document.getElementById('spinnerContent').style.visibility = 'hidden';
    }

}
