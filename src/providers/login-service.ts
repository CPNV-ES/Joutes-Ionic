import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from "./data-service";

/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginService {

  constructor(private dataService: DataService, private http: HttpClient) {
    this.dataService = dataService;
  }

  // Get the Login url of the current endpoints
  getLoginUrl(){
    return this.dataService.getServeUrl() + "/login"
  }

  checkIfLogged(){
    let url = this.dataService.getServeUrl() + "/profil"
    let data = this.dataService.getApiJson("/profil")
    console.log(data)
  }

}
