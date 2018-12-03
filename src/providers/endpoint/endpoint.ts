import { Injectable } from '@angular/core';
import { Endpoint } from '../../models/endpoint';
import { Storage } from '@ionic/storage';

@Injectable()
export class EndpointProvider {

  private endpoints: Array<Endpoint> = []
  private keyName: string = 'endpoints'

  constructor(private storage: Storage) {
    // Todo: track error
    this.getAll()
  }

  create(endpoint: Endpoint){
    if (this.endpoints != null) {
      this.endpoints.push(endpoint)
    } else {
      this.endpoints = [endpoint]
    }
    return this.storage.set(this.keyName,this.endpoints)
  }

  async getAll() {
    this.endpoints = await this.storage.get(this.keyName)
    return this.endpoints
  }

}
