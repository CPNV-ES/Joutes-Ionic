import { Component } from '@angular/core';
import { NavController, Refresher } from 'ionic-angular';
import { SharedDataService } from '../../providers/sharedData-service';
import { EventPage } from "../event/event";
import { EventProvider } from '../../providers/event';

@Component({
    selector: 'page-events',
    templateUrl: 'events.html'
})
export class EventsPage {
    private events: Array<Event> = []

    constructor(private navCtrl: NavController,
        private sharedDataProvider: SharedDataService,
        private eventProvider: EventProvider) {
        this.getData()
    }

    // Get data
    async getData() {
        try {
            this.events = await this.eventProvider.getAll()
        } catch (error) {
            console.error(error.message)
        }
    }

    // Refresh the current page
    async refresh(refresher: Refresher) {
        await this.getData()
        refresher.complete()
    }

    // Go to page detail _event
    goToEvent(event) {
        this.sharedDataProvider.currentEvent = event;
        this.navCtrl.push(EventPage);
    }
}
