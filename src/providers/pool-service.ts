import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
 Generated class for the PoolService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class PoolService {

    teams: any;
    event: any;
    pool: any;

    constructor(public http: Http) {
        this.http = http;
    }

    getPool(tournamentId, eventId, poolId) {
        // return this.http.get(`http://192.168.0.51/Joutes/public/api/${eventId}/tournament/${tournamentId}/${poolId}`).map(res => res.json());
        return this.http.get(`http://172.17.102.188/Joutes/public/api/${eventId}/tournament/${tournamentId}/${poolId}`).map(res => res.json());
    }

}
