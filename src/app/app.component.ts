import { Component, ViewChild } from "@angular/core";
import { Platform, Nav, Events } from "ionic-angular";
import { EventsPage } from "../pages/events/events";
import { AboutPage } from "../pages/about/about";
import { IpPage } from "../pages/ip/ip";
import { LoginPage } from "../pages/login/login";
import { StorageService } from "../providers/storage-service";
import { SettingsPage } from '../pages/settings/settings'

@Component({
    templateUrl: "app.template.html"
})
export class JoutesCPNV {
    pages: Array<{ title: string; component: any; navRoot: boolean, mustlogged: boolean }>;
    storage: StorageService;

    // the root nav is a child of the root app component
    // @ViewChild(Nav) gets a reference to the app's root nav
    @ViewChild(Nav) nav: Nav;

    rootPage = EventsPage;

    constructor(platform: Platform, storageProvider: StorageService) {
        // List of pages that can be navigated to from the left menu
        this.pages = [
            { title: "Evènements", component: EventsPage, navRoot: true, mustlogged: false },
            { title: "A propos", component: AboutPage, navRoot: true, mustlogged: false },
            { title: "Identification", component: LoginPage, navRoot: true, mustlogged: false },
            { title: 'Paramètres', component: SettingsPage, navRoot: true, mustlogged: false },
            { title: "IPs", component: IpPage, navRoot: true, mustlogged: false },
        ];

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
        });

        storageProvider;
    }

    openPage(page) {
        if (page.navRoot) {
            this.nav.setRoot(page.component);
        } else {
            this.nav.push(page.component);
        }
    }
}
