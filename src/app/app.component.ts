import {Component, ViewChild} from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { EventsPage } from '../pages/events/events';
import { EventPage } from "../pages/event/event";
import {SharedDataService} from '../providers/sharedData-service';


@Component({
  templateUrl: 'app.template.html',
  providers: [SharedDataService]
})

export class MyApp
{

      pages: Array<{title: string, component: any, icon: string}>;

      // the root nav is a child of the root app component
      // @ViewChild(Nav) gets a reference to the app's root nav
      @ViewChild(Nav) nav: Nav;

      rootPage = EventsPage;

     constructor(platform: Platform, sharedDataProvider: SharedDataService)
     {

        // List of pages that can be navigated to from the left menu
        // the left menu only works after login
        // the login page disables the left menu
        this.pages = [
          { title: 'Events', component: EventsPage, icon: 'person' },
          { title: 'Event', component: EventPage, icon: 'person' }

        ];

        platform.ready().then(() => {
          // Okay, so the platform is ready and our plugins are available.
          // Here you can do any higher level native things you might need.
          StatusBar.styleDefault();
          Splashscreen.hide();
        });


     }

    openPage(page) {
        if (page.index) {
            this.nav.setRoot(page.component, { tabIndex: page.index });

        }
        else {
            this.nav.setRoot(page.component).catch(() => {
                console.log("Didn't set nav root");
            });
        }
    }
}
