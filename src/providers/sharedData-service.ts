import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class SharedDataService {
    currentEvent: any;
    currentTeam: any;
    currentTournament: any;
    currentPool: any;
    constructor(public storage: Storage) {}

    getCurrentIp() {
        // return "http://192.168.0.51";
        return "http://172.17.102.188";
    }

    getCurrentEvent(): any {
        return this.currentEvent;
    }

    setCurrentEvent(event): any {
        this.currentEvent = event;
    }

    getCurrentEventFavoritesTeams() {
        return this.storage.get('event'+this.currentEvent.id).then(val => {
            return val;
        });
    }

    setCurrentEventFavoritesTeams(favoritesTeams) {
        this.storage.set('event'+this.currentEvent.id, favoritesTeams);
    }

    setCurrentTeam(team)
    {
        this.currentTeam = team;
    }

    getCurrentTeam(): any {
        return this.currentTeam;
    }

    setCurrentTournament(tournament)
    {
        this.currentTournament = tournament;
    }

    getCurrentTournament(): any {
        return this.currentTournament;
    }

    setCurrentPool(currentPool)
    {
        this.currentPool = currentPool;
    }

    getCurrentPool(): any {
        return this.currentPool;
    }
}
