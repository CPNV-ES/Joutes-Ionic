import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Endpoint } from '../../models/endpoint';
import { EndpointProvider } from '../../providers/endpoint';
import { ToastCustom } from '../../components/toast-custom/toast-custom';

@Component({
  selector: 'page-edit-endpoint',
  templateUrl: 'edit-endpoint.html',
})
export class EditEndpointPage {

  private endpoint: Endpoint
  private endpointForm: FormGroup

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private endpointProvider: EndpointProvider, private toastCustom: ToastCustom) {
    this.endpoint = this.navParams.get('endpoint')

    this.endpointForm = this.formBuilder.group({
      name: [this.endpoint.name, Validators.compose([Validators.required])],
      address: [this.endpoint.address, Validators.compose([Validators.required])]
    })
  }

  async saveEndpoint() {
    if (this.endpointForm.valid) {
      // Validation ok
      if (this.endpointForm.dirty) {
        // Values has changed
        try {
          // Check if name already exists
          if (!this.endpointProvider.isNameNotExists(this.endpointForm.value.name) && this.endpointForm.value.name != this.endpoint.name) {
            // The name already exists
            this.toastCustom.showToast(`Le nom du point d'accès '${this.endpointForm.value.name}' existe déjà.`,10000,this.toastCustom.TYPE_ERROR,true)
          } else {
            let endpoint: Endpoint = new Endpoint(this.endpointForm.value.name, this.endpointForm.value.address, Endpoint.TYPE_MANUAL)
            // Check if the endpoint is valid
            if (await this.endpointProvider.isEndpointValid(endpoint)) {
              // Save
              await this.endpointProvider.update(this.endpoint, endpoint)
              // Display succes in a toast
              this.toastCustom.showToast(`Les modifications du point d'accès '${endpoint.name}' ont été enregistées avec succès.`,3000,this.toastCustom.TYPE_SUCCESS,false)
              // Return to the previous page
              this.navCtrl.pop()
            } else {
              // The name already exists
              this.toastCustom.showToast(`Le point d'accès '${this.endpointForm.value.name}' n'est pas valide.`,10000,this.toastCustom.TYPE_ERROR,true)
            }
          }
        } catch (error) {
          // Display error in a toast
          this.toastCustom.showToast(error,10000,this.toastCustom.TYPE_ERROR,true)
        }
      } else {
        // Display info in a toast
        this.toastCustom.showToast('Aucune modification effectuée',3000,this.toastCustom.TYPE_SUCCESS,false)
        this.navCtrl.pop()
      }
    } else {
      // Display error in a toast
      if (this.endpointForm.controls.name.hasError('required') || this.endpointForm.controls.address.hasError('required')) {
        this.toastCustom.showToast('Les champs doivent être remplis',10000,this.toastCustom.TYPE_ERROR,true)
      }
    }
  }

}
