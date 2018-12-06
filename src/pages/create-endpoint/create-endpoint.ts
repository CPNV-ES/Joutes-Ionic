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

  async createEndpoint() {
    if (this.endpointForm.valid) {
      // Validation ok
      try {
        await this.endpointProvider.create(new Endpoint(this.endpointForm.value.name, this.endpointForm.value.address))
        // Return to the previous page
        this.navCtrl.pop()
      } catch (error) {
        // Todo: Good error notif
        console.error(error)
      }
    } else {
      // Todo: Good error notif
      console.error('Validation error')
    }
  }
}
