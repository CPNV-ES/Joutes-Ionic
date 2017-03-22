import {NgModule} from '@angular/core';
import {Storage} from '@ionic/storage';
import {IonicApp, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {EventsPage} from '../pages/events/events';
import {TournamentPage} from '../pages/tournament/tournament';
import {EventService} from '../providers/event-service';
import {TeamService} from "../providers/team-service";
import {TournamentService} from "../providers/tournament-service";
import {PoolService} from "../providers/pool-service";
import {ParticipantService} from "../providers/participant-service";
import {SharedDataService} from "../providers/sharedData-service";
import {TeamPage} from "../pages/team/team";
import {EventPage} from "../pages/event/event";
import {PoolPage} from "../pages/pool/pool";
import {ParticipantPage} from "../pages/participant/participant";
import {IpPage} from "../pages/ip/ip";
import {HttpService} from "../providers/http-service";

@NgModule({
    declarations: [
        MyApp,
        EventsPage,
        EventPage,
        TeamPage,
        TournamentPage,
        PoolPage,
        ParticipantPage,
        IpPage

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
        TournamentPage,
        PoolPage,
        ParticipantPage,
        IpPage
    ],
    providers: [
        Storage,
        SharedDataService,
        HttpService,
        EventService,
        TeamService,
        TournamentService,
        PoolService,
        ParticipantService
    ]
})
export class AppModule {
}
