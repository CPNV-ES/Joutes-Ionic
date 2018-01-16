import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {DataService} from "./data-service";



/*
  Generated class for the EventService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventService
{
    constructor(private dataService: DataService) {
        this.dataService = dataService;
    }

    // Get the json for events
    getEvents() {
        return this.dataService.getJson('/events');
    }
}
