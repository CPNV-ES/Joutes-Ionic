import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginService } from '../../providers/login-service';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  url: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private inAppBrowser: InAppBrowser, private loginProvider: LoginService) {
    this.loginProvider.checkIfLogged()
    this.url = this.loginProvider.getLoginUrl()
    this.openWebpage(this.url)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  openWebpage(url: string) {
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    console.log(url)
    const browser = this.inAppBrowser.create(url, '_system', options)
  }

}
