import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {SharedDataService} from "./sharedData-service";

/*
 Generated class for the TeamService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class TeamService {
    teams: any;
    event: any;
    constructor(public http: Http,  public sharedDataProvider: SharedDataService) {
        this.http = http;

    }

    getTeamsByEvent(eventId): any {
        return this.http.get(`http://172.17.102.188/Joutes/public/api/${eventId}/teams`).map(res => res.json());
    }

    getTeam(teamId, eventId)
    {
        console.log("Team" + teamId);
        console.log("Event" + eventId);
        return this.http.get(`http://172.17.102.188/Joutes/public/api/${eventId}/team/${teamId}`).map(res => res.json());
    }
}
