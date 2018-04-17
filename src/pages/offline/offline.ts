import { Component } from '@angular/core';
import { AlertController } from "ionic-angular";
import { StorageService } from '../../providers/storage-service';
import { DataService } from '../../providers/data-service';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OfflinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-offline',
  templateUrl: 'offline.html',
})
export class OfflinePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private storageProvider: StorageService, private dataProvider : DataService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfflinePage');
  }

  download() {
    let alert = this.alertCtrl.create({
      title: "Confirmation de téléchargement",
      message: "Cette opération va prendre un certain temps et bloquera la navigation dans l'application. Etes-vous sûr ?",
      buttons: [
        {
          text: "Annuler",
          role: "cancel",
          handler: () => {

          }
        },
        {
          text: "Oui",
          handler: () => {
            console.log("Launche download");
            this.storageProvider.start(this.dataProvider);
          }
        }
      ]
    });
    alert.present();
  }

}
