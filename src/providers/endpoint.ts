import { Injectable } from '@angular/core';
import { Endpoint } from '../models/endpoint';
import { Storage } from '@ionic/storage';

@Injectable()
export class EndpointProvider {

  private endpoints: Array<Endpoint> = []
  private keyName: string = 'endpoints'

  constructor(private storage: Storage) {
    this.syncEndpoints(false)
  }

  create(endpoint: Endpoint) {
    if (this.endpoints != null) {
      this.endpoints.push(endpoint)
    } else {
      this.endpoints = [endpoint]
    }
    return this.storage.set(this.keyName,this.endpoints)
  }

  async update(oldEndpoint, newEndpoint) {
    let index = this.endpoints.indexOf(oldEndpoint)
    if (index > -1) {
      this.endpoints[index] = newEndpoint
    }
    await this.syncEndpoints(true)
  }

  async delete(endpoint: Endpoint) {
    let index = this.endpoints.indexOf(endpoint);
    if (index > -1) {
      this.endpoints.splice(index, 1);
    }
    await this.syncEndpoints(true);
  }

  getAll() {
    return this.endpoints
  }

  private async syncEndpoints(save: boolean) {
    if (save) {
      await this.storage.set(this.keyName, this.endpoints)
    } else {
      this.endpoints = await this.storage.get(this.keyName)
    }
  }

}
