import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { DataService } from './data-service';

/**
 * 
 *  Generated class for the Storager provider.
 * 
 *  Send Request every 5 minutes 
 */

@Injectable()
export class StorageService {
    public refreshFrequency = 5;
    public primaryRoutes = 
    [
        "/event",
        "/"
    ]
    constructor(private dataProvider: DataService) {
        
    }
    start()
    {
        Observable.interval(1000 * this.refreshFrequency).subscribe(x => {
            console.log("test storage");
        });
    }


}
