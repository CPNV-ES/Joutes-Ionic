import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Endpoint } from '../../models/endpoint';

@Component({
  selector: 'page-edit-endpoint',
  templateUrl: 'edit-endpoint.html',
})
export class EditEndpointPage {

  private endpoint: Endpoint
  private endpointForm: FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.endpoint = this.navParams.get('endpoint')

    this.endpointForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])]
    })
  }

}
