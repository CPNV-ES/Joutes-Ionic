import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EndpointsPage } from '../endpoints/endpoints'
import { StorageService } from '../../providers/storage-service';
import { DataService } from '../../providers/data-service';
import { ToastCustom } from '../../components/toast-custom/toast-custom';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(private toastCustom: ToastCustom,public navCtrl: NavController, public navParams: NavParams, private storageProvider: StorageService, private dataProvider: DataService) {
  }

  openEndpoints() {
    this.navCtrl.push(EndpointsPage)
  }

  downloadData() {
    this.toastCustom.showToast('Le téléchargement des données a commencé.',3000,this.toastCustom.TYPE_SUCCESS)
    this.storageProvider.start(this.dataProvider)
  }

}
