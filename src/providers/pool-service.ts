import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {SharedDataService} from "./sharedData-service";

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

    constructor(public http: Http, public sharedDataProvider: SharedDataService) {
        this.http = http;
    }

    getPool(tournamentId, eventId, poolId)
    {
        return this.http.get(this.sharedDataProvider.getCurrentIp()+`/Joutes/public/api/${eventId}/tournament/${tournamentId}/${poolId}`).map(res => res.json());
    }

}
