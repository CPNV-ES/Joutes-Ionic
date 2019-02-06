import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../models/event'
import { EndpointProvider } from './endpoint';

@Injectable()
export class EventProvider {

  private events: Array<Event> = []

  constructor(private http: HttpClient, private endpointProvider: EndpointProvider) {
    
  }
  
  private async getAllFromAPI() {
    if (await this.endpointProvider.isReady())
    {
      return this.http.get(`${this.endpointProvider.getCurrent().address}/events`).toPromise()
    }
  }

  async getAll() {
    let data = <any> await this.getAllFromAPI()
    return data.events
  }
}
