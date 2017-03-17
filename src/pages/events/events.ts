import {Component} from '@angular/core';
import {NavController, Refresher} from 'ionic-angular';
import {EventService} from '../../providers/event-service';
import {SharedDataService} from '../../providers/sharedData-service';
import {EventPage} from "../event/event";
import {Splashscreen} from "ionic-native";
import {document} from "@angular/platform-browser/src/facade/browser";
import {Observable} from "rxjs";

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

    get events() {
        return this._events;
    }

    get filteredEvents() {
        return this._filteredEvents;
    }

    get searchTerm() {
        return this._searchTerm;
    }

    set searchTerm(value) {
        this._searchTerm = value;
    }

    constructor(private navCtrl: NavController, private sharedDataProvider: SharedDataService,
                private eventProvider: EventService) {
        this.loadData().subscribe();
    }

    loadData() {
        this.sharedDataProvider.httpError = false;
        // Get events
        const o1 = this.eventProvider.getEvents().do(data => {
            this._events = data.events;
            this._filteredEvents = data.events
        }, this.filterEvents)
        return Observable.forkJoin(o1);
    }

    // Refresh the current page
    refresh(refresher: Refresher) {
        this.loadData().subscribe(null, () => refresher.complete(), () => refresher.complete());
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