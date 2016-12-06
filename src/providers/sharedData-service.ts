import {Injectable} from '@angular/core';


@Injectable()
export class SharedDataService {
    currentEvent: any;
    constructor() {}

    getCurrentEvent(): any {
        return this.currentEvent;
    }

    setCurrentEvent(event): any {
        this.currentEvent = event;
    }
}
