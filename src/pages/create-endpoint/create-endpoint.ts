import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Endpoint } from '../../models/endpoint'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-create-endpoint',
  templateUrl: 'create-endpoint.html',
})
export class CreateEndpointPage {

  private endpointForm: FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.endpointForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])]
    })
  }

  createEndpoint() {
    if (this.endpointForm.valid) {
      // Validation ok
      let endpoint = new Endpoint(this.endpointForm.value.name, this.endpointForm.value.address)
      console.log(endpoint)
    }
  }
}
