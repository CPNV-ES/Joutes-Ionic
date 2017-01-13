import {NgModule} from '@angular/core';
import {Storage} from '@ionic/storage';
import {IonicApp, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {EventsPage} from '../pages/events/events';
import {TournamentPage} from '../pages/tournament/tournament';
import {EventService} from '../providers/event-service';
import {TeamService} from "../providers/team-service";
import {TournamentService} from "../providers/tournament-service";
import {SharedDataService} from "../providers/sharedData-service";
import {TeamPage} from "../pages/team/team";
import {EventPage} from "../pages/event/event";

@NgModule({
    declarations: [
        MyApp,
        EventsPage,
        EventPage,
        TeamPage,
        TournamentPage

    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        EventsPage,
        EventPage,
        TeamPage,
        TournamentPage
    ],
    providers: [
        Storage,
        EventService,
        TeamService,
        TournamentService,
        SharedDataService
    ]
})
export class AppModule {
}
