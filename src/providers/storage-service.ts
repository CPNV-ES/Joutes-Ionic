import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { DataService } from './data-service';
import localForage from "localforage";
import { take } from 'rxjs/operator/take';

/**
 *
 *  Generated class for the Storager provider.
 *
 *  Send Request every 10 minutes
 */

@Injectable()
export class StorageService {
    public refreshFrequency = 10; //minutes
    private _treeObject =
        {
            url : '/events',
            key : 'events',
            children : [{
                url : '/{idEvent}',
                key : 'event',
                children :
                [
                    {
                        url : '/tournaments',
                        key : 'tournaments',
                        children : [
                            {
                                url: '/{idTournament}',
                                key : 'tournament',
                                children: [
                                    {
                                        url : '/pools/{idPool}',
                                        key: 'pools',
                                        stagedColumn: 'pool',
                                        children : []
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        url : '/teams',
                        key : 'teams',
                        children : [
                            {
                                url : '/{idTeam}',
                                key : 'team',
                                children : []
                            }

                        ]
                    },
                    {
                        url: '/participants',
                        key : 'participants',
                        children : [
                            {
                                url : '/{idParticipant}',
                                key : 'participant',
                                children : []

                            }
                        ]
                    }
                ]
            }]
        }



    constructor(private dataProvider : DataService) {
    }

    start(dataProvider)
    {
            console.log("Offline mode start")
            const rootNode = new Resource(this._treeObject, dataProvider);
            rootNode.browse();
    }
}
@Injectable()
class Resource
{
    private _url : string;
    private _children = [];
    private _key : string;
    private _stagedColumn : string;
    private _dataProvider

    constructor(subtree, private dataProvider : DataService)
    {
        this._url               = subtree.url
        this._key               = subtree.key
        this._stagedColumn      = subtree.stagedColumn
        this._dataProvider      = dataProvider

        for(let i = 0; i < subtree.children.length; i++)
        {
            const child = new Resource(subtree.children[i], this._dataProvider);
            this.addChild(child)
        }
         
    }
    addChild(node : Resource)
    {
        this._children.push(node);
    }

    browse( parentId = '', parentUrl='')
    {
        let url = this.buildUrl(parentId, parentUrl);
        const  browseNext =  (data) =>
        {
            for(let j = 0; j < this._children.length; j++)
            {
                
                let child   = this._children[j];
                let key     = child._key

                // patch because events/ID/tournaments/ID/pools (to list the pools) doesnt exist yet
                if(child._stagedColumn != undefined) {
                    for(let k = 0 ; k < data[key].length; k++) {                       
                        child.browse( data[key][k].id, url);
                    }
                }
                else {
                    
                    child.browse(data.id, url); 
                }  
            }
        }
        this.callApi(url).subscribe(apiData => {

            let data = (this._stagedColumn == undefined) ?  apiData[0][this._key] : apiData[0][this._stagedColumn];

            this.save(url,  apiData[0])

            if(data.length > 0){

                for(let i = 0 ; i < data.length ; i++)
                {
                    browseNext(data[i])
                }
            }
            else{
                browseNext(data);
            }
        });
    }

    //  to get data from url
    callApi(url)
    {
        const o1 = this._dataProvider.getApiJson(url).do();
        return Observable.forkJoin(o1);
    }
    //replace {something} by id
    replaceId(uri, id)
    {
       return uri.replace(/{\w+}/g, id);
    }
    buildUrl(parentId, parentUrl)
    {

        let url = this._url;
        if(parentId != '') {
            url = this.replaceId(this._url, parentId)
        }
        if(parentUrl != '')
        {
            url = parentUrl +  url ;
        }
        return url ;
    }
    save(url, content)
    {
        localForage.setItem(url, content, function (error) {
            if(error) console.error(error);
        })
    }
}
