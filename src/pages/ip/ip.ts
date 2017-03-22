import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SharedDataService} from "../../providers/sharedData-service";

@Component({
    selector: 'page-ip',
    templateUrl: 'ip.html'
})
export class IpPage {

    private _currentIpChoice;

    get currentIpChoice() {
        return this._currentIpChoice;
    }

    constructor(private navCtrl: NavController, private sharedDataProvider: SharedDataService) {
        this._currentIpChoice = this.sharedDataProvider.IpChoice;
    }

    setIP(ip) {
        this.sharedDataProvider.IpChoice = ip;
        this._currentIpChoice = this.sharedDataProvider.IpChoice;
    }

    ionViewDidLoad() {
    }
}