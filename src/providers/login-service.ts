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

  private _userlogged = false;
  private _teams 
  private _user;

  constructor(private dataService: DataService, private http: HttpClient) {
    this.dataService = dataService;
  }

  // Get the Login url of the current endpoints
  getLoginUrl() {
    return this.dataService.getServeUrl() + "/login"
  }

  // check if user is already logged
  checkIfLogged() {
    const o1 = this.dataService.getApiJson("/profil").do(data => {
      console.log(data)
      this._teams = data["teams"]
      this._user = data["user"]
    })
    //console.log(`user ${this._user} teams ${this._teams}`)
    Observable.forkJoin(o1).subscribe()
    
  }

}
