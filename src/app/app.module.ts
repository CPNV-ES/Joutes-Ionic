import { NgModule } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicModule } from 'ionic-angular';
import { JoutesCPNV } from './app.component';
import { InAppBrowser } from '@ionic-native/in-app-browser'

import { EventsPage } from '../pages/events/events';
import { TournamentPage } from '../pages/tournament/tournament';
import { TeamService } from "../providers/team-service";
import { TournamentService } from "../providers/tournament-service";
import { PoolService } from "../providers/pool-service";
import { ParticipantService } from "../providers/participant-service";
import { SharedDataService } from "../providers/sharedData-service";
import { TeamPage } from "../pages/team/team";
import { EventPage } from "../pages/event/event";
import { PoolPage } from "../pages/pool/pool";
import { ParticipantPage } from "../pages/participant/participant";
import { IpPage } from "../pages/ip/ip";
import { DataService } from "../providers/data-service";
import { AboutPage } from "../pages/about/about";
import { SearchPage } from "../pages/search/search";
import { OfflinePage } from "../pages/offline/offline";
import { StorageService } from "../providers/storage-service";
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { LoginService } from '../providers/login-service';
import { SettingsPage } from '../pages/settings/settings'
import { EndpointsPage } from '../pages/endpoints/endpoints'
import { CreateEndpointPage } from '../pages/create-endpoint/create-endpoint'
import { EndpointProvider } from '../providers/endpoint';
import { ToastCustom } from '../components/toast-custom/toast-custom';
import { EditEndpointPage } from '../pages/edit-endpoint/edit-endpoint';
import { EventProvider } from '../providers/event';
import { RoutesProvider } from '../providers/routes';

@NgModule({
    declarations: [
        JoutesCPNV,
        EventsPage,
        EventPage,
        TeamPage,
        TournamentPage,
        PoolPage,
        ParticipantPage,
        AboutPage,
        IpPage,
        SearchPage,
        OfflinePage,
        LoginPage,
        OfflinePage,
        SettingsPage,
        EndpointsPage,
        CreateEndpointPage,
        EditEndpointPage

    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(JoutesCPNV),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        JoutesCPNV,
        EventsPage,
        EventPage,
        TeamPage,
        TournamentPage,
        PoolPage,
        ParticipantPage,
        AboutPage,
        IpPage,
        SearchPage,
        OfflinePage,
        SettingsPage,
        EndpointsPage,
        CreateEndpointPage,
        LoginPage,
        EditEndpointPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        SharedDataService,
        DataService,
        TeamService,
        TournamentService,
        PoolService,
        ParticipantService,
        EndpointProvider,
        ToastCustom,
        StorageService,
        InAppBrowser,
        LoginService,
        EventProvider,
    RoutesProvider,
        
    ]
})
export class AppModule { }
