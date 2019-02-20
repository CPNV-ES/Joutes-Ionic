import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController } from "ionic-angular";

@Injectable()
export class SharedDataService {
    private _currentEvent;
    private _currentTeam;
    private _currentTournament;
    private _currentPool;
    private _currentParticipant;
    private _httpError: boolean = false;
    private _IpChoice;

    constructor(private storage: Storage, public menuCtrl: MenuController) {
        storage.get('IpChoice').then((ip) => {
            if (ip == null) {
                storage.set('IpChoice', 'LANServer');
                this._IpChoice = 'LANServer';
            } else {
                this._IpChoice = ip;
            }
        });
    }

    // Get the error http
    get httpError() {
        return this._httpError
    }

    // Set the error htpp
    set httpError(value) {
        this._httpError = value;
    }

    // Get current _event
    get currentEvent() {
        return this._currentEvent;
    }

    // Set current _event
    set currentEvent(value) {
        this._currentEvent = value;
    }

    // Get current team
    get currentTeam() {
        return this._currentTeam;
    }

    // Set current team
    set currentTeam(value) {
        this._currentTeam = value;
    }

    // Get current _tournament
    get currentTournament() {
        return this._currentTournament;
    }

    // Set current _tournament
    set currentTournament(value) {
        this._currentTournament = value;
    }

    // Get current _pool
    get currentPool() {
        return this._currentPool;
    }

    // Set current _pool
    set currentPool(value) {
        this._currentPool = value;
    }

    // Get current _participant
    get currentParticipant() {
        return this._currentParticipant;
    }

    // Set current _participant
    set currentParticipant(value) {
        this._currentParticipant = value;
    }

    // Get current favorite teams
    get currentEventFavoritesTeams() {
        return this.storage.get('event' + this._currentEvent.id).then(val => {
            return val;
        });
    }

    // Set current favorite teams
    set currentEventFavoritesTeams(value) {
        this.storage.set('event' + this._currentEvent.id, value);
    }

    // Get current favorite teams
    get IpChoice() {
        return this._IpChoice != null ? this._IpChoice : this.storage.get('IpChoice').then((val) => { return val;});
    }

    // Set current favorite teams
    set IpChoice(value) {
        this.storage.set('IpChoice', value);
        this._IpChoice = value;
    }
}
