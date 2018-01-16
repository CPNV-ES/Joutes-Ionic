import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {DataService} from "./data-service";

/*
 Generated class for the ParticipantService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ParticipantService {

    constructor(private dataService: DataService) {
        this.dataService = dataService;
    }

    // Get the json for participants by _event
    getParticipantsByEvent(eventId): any
    {
        return this.dataService.getJson(`/events/${eventId}/participants`);
    }

    // Get the json for _participant
    getParticipant(eventId, participantId)
    {
        return this.dataService.getJson(`/events/${eventId}/participants/${participantId}`);
    }
}
