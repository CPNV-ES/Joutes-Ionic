import { Injectable, OnInit } from '@angular/core';
import { Endpoint } from '../models/endpoint';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from '../app/app.const';

@Injectable()
export class EndpointProvider implements OnInit {

  private endpoints: Array<Endpoint> = []
  private keyName: string = 'endpoints'
  private online: boolean

  constructor(private storage: Storage, private httpClient: HttpClient) {

  }

  async ngOnInit() {
    await this.isReady()
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

  // Filter endpoints by type
  private getAllByType(type: number) {
    if (type === Endpoint.TYPE_CURRENT || type === Endpoint.TYPE_OFFICIAL || type === Endpoint.TYPE_MANUAL) {
        return this.endpoints.filter(endpoint => endpoint.type === type)
    } else {
      return []
    }
  }

  // Change current endpoint
  async changeCurrent(endpoint: Endpoint) {
    this.endpoints = this.endpoints.filter(endpoint => endpoint.type === Endpoint.TYPE_CURRENT ? false : true)
    let currentEndpoint: Endpoint = new Endpoint(endpoint.name,endpoint.address,Endpoint.TYPE_CURRENT)
    await this.create(currentEndpoint)
  }

  // Get all official for view
  getAllOfficial() {
    return this.getAllByType(Endpoint.TYPE_OFFICIAL)
  }

  // Get all manual for view
  getAllManual() {
    return this.getAllByType(Endpoint.TYPE_MANUAL)
  }

  // Get all current endpoint
  getAllCurrent() {
    return this.getAllByType(Endpoint.TYPE_CURRENT)
  }

  // Get the first current endpoint
  getCurrent() {
    return this.getAllCurrent()[0]
  }

  isNameNotExists(name: string) {
    // Check if the array is empty
    if (this.endpoints && this.endpoints.length) {
      // Check if every name value are not equal
      return this.endpoints.every(endpoint => endpoint.name.toLowerCase() !== name.toLowerCase())
    }
    return true
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
      // The localstorage must be sync
      await this.storage.set(this.keyName, this.endpoints)
    } else {
      // The loca array must be sync
      this.endpoints = await this.storage.get(this.keyName)
    }
    this.initialize()
  }

  private async initialize() {
    // Check if the default api exists
    if (this.isNameNotExists(GLOBAL.apiDefault.name)) {
      // If not: add
      this.create(GLOBAL.apiDefault)
    }
    // Check if we have a current target
    if (!(this.getAllCurrent() && this.getAllCurrent().length)) {
      // if not: add
      this.create(new Endpoint(GLOBAL.apiDefault.name,GLOBAL.apiDefault.address,Endpoint.TYPE_CURRENT))
    }

    await this.getOnlineState()
  }

  // Sync and initialize and return true when it's finished
  async isReady() {
    try {
      await this.syncEndpoints(false)
      await this.initialize()
      return true
    } catch(error) {
      return false
    }
  }

  // Get the state of the connection
  isOnline() {
    return this.online;
  }

  // Change online state
  async getOnlineState() {
    // Test if the endpoint is valid
    try {
      if (!await this.isEndpointValid(this.getCurrent())) {
        this.online = false
      } else {
        this.online = true
      }
    } catch(error) {
      this.online = false
    }
  }
}
