import { Component, OnInit } from '@angular/core';
import { NavController, Refresher, LoadingController, Loading } from 'ionic-angular';
import { SharedDataService } from '../../providers/sharedData-service';
import { EventPage } from "../event/event";
import { EventProvider } from '../../providers/event';
import { ToastCustom } from '../../components/toast-custom/toast-custom';
import { EndpointProvider } from '../../providers/endpoint';

@Component({
    selector: 'page-events',
    templateUrl: 'events.html'
})
export class EventsPage implements OnInit {
    private events: Array<Event> = []
    private ready: boolean = false
    private loader: Loading

    constructor(private loadingCtrl: LoadingController, private toastCustom: ToastCustom, private navCtrl: NavController, private sharedDataProvider: SharedDataService, private eventProvider: EventProvider, private endpointProvider: EndpointProvider) {
    
    }

    async ngOnInit() {
        this.showLoader()
        await this.getData()
        this.loader.dismiss()
        this.ready = true
        if (this.events != null && this.events.length == 1) {
            this.goToEvent(this.events[0])
        }
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

    async showLoader() {
        this.loader = this.loadingCtrl.create({
           content: "Veuillez patienter...<br/>Chargement des données en cours.",
         });
         this.loader.present()
    }
}
