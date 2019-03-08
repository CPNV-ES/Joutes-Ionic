import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CreateEndpointPage } from '../create-endpoint/create-endpoint';
import { EndpointProvider } from '../../providers/endpoint';
import { Endpoint } from '../../models/endpoint';
import { ToastCustom } from '../../components/toast-custom/toast-custom';
import { EditEndpointPage } from '../edit-endpoint/edit-endpoint';
import { ErrorCustomProvider } from '../../providers/error-custom';

@Component({
  selector: 'page-endpoints',
  templateUrl: 'endpoints.html',
})
export class EndpointsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public endpointProvider: EndpointProvider, private toastCustom: ToastCustom, private alertCtrl: AlertController) {
  }

  private openCreateEndpoint() {
    this.navCtrl.push(CreateEndpointPage)
  }

  private deleteEndpoint(endpoint: Endpoint) {
    try {
      this.endpointProvider.delete(endpoint)
    } catch (error) {
      this.toastCustom.showToast(ErrorCustomProvider.getBetterMessage(error),10000,this.toastCustom.TYPE_ERROR,true)
    }
  }

  private openEditPage(endpoint: Endpoint) {
    this.navCtrl.push(EditEndpointPage, {'endpoint': endpoint})
  }

  private showConfirm(endpoint: Endpoint) {
    let confirm = this.alertCtrl.create({
      title: 'Confirmation de suppression',
      message: `Voulez-vous vraiment supprimer le point d'accès '${endpoint.name}' ?`,
      buttons: [
        {
          text: 'Ne pas supprimer'
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.deleteEndpoint(endpoint)
          }
        }
      ]
    });
    confirm.present();
  }

  private async changeCurrentEndpoint(endpoint: Endpoint) {
    try {
      if (await this.endpointProvider.isEndpointValid(endpoint)) {
        await this.endpointProvider.changeCurrent(endpoint)
      }
    } catch (error) {
      this.toastCustom.showToast(ErrorCustomProvider.getBetterMessage(error),10000,this.toastCustom.TYPE_ERROR,true)
    }
  }

}
