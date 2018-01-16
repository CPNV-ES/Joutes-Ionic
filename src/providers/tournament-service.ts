import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {DataService} from "./data-service";

/*
 Generated class for the TournamentService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class TournamentService {

    constructor(private dataService: DataService) {
        this.dataService = dataService;
    }

    // Get the json for tournaments by _event
    getTournamentsByEvent(eventId): any
    {
        return this.dataService.getJson(`/events/${eventId}/tournaments`);
    }

    // Get the json for _tournament
    getTournament(eventId, tournamentId)
    {
        return this.dataService.getJson(`/events/${eventId}/tournaments/${tournamentId}`);
    }
}
