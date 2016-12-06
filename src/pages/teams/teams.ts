import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TeamService} from "../../providers/team-service";
import {SharedDataService} from '../../providers/sharedData-service';

/*
 Generated class for the Teams page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-teams',
    templateUrl: 'teams.html'
})
export class TeamsPage {
    public event: any;
    public teams: any;

    constructor(public navCtrl: NavController, teamProvider: TeamService, sharedDataProvider: SharedDataService) {
        this.event = sharedDataProvider.getCurrentEvent();
        teamProvider.getByEvent(this.event.id).subscribe(
            data => {this.teams = data.teams}
        );
    }

    ionViewDidLoad() {
        console.log('Hello TeamsPage Page');
    }

}
