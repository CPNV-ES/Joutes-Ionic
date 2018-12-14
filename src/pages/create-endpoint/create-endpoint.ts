import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Endpoint } from '../../models/endpoint'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EndpointProvider } from '../../providers/endpoint';
import { ToastCustom } from '../../components/toast-custom/toast-custom'

@Component({
  selector: 'page-create-endpoint',
  templateUrl: 'create-endpoint.html',
})
export class CreateEndpointPage {

  private endpointForm: FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private endpointProvider: EndpointProvider, private toastCustom: ToastCustom) {
    this.endpointForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])]
    })
  }

  async createEndpoint() {
    if (this.endpointForm.valid) {
      // Validation ok
      try {
        let endpoint: Endpoint = new Endpoint(this.endpointForm.value.name, this.endpointForm.value.address)
        await this.endpointProvider.create(endpoint)
        // Display succes in a toast
        this.toastCustom.showToast(`Le point d'accès '${endpoint.name}' a été ajouté avec succès.`,3000,this.toastCustom.TYPE_SUCCESS,false)
        // Return to the previous page
        this.navCtrl.pop()
      } catch (error) {
        // Display error in a toast
        this.toastCustom.showToast(error,10000,this.toastCustom.TYPE_ERROR,true)
      }
    } else {
      // Display error in a toast
      if (this.endpointForm.controls.name.hasError('required') || this.endpointForm.controls.address.hasError('required')) {
        this.toastCustom.showToast('Les champs doivent être remplis',10000,this.toastCustom.TYPE_ERROR,true)
      }
    }
  }
}
