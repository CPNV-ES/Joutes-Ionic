import {NgModule} from '@angular/core';
import {Storage} from '@ionic/storage';
import {IonicApp, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {EventsPage} from '../pages/events/events';
import {EventService} from '../providers/event-service';
import {TeamService} from "../providers/team-service";
import {SharedDataService} from "../providers/sharedData-service";
import {TeamPage} from "../pages/team/team";
import {EventPage} from "../pages/event/event";

@NgModule({
    declarations: [
        MyApp,
        EventsPage,
        EventPage,
        TeamPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        EventsPage,
        EventPage,
        TeamPage
    ],
    providers: [
        Storage,
        EventService,
        TeamService,
        SharedDataService
    ]
})
export class AppModule {
}
