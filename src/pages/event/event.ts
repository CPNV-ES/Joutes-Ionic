import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SharedDataService} from '../../providers/sharedData-service';

@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})

export class EventPage
{
    event: any;
    constructor(public navCtrl: NavController, public navParam: NavParams, sharedDataProvider: SharedDataService)
    {
        this.event = sharedDataProvider.getCurrentEvent();
    }

}
