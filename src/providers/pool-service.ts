import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {DataService} from "./data-service";

/*
 Generated class for the PoolService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class PoolService {

    constructor(private dataService: DataService) {
        this.dataService = dataService;
    }

    // Get the json for _pool
    getPool(tournamentId, eventId, poolId)
    {
        return this.dataService.getJson(`/events/${eventId}/tournaments/${tournamentId}/pools/${poolId}`);
    }

}
