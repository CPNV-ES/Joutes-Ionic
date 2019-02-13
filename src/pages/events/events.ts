import { Component } from '@angular/core';
import { NavController, Refresher } from 'ionic-angular';
import { SharedDataService } from '../../providers/sharedData-service';
import { EventPage } from "../event/event";
import { EventProvider } from '../../providers/event';
import { ToastCustom } from '../../components/toast-custom/toast-custom';
import { EndpointProvider } from '../../providers/endpoint';

@Component({
    selector: 'page-events',
    templateUrl: 'events.html'
})
export class EventsPage {
    private events: Array<Event> = []

    constructor(private toastCustom: ToastCustom, private navCtrl: NavController, private sharedDataProvider: SharedDataService, private eventProvider: EventProvider, private endpointProvider: EndpointProvider) {
        this.getData()
    }

    // Get data
    async getData() {
        try {
            this.events = await this.eventProvider.getAll()
        } catch (error) {
            this.toastCustom.showToast(error.message, 10000, this.toastCustom.TYPE_ERROR, true)
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
