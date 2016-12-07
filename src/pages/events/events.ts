import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {EventService} from '../../providers/event-service';
import {SharedDataService} from '../../providers/sharedData-service';
import {EventPage} from "../event/event";

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

    constructor(public navCtrl: NavController, public sharedDataProvider: SharedDataService, public eventProvider: EventService)
    {
        this.eventProvider.getEvents().subscribe(data => {this.events = data.events; this.filteredEvents = data.events}, this.filterEvents)
    }

    goToEvent(event)
    {
        this.sharedDataProvider.setCurrentEvent(event);
        this.navCtrl.push(EventPage);
    }

    filterEvents()
    {
         this.filteredEvents = this.events.filter((event) => {
             return event.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
        });
    }

    ionViewDidLoad()
    {
    }

}
