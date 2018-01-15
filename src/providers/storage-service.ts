import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {HttpService} from "./http-service";

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
    constructor(private httpService: HttpService) {
        
    }
    start()
    {
        Observable.interval(60 * this.refreshFrequency).subscribe(x => {
            console.log("test storage");
        });
    }


}
