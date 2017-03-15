import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpService} from "./http-service";

/*
 Generated class for the TournamentService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class TournamentService {

    constructor(private httpService: HttpService) {
        this.httpService = httpService;
    }

    // Get the json for tournaments by _event
    getTournamentsByEvent(eventId): any
    {
        return this.httpService.getJson(`/events/${eventId}/tournaments`);
    }

    // Get the json for _tournament
    getTournament(eventId, tournamentId)
    {
        return this.httpService.getJson(`/events/${eventId}/tournament/${tournamentId}`);
    }
}