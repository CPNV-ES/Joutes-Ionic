import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {SharedDataService} from '../../providers/sharedData-service';
import {TeamService} from '../../providers/team-service';

@Component({
    selector: 'page-team',
    templateUrl: 'team.html'
})
export class TeamPage {
    event: any;
    team: any;
    teamData: any = {};


    constructor(public navCtrl: NavController, public navParam: NavParams, public sharedDataProvider: SharedDataService, public teamProvider: TeamService) {
        this.event = sharedDataProvider.getCurrentEvent();
        this.team = sharedDataProvider.getCurrentTeam();

        this.teamProvider.getTeam(this.team.id, this.event.id).subscribe(data => this.teamData = data);
    }


    ionViewDidLoad() {
    }
}
