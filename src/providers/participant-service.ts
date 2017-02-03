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

    getParticipantsByEvent(eventId): any
    {
        return this.http.get(this.sharedDataProvider.getCurrentIp()+`/${eventId}/participants`).map(res => res.json());
    }

    getParticipant(participantId, eventId)
    {
        console.log(this.sharedDataProvider.getCurrentIp()+`/${eventId}/participants/${participantId}`);
        return this.http.get(this.sharedDataProvider.getCurrentIp()+`/${eventId}/participants/${participantId}`).map(res => res.json());
    }
}
