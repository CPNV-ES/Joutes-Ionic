import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpService} from "./http-service";



/*
  Generated class for the EventService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventService
{
    constructor(private httpService: HttpService) {
        this.httpService = httpService;
    }

    // Get the json for events
    getEvents() {
        return this.httpService.getJson('/events');
    }
}