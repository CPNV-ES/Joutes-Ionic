import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the EventService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventService
{
    public events: any;

    constructor(public http: Http)
    {

    } 

    getEvents()
    {
        // return this.http.get('http://192.168.0.51/Joutes/public/api/events').map(res => res.json());
        return this.http.get('http://172.17.102.188/Joutes/public/api/events').map(res => res.json());
    }
}