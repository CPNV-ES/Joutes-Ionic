import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Endpoint } from '../../models/endpoint'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EndpointProvider } from '../../providers/endpoint/endpoint';
import { CONSTANTS } from '../../app/constants';

@Component({
  selector: 'page-create-endpoint',
  templateUrl: 'create-endpoint.html',
})
export class CreateEndpointPage {

  private endpointForm: FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private endpointProvider: EndpointProvider, private toastCtrl: ToastController) {
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
        this.showToast(`Le point d'accès '${endpoint.name}' a été ajouté avec succès.`,3000,CONSTANTS.TOAST.TYPE_SUCCESS,false)
        // Return to the previous page
        this.navCtrl.pop()
      } catch (error) {
        // Display error in a toast
        this.showToast(error,10000,CONSTANTS.TOAST.TYPE_ERROR,true)
      }
    } else {
      // Display error in a toast
      if (this.endpointForm.controls.name.hasError('required') || this.endpointForm.controls.address.hasError('required')) {
        this.showToast('Les champs doivent être remplis',10000,CONSTANTS.TOAST.TYPE_ERROR,true)
      }
    }
  }

  // Toast
  showToast(msg: string, dur: number, type: string, closeBtn: boolean = false) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: dur,
      cssClass: type,
      showCloseButton: closeBtn
    });
    toast.present()
  }
}
