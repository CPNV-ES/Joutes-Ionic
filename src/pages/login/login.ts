import { LoginService } from './../../providers/login-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { ToastCustom } from '../../components/toast-custom/toast-custom'

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

  url: string
  loginUrlDomain: string

  constructor(public navCtrl: NavController, public navParams: NavParams, private inAppBrowser: InAppBrowser, public loginProvider: LoginService, private toastCustom: ToastCustom) {
    this.url = this.loginProvider.getLoginUrl()    
    loginProvider.checkIfLogged()

  }

  openwebbrowse() {
    this.openWebpage(this.url)
  }

  openWebpage(url: string) {
    //Set browser options
    const options: InAppBrowserOptions = {
      zoom: 'no',
    }

    //Open browse
    const browser = this.inAppBrowser.create(url, '_self', options)

    //reset the loginUrlDomain (know when user change page)
    this.loginUrlDomain = null

    

    //event listner when the page finish loaded
    browser.on('loadstop').subscribe(event => {
      // if first loading of browser set domain
      if(this.loginUrlDomain == null){
        this.loginUrlDomain = this.extractHostname(event.url)
      }
      // if domain change exit browser
      else if (this.extractHostname(event.url) != this.loginUrlDomain ){
        //if change close
        browser.close()
        this.loginProvider.checkIfLogged()
        this.navCtrl.popToRoot()
      }
    });

  }

  // Check if login successfull
  checklogin(){
    return this.loginProvider.checkIfLogged()
  }

  extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

}
