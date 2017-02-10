import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {SharedDataService} from "./sharedData-service";

/*
 Generated class for the TournamentService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class TournamentService {
    teams: any;
    event: any;

    constructor(public http: Http, public sharedDataProvider: SharedDataService) {
        this.http = http;

    }

    getTournamentsByEvent(eventId): any
    {
        return this.http.get(this.sharedDataProvider.getCurrentIp()+`/events/${eventId}/tournaments`).map(res => res.json());
    }

    getTournament(eventId, tournamentId)
    {
        return this.http.get(this.sharedDataProvider.getCurrentIp()+`/events/${eventId}/tournament/${tournamentId}`).map(res => res.json());
    }
}