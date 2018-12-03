import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Endpoint } from '../../models/endpoint'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EndpointProvider } from '../../providers/endpoint/endpoint'

@Component({
  selector: 'page-create-endpoint',
  templateUrl: 'create-endpoint.html',
})
export class CreateEndpointPage {

  private endpointForm: FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private endpointProvider: EndpointProvider) {
    this.endpointForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])]
    })
  }

  createEndpoint() {
    if (this.endpointForm.valid) {
      // Validation ok
      try {
        this.endpointProvider.create(new Endpoint(this.endpointForm.value.name, this.endpointForm.value.address))
      } catch (error) {
        // Todo: Good error notif
        console.error(error)
      }
    }
  }
}
