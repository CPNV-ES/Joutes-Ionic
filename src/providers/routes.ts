import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointProvider } from './endpoint';

/*
  Generated class for the RoutesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RoutesProvider {

  json: string

  constructor(private http: HttpClient, private endpointProvider: EndpointProvider) {
  }

  // Example : this.routes.get("events.tournaments.pools.show",{"event": 10, "tournament": 20, "pool": 30})
  async get(name: string, params?: {}) {

    // Get json from index /api
    let json:any = await this.http.get(this.endpointProvider.getCurrent().address).toPromise()

    // Get the route array
    let route = json.api_routes[name]

    // if contains property to replace
    if(route.match(/{\w+}/)){

      // Get terms
      let terms = route.match( /{\w+}/g)

      // Remove { and }
      terms = terms.map(x => x.substring(1, x.length-1))

      // Replace in route
      terms.forEach(term => {
        route = route.replace(new RegExp(`{${term}}`), params[term])
      })
    }

    // Extract the hostname, remove /api
    let hostnameUrl = this.endpointProvider.getCurrent().address.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img)

    return (hostnameUrl + route)
  }

}
