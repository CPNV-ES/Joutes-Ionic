import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-event',
  templateUrl: 'event.html'
})
export class EventPage {
    event: any;
    constructor(public navCtrl: NavController, public navParam: NavParams, public menuCtrl: MenuController) {
        this.event = navParam.data;
  }

}
