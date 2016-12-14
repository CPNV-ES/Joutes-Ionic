import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class SharedDataService {
    currentEvent: any;
    constructor(public storage: Storage) {}

    getCurrentEvent(): any {
        return this.currentEvent;
    }

    setCurrentEvent(event): any {
        this.currentEvent = event;
    }

    getCurrentEventFavoritesTeams() {
        return this.storage.get('event'+this.currentEvent.id).then(val => {
            // if(val) return val;
            // else return Promise.reject('');
            return val;
        });
    }

    setCurrentEventFavoritesTeams(favoritesTeams) {
        this.storage.set('event'+this.currentEvent.id, favoritesTeams);
    }
}
