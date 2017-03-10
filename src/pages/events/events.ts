import {Component} from '@angular/core';
import {NavController, Refresher} from 'ionic-angular';
import {EventService} from '../../providers/event-service';
import {SharedDataService} from '../../providers/sharedData-service';
import {EventPage} from "../event/event";
import {Splashscreen} from "ionic-native";
import {document} from "@angular/platform-browser/src/facade/browser";

/*
 Generated class for the Events page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-events',
    templateUrl: 'events.html'
})
export class EventsPage {
    private events: any;
    public returnValue: any;
    public filteredEvents: any;
    public searchTerm: string = '';

    constructor(public navCtrl: NavController, public sharedDataProvider: SharedDataService,
                public eventProvider: EventService) {
        this.loadData();
    }

    loadData() {
        // Get events
        this.eventProvider.getEvents().subscribe(data => {
            this.events = data.events;
            this.filteredEvents = data.events
        }, this.filterEvents)
    }

    // Refresh the current page
    refresh(refresher: Refresher) {
        this.loadData();

        setTimeout(() => {
            refresher.complete();
        }, 1000);
    }

    // Filter events
    filterEvents() {
        this.filteredEvents = this.events.filter((event) => {
            return event.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
        });
    }

    // Go to page detail event
    goToEvent(event) {
        // Add a spinner when the view is loaded
        document.getElementById('spinnerContent').style.visibility = 'visible';

        this.sharedDataProvider.setCurrentEvent(event);
        this.navCtrl.push(EventPage);
    }

    // Load the splashscreen and add a spinner when the view is loading
    ionViewDidLoad() {
        Splashscreen.hide();
        document.getElementById('spinnerContent').style.visibility = 'hidden';
    }
}