import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SharedDataService } from '../../providers/sharedData-service';
import { TeamService } from '../../providers/team-service';

@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})

export class EventPage
{
    event: any;
    team:  any = {};


    constructor(public navCtrl: NavController, public navParam: NavParams, public sharedDataProvider: SharedDataService, public eventProvider: TeamService)
    {
        this.event  = sharedDataProvider.getCurrentEvent();
        this.eventProvider.getTeamByEvent(this.event.id, 1).subscribe(data => this.team = data);
    }


    ionViewDidLoad()
    {
    }

}
