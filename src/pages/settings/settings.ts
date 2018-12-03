import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EndpointsPage } from '../endpoints/endpoints'

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openEndpoints() {
    this.navCtrl.push(EndpointsPage)
  }

}
