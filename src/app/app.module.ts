import {NgModule} from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {EventPage} from '../pages/event/event';
import {EventsPage} from '../pages/events/events';
import {EventService} from '../providers/event-service';
import {TeamService} from "../providers/team-service";
import {TeamsPage} from "../pages/teams/teams";
import {SharedDataService} from "../providers/sharedData-service";

@NgModule({
    declarations: [
        MyApp,
        EventPage,
        EventsPage,
        TeamsPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        EventPage,
        EventsPage,
        TeamsPage
    ],
    providers: [
        EventService,
        TeamService,
        SharedDataService
    ]
})
export class AppModule {
}
