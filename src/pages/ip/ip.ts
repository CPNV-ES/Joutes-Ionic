import { Component } from "@angular/core";
import { SharedDataService } from "../../providers/sharedData-service";

@Component({
    selector: "page-ip",
    templateUrl: "ip.html"
})
export class IpPage {
    private _currentIpChoice;

    get currentIpChoice() {
        return this._currentIpChoice;
    }

    set currentIpChoice(value) {
        this._currentIpChoice = value;
    }

    constructor(private sharedDataProvider: SharedDataService) {
        this._currentIpChoice = this.sharedDataProvider.IpChoice;
    }

    setIP(ip) {
        this.sharedDataProvider.IpChoice = ip;
        this._currentIpChoice = this.sharedDataProvider.IpChoice;
    }

    displayMenu() {
        this.sharedDataProvider.displayMenu();
    }
}
