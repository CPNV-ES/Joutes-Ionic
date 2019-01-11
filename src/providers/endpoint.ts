import { Injectable } from '@angular/core';
import { Endpoint } from '../models/endpoint';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from '../app/app.const';
import { global } from '@angular/core/src/util';

@Injectable()
export class EndpointProvider {

  private endpoints: Array<Endpoint> = []
  private keyName: string = 'endpoints'

  constructor(private storage: Storage, private httpClient: HttpClient) {
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

  async update(oldEndpoint: Endpoint, newEndpoint: Endpoint) {
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

  isNameNotExists(name: string) {
    // Check if every name value are not equal
    return this.endpoints.every(endpoint => endpoint.name.toLowerCase() !== name.toLowerCase())
  }

  // Check if the endpoint is valid
  async isEndpointValid(endpoint: Endpoint) {
    // Http request get on the endpoint
    let result = await this.httpClient.get(endpoint.address).toPromise<any>()
    // Check if requirement exists in the result
    if (GLOBAL.apiRequirements.every(requirement => requirement in result)) {
      // Check if the api version is the same
      if (result.version === GLOBAL.apiVersion) {
        return true
      }
    }
    return false
  }

  private async syncEndpoints(save: boolean) {
    if (save) {
      await this.storage.set(this.keyName, this.endpoints)
    } else {
      this.endpoints = await this.storage.get(this.keyName)
    }
  }

}
