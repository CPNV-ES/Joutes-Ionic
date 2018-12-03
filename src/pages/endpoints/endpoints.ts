import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CreateEndpointPage } from '../create-endpoint/create-endpoint';

@Component({
  selector: 'page-endpoints',
  templateUrl: 'endpoints.html',
})
export class EndpointsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openCreateEndpoint() {
    this.navCtrl.push(CreateEndpointPage)
  }

}
