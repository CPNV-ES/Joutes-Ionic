import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { DataService } from './data-service';
import localForage from "localforage";
import { take } from 'rxjs/operator/take';

/**
 * 
 *  Generated class for the Storager provider.
 * 
 *  Send Request every 5 minutes 
 */

@Injectable()
export class StorageService {
    private _dataProvider
    public refreshFrequency = 5;

    private eventsId : number[]; //because app has been designed to handle multiple events (sport event )
    private tournamentsId : number[];
    private teamsId : number[];
    private participantsId : number[];
    private listUri : string[];

   

    constructor(private dataProvider: DataService) {
        this._dataProvider = dataProvider;
        
    }
    start()
    {
        let tree = new Tree(this._dataProvider);
       
        console.log("test");

        // Observable.interval(500 * this.refreshFrequency).subscribe(x => {
        //     this.getEvents().subscribe( data => {

        //      
        //         }
        //     });
        // });
    }


    apiCall(uri)
    {
        const o1 = this._dataProvider.getApiJson(uri).do();
        return Observable.forkJoin(o1);
    }
    /**
     * replace the id in uri with the format {id}
     */



}
@Injectable()
class Tree
{
    private _rootNode;
    private _dataProvider;
    private _treeObject = 
        {
            url : '/events',
            key : 'events',
            children : 
            [
                {
                    url : '{idEvent}/tournaments',
                    key : 'tournaments',
                    children : [
                        {
                            url: '{idTournament}',
                            key : 'tournament',
                            children: []
                        }
                    ]
                },
                {
                    url: '{idEvent}/teams',
                    key : 'teams',
                    children : []
                },
                {
                    url: '{idEvent}/participants',
                    key : 'teams',
                    children : [{
                            url: '{idTournament}',
                            key : 'team',
                            children: []
                    
                    }]
                }
            ]
        }

    constructor(private dataProvider: DataService)
    {
        this._dataProvider = dataProvider;
        this._rootNode = this.build(this._treeObject);
        this._rootNode.browse();
    }
    build(object)
    {
      
        let currentNode = new Node(this._dataProvider, object.url, object.key);

        for(let i = 0; i < object.children.length; i++)
        {
            let child   = object.children[i];
            currentNode.addChild( this.build( child ));
        }
        return currentNode;
    }
}


@Injectable()
class Node
{
    private _url : string;
    private _children = [];
    private _dataProvider;
    private _key : string;

    constructor(dataProvider : DataService, url: string, key : string)
    {
        this._url           = url;
        this._dataProvider  = dataProvider;
        this._key           = key;
    }
    addChild(node : Node)
    {
        this._children.push(node);
    }
    browse( parentId = '', parentUrl='',)
    {
        let url = this.buildUrl(parentId, parentUrl);
        this.callApi(url).subscribe(apiData => {
           
            let data = apiData[0][this._key];
            this.save(url,  apiData[0])
            for(let i = 0 ; i < data.length ; i++)
            {
                for(let j = 0; j < this._children.length; j++)
                {
                    let child = this._children[j];
                    child.browse(data[i].id, url);
                }
                
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
            url = parentUrl +'/'  +  url ; 
        }
        console.log("build URL",url);
        return url ;
    }
    save(url, content)
    {
        localForage.setItem(url, content, function (error) {
            if(error) console.error(error);
            console.log("",url,content);
        })
    }
}