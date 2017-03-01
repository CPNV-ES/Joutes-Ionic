import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {SharedDataService} from "./sharedData-service";

/*
 Generated class for the ParticipantService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ParticipantService {

    event: any;
    participant: any;

    constructor(public http: Http, public sharedDataProvider: SharedDataService) {
        this.http = http;
    }

    // Get the json for participants by event
    getParticipantsByEvent(eventId): any
    {
        return this.http.get(this.sharedDataProvider.getCurrentIp()+`/events/${eventId}/participants`).map(res => res.json());
    }

    // Get the json for participant
    getParticipant(eventId, participantId)
    {
        return this.http.get(this.sharedDataProvider.getCurrentIp()+`/events/${eventId}/participant/${participantId}`).map(res => res.json());
    }
}
