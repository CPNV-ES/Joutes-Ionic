import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
 Generated class for the TeamService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class TeamService {
    teams: any;
    constructor(public http: Http) {
        this.http = http;
    }

    getByEvent(eventId): any {
        return this.http.get('http://172.17.102.188/Joutes/public/api/' + eventId + '/teams').map(res => res.json());
    }
}
