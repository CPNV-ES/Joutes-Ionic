import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { AlertController } from "ionic-angular";
import { SharedDataService } from "./sharedData-service";
import localForage from "localforage";


/*
 Generated class for the DataService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class DataService {

    private _serverUrl: string;

    constructor(private http: HttpClient, private alertCtrl: AlertController, private sharedDataProvider: SharedDataService) { }

    // Get the JSON, URI must have a / before
    getJson(uri) {
        this.getUrl();
        return this.sendRequest(uri, async function() {
            //get stored data
            let data = await localForage.getItem(uri)
            return data;
        });
    }
    getApiJson(uri) {
        this.getUrl();

        return this.sendRequest(uri);
    }
    getUrl() {
        //Set the ip corresponding to the current choice
        switch (this.sharedDataProvider.IpChoice) {
            case "LANServer":
                this._serverUrl = "http://joutes.api/api";
                break;
            case "RemoteServer":
                this._serverUrl = "http://192.168.42.50/api";
                break;
            case "Internet":
                this._serverUrl = "https://markal.servehttp.com/Joutes/api";
                break;
            default:
                this._serverUrl = "http://joutes.api/api";
                break;
        }
    }

    sendRequest(uri, callback = null) {
        console.log("GET", this._serverUrl+uri);

        return this.http
            .get(this._serverUrl + uri)
            .map(res => {
                let resJson = res;

                localForage.setItem(uri, resJson, function(error) {
                    if (error) console.error(error);
                })

                return resJson;
            })
            .catch(e => {
                if (callback == null) {
                    this.displayError();
                    return Observable.throw(e)
                } else {

                    return callback();
                }
            });
    }

    // Display a error message if there is no connection
    displayError() {
        if (!this.sharedDataProvider.httpError) {
            let alert = this.alertCtrl.create({
                title: 'Attention',
                subTitle: 'Certaine données n\'ont pas pu être chargées, veuillez vérifier que vous êtes bien connecté au réseau dédié.',
                buttons: ['Ok']
            });
            alert.present();
            this.sharedDataProvider.httpError = true;
        }
    }

    putJson(uri, json) {
        console.log("PUT", this._serverUrl+uri)
        return this.http.put(this._serverUrl+uri, json, {headers:{"Content-Type":"application/x-www-form-urlencoded"}})
    }
}
