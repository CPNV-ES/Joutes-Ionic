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

    serverUrl : string;

    constructor(private http: Http, private alertCtrl: AlertController, private sharedDataProvider: SharedDataService) {
        //Raspberry address
        // this.serverUrl = "https://markal.servehttp.com/Joutes/api";

        //Wifi IP
        //this.serverUrl = "http://192.168.0.51/Joutes/public/api";

        //LAN IP
        this.serverUrl = "http://172.17.102.188/Joutes/public/api";

        //LAN IP REAL
        // this.serverUrl = "http://172.17.102.188/Joutes-real/Joutes/public/api";
    }

    // Get the JSON, URI must have a / before
    getJson(uri) {
        return this.http
            .get(this.serverUrl+uri)
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
                title: 'Pas de données',
                subTitle: 'Aucune données n\'a pu être chargé, veuillez vérifier que vous êtes bien connecté au réseau dédié',
                buttons: ['Ok']
            });
            alert.present();
            this.sharedDataProvider.httpError = true;
        }
    }
}
