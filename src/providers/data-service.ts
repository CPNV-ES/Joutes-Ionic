import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { AlertController } from "ionic-angular";
import { SharedDataService } from "./sharedData-service";
import localForage from "localforage";
import { EndpointProvider } from './endpoint';


/*
 Generated class for the DataService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class DataService implements OnInit {

    private _serverUrl: string;

    constructor(private endpointProvider: EndpointProvider, private http: HttpClient, private alertCtrl: AlertController, private sharedDataProvider: SharedDataService) { }

    async ngOnInit() {
        await this.endpointProvider.isReady()
    }
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
        this._serverUrl = this.endpointProvider.getCurrent().address
    }

    getServeUrl(){
        return this._serverUrl
    }

    sendRequest(uri, callback = null) {
        console.log(this._serverUrl+uri);

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
                subTitle: 'Certaine données n\'ont pas pu être chargées, veuillez vérifier que vous êtes bien connecté au réseau dédié',
                buttons: ['Ok']
            });
            alert.present();
            this.sharedDataProvider.httpError = true;
        }
    }
}
