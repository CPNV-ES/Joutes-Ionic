import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {AlertController} from "ionic-angular";
import {SharedDataService} from "./sharedData-service";

/*
 Generated class for the HttpService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class HttpService {

    private _serverUrl : string;

    constructor(private http: Http, private alertCtrl: AlertController, private sharedDataProvider: SharedDataService) {
        //Return the IP corresponding to the current choice

        //Raspberry address
        // this._serverUrl = "https://markal.servehttp.com/Joutes/api";

        //Wifi IP
        //this._serverUrl = "http://192.168.0.51/Joutes/public/api";

        //LAN IP
        // this._serverUrl = "http://172.17.102.188/Joutes/public/api";

        //LAN IP REAL
        // this._serverUrl = "http://172.17.102.188/Joutes-real/Joutes/public/api";
    }

    // Get the JSON, URI must have a / before
    getJson(uri) {
        //Set the ip corresponding to the current choice
        switch(this.sharedDataProvider.IpChoice) {
            case "LANServer" :
                this._serverUrl = "http://joutes.api/api";
                break;
            case "LANServerReal" :
                this._serverUrl = "http://172.17.102.188/Joutes-real/Joutes/public/api";
                break;
            case "WLANServer" :
                this._serverUrl = "http://192.168.0.51/Joutes/public/api";
                break;
            case "WLANServerReal" :
                this._serverUrl = "http://192.168.0.51/Joutes-real/Joutes/public/api";
                break;
            case "Internet" :
                this._serverUrl = "https://markal.servehttp.com/Joutes/api";
                break;
            default:
                this._serverUrl = "http://joutes.api/api";
                break;
        }

        console.log(this._serverUrl+uri);

        return this.http
            .get(this._serverUrl+uri)
            .map(res => res.json())
            .catch(e => {
                this.displayError();
                return Observable.throw(e)
            });
    }

    // Display a error message if there is no connection
    displayError() {
        if(!this.sharedDataProvider.httpError) {
            let alert = this.alertCtrl.create({
                title: 'Attention',
                subTitle: 'Certaine données n\'ont pas pu être chargées, veuillez vérifier que vous êtes bien connecté au réseau dédié',
                buttons: ['Ok']
            });
            alert.present();
            this.sharedDataProvider.httpError = true;
        }
    }
}
