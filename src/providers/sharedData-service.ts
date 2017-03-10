import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable()
export class SharedDataService {
    currentEvent: any;
    currentTeam: any;
    currentTournament: any;
    currentPool: any;
    currentParticipant: any;
    private _httpError: boolean = false;

    constructor(public storage: Storage) {
    }

    get httpError() {
        return this._httpError
    }

    set httpError(value) {
        this._httpError = value;
    }

    // Get current event
    getCurrentEvent(): any {
        return this.currentEvent;
    }

    // Set current event
    setCurrentEvent(event): any {
        this.currentEvent = event;
    }

    // Get current favorite teams
    getCurrentEventFavoritesTeams() {
        return this.storage.get('event' + this.currentEvent.id).then(val => {
            return val;
        });
    }

    // Set current favorite teams
    setCurrentEventFavoritesTeams(favoritesTeams) {
        this.storage.set('event' + this.currentEvent.id, favoritesTeams);
    }

    // Get current team
    getCurrentTeam(): any {
        return this.currentTeam;
    }

    // Set current team
    setCurrentTeam(team) {
        this.currentTeam = team;
    }

    // Get current tournament
    getCurrentTournament(): any {
        return this.currentTournament;
    }

    // Set current tournament
    setCurrentTournament(tournament) {
        this.currentTournament = tournament;
    }

    // Get current pool
    getCurrentPool(): any {
        return this.currentPool;
    }

    // Set current pool
    setCurrentPool(currentPool) {
        this.currentPool = currentPool;
    }

    // Get current participant
    getCurrentParticipant(): any {
        return this.currentParticipant;
    }

    // Set current participant
    setCurrentParticipant(participant) {
        this.currentParticipant = participant;
    }
}