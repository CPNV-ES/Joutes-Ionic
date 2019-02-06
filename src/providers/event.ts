import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../models/event'
import { EndpointProvider } from './endpoint';
import { Storage } from '@ionic/storage';

@Injectable()
export class EventProvider {

  private events: Array<Event> = []
  private keyName: string = 'events'

  constructor(private http: HttpClient, private endpointProvider: EndpointProvider, private storage: Storage) {
    
  }
  
  // Get data from api
  private async getAllFromAPI() {
    if (await this.endpointProvider.isReady())
    {
      return this.http.get(`${this.endpointProvider.getCurrent().address}/events`).toPromise()
    }
  }

  // Get data from local storage
  private async getAllFromLocal() {
    if (await this.endpointProvider.isReady()) {
      return this.storage.get(this.keyName)
    }
  }

  async getAll(isOnline: boolean) {
    let data: any = []

    // Take the good provider
    if (isOnline) {
      data = await this.getAllFromAPI()
      // Test if events exists
      if (data != null && 'events' in data) {
        data = data.events
        // Save in the local storage
        this.setLocalData(data)
      } else {
        data = []
      }
    } else {
      data = await this.getAllFromLocal()
    }
    return data
  }

  private setLocalData(events: Array<Event>) {
    return this.storage.set(this.keyName,events)
  }
}
