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
    private _events;
    private _filteredEvents;
    private _searchTerm: string = '';

    constructor(private navCtrl: NavController, private sharedDataProvider: SharedDataService,
                private eventProvider: EventService) {
        this.loadData();
    }

    loadData() {
        this.sharedDataProvider.httpError = false;
        // Get events
        this.eventProvider.getEvents().subscribe(data => {
            this._events = data.events;
            this._filteredEvents = data.events
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
        this._filteredEvents = this._events.filter((event) => {
            return event.name.toLowerCase().indexOf(this._searchTerm.toLowerCase()) > -1;
        });
    }

    // Go to page detail _event
    goToEvent(event) {
        // Add a spinner when the view is loaded
        document.getElementById('spinnerContent').style.visibility = 'visible';

        this.sharedDataProvider.currentEvent = event;
        this.navCtrl.push(EventPage);
    }

    // Load the splashscreen and add a spinner when the view is loading
    ionViewDidLoad() {
        Splashscreen.hide();
        document.getElementById('spinnerContent').style.visibility = 'hidden';
    }
}