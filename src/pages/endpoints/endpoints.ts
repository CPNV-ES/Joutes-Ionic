import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CreateEndpointPage } from '../create-endpoint/create-endpoint';
import { EndpointProvider } from '../../providers/endpoint';
import { Endpoint } from '../../models/endpoint';

@Component({
  selector: 'page-endpoints',
  templateUrl: 'endpoints.html',
})
export class EndpointsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public endpointProvider: EndpointProvider) {
  }

  openCreateEndpoint() {
    this.navCtrl.push(CreateEndpointPage)
  }

}
