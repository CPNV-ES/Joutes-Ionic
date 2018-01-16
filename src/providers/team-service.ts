import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {DataService} from "./data-service";

/*
 Generated class for the TeamService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class TeamService {

    constructor(private dataService: DataService) {
        this.dataService = dataService;
    }

    // Get the json for teams by _event
    getTeamsByEvent(eventId): any
    {
        return this.dataService.getJson(`/events/${eventId}/teams`);
    }

    // Get the json for team
    getTeam(teamId, eventId)
    {
        return this.dataService.getJson(`/events/${eventId}/teams/${teamId}`);
    }
}
