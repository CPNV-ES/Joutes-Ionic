import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpService} from "./http-service";

/*
 Generated class for the PoolService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class PoolService {

    constructor(private httpService: HttpService) {
        this.httpService = httpService;
    }

    // Get the json for pool
    getPool(tournamentId, eventId, poolId)
    {
        return this.httpService.getJson(`/events/${eventId}/tournament/${tournamentId}/${poolId}`);
    }

}
