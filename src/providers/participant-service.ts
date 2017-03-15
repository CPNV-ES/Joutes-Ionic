import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpService} from "./http-service";

/*
 Generated class for the ParticipantService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ParticipantService {

    constructor(private httpService: HttpService) {
        this.httpService = httpService;
    }

    // Get the json for participants by _event
    getParticipantsByEvent(eventId): any
    {
        return this.httpService.getJson(`/events/${eventId}/participants`);
    }

    // Get the json for _participant
    getParticipant(eventId, participantId)
    {
        return this.httpService.getJson(`/events/${eventId}/participant/${participantId}`);
    }
}
