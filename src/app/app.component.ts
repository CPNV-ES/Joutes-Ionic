import {Component, ViewChild} from '@angular/core';
import {Platform, Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {EventsPage} from '../pages/events/events';
import {AboutPage} from '../pages/about/about';
import {IpPage} from "../pages/ip/ip";
import { StorageService } from '../providers/storage-service';



@Component({
    templateUrl: 'app.template.html'
})

export class MyApp {

    pages: Array<{title: string, component: any, icon: string}>;
    storage : StorageService;

    // the root nav is a child of the root app component
    // @ViewChild(Nav) gets a reference to the app's root nav
    @ViewChild(Nav) nav: Nav;

    rootPage = EventsPage;

    constructor(platform: Platform,  storageProvider: StorageService) {

        // List of pages that can be navigated to from the left menu
        // the left menu only works after login
        // the login page disables the left menu
        this.pages = [
            {title: 'Evènements', component: EventsPage, icon: 'person'},
            {title: 'A propos', component: AboutPage, icon: 'person'},
            {title: 'IPs', component: IpPage, icon: 'person'}
        ];

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            // StatusBar.styleDefault();
            // SplashScreen.hide();
        });

        storageProvider.start();
    }

    openPage(page) {
        if (page.index) {
            this.nav.setRoot(page.component, {tabIndex: page.index});

        }
        else {
            this.nav.setRoot(page.component).catch(() => {
                console.log("Didn't set nav root");
            });
        }
    }
}
