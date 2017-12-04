import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpService} from "./http-service";

/*
 Generated class for the TeamService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class TeamService {

    constructor(private httpService: HttpService) {
        this.httpService = httpService;
    }

    // Get the json for teams by _event
    getTeamsByEvent(eventId): any
    {
        return this.httpService.getJson(`/events/${eventId}/teams`);
    }

    // Get the json for team
    getTeam(teamId, eventId)
    {
        return this.httpService.getJson(`/events/${eventId}/teams/${teamId}`);
    }
}
