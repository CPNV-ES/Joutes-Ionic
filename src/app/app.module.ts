import {NgModule} from '@angular/core';
import {Storage} from '@ionic/storage';
import {IonicApp, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {EventsPage} from '../pages/events/events';
import {EventService} from '../providers/event-service';
import {TeamService} from "../providers/team-service";
import {TeamsPage} from "../pages/teams/teams";
import {SharedDataService} from "../providers/sharedData-service";
import {TeamPage} from "../pages/team/team";

@NgModule({
    declarations: [
        MyApp,
        EventsPage,
        TeamsPage,
        TeamPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        EventsPage,
        TeamsPage,
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
