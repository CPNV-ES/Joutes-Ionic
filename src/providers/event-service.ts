import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {SharedDataService} from "./sharedData-service";


/*
  Generated class for the EventService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventService
{
    public events: any;

    constructor(public http: Http, public sharedDataProvider: SharedDataService)
    {
        this.http = http;
    } 

    getEvents()
    {
        return this.http.get(this.sharedDataProvider.getCurrentIp()+`/events`).map(res => res.json());
    }
}