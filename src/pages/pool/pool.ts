import { Component } from '@angular/core';
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

  constructor(public navCtrl: NavController, public navParam: NavParams, public poolProvider: PoolService, public sharedDataProvider: SharedDataService) {
    this.event = sharedDataProvider.getCurrentEvent();
    this.tournament = sharedDataProvider.getCurrentTournament();
    this.pool = sharedDataProvider.getCurrentPool();

    this.poolProvider.getPool(this.event.id, this.tournament.id, this.pool.id).subscribe(data => this.poolData = data);
  }

    goToTeam(team) {
        this.sharedDataProvider.setCurrentTeam(team);
        this.navCtrl.push(TeamPage);
    }

  ionViewDidLoad() {

  }

}
