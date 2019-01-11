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
  loginUrlDomain: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private inAppBrowser: InAppBrowser, private loginProvider: LoginService) {
    this.url = this.loginProvider.getLoginUrl()
  }

  openwebbrowse() {
    //this.openWebpage(this.url)
    this.openWebpage("http://joutes.mycpnv.ch/saml2/login")
  }

  openWebpage(url: string) {
    //Set browser options
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }

    //Open browse
    const browser = this.inAppBrowser.create(url, '_self', options)

    //reset the loginUrlDomain (know when user change page)
    this.loginUrlDomain = null

    //event listner when the page finish loaded
    browser.on('loadstop').subscribe(event => {
      if(this.loginUrlDomain == null){
        this.loginUrlDomain = this.extractHostname(event.url)
      }
      else if (this.extractHostname(event.url) != this.loginUrlDomain ){
        //if change close
        browser.close()
      }
    });

  }

  // Check if login successfull
  checklogin(){
    return this.loginProvider.checkIfLogged()
  }

  disconnect(){
    this.openWebpage("http://joutes.mycpnv.ch/saml2/logout")
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
