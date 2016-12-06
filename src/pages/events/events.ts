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
    public events: any;
    public sharedDataProvider: any;

    constructor(public navCtrl: NavController, eventProvider: EventService, sharedDataProvider: SharedDataService) {
        this.sharedDataProvider = sharedDataProvider;
        eventProvider.All().subscribe(
            data => {
                this.events = data.events
            }
        );
    }

    GoToEvent(event) {
        this.sharedDataProvider.setCurrentEvent(event);
        this.navCtrl.push(EventPage);

    }


    ionViewDidLoad() {
    }

}
