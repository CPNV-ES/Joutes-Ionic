import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from "./data-service";
import { Observable } from "rxjs";

/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginService {

  private _userlogged = false
  private _teams
  private _user


  constructor(private dataService: DataService, private http: HttpClient) {
    this.dataService = dataService;
  }

  // Get the Login url of the current endpoints
  getLoginUrl() {
    return this.dataService.getServeUrl() + "/login"
  }

  // check if user is already logged
  async checkIfLogged() {
    const o1 = this.dataService.getJson("/profil")

    let data = await Observable.forkJoin(o1).toPromise()

    // Set variables
    this._user = data[0]["user"]
    this._teams = data[0]["teams"]
    
    //Check result
    if(this._user != null && this._user != "null"){
      this._userlogged = true
      return true
    }
    else{
      this._userlogged = false
      return false
    }
  }

  getUser(){
    return this._user
  }

  getTeams(){
    return this._teams
  }

  userLogged(){
    return this._userlogged
  }

}
