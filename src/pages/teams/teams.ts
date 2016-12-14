import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TeamService} from "../../providers/team-service";
import {SharedDataService} from '../../providers/sharedData-service';
import { Storage } from '@ionic/storage';

/*
 Generated class for the Teams page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-teams',
    templateUrl: 'teams.html'
})
export class TeamsPage {
    public event: any;
    private teams: any;
    public filteredTeams: any;
    public searchTerm: string = '';
    public userFavoritesTeamsPromise: any;
    public userFavoritesTeamsIds: any;

    constructor(public navCtrl: NavController, public storage: Storage, public teamProvider: TeamService, public sharedDataProvider: SharedDataService)
    {
        this.event = this.sharedDataProvider.getCurrentEvent();
        this.userFavoritesTeamsPromise = this.sharedDataProvider.getCurrentEventFavoritesTeams();

        this.userFavoritesTeamsPromise.then(val => {
           if(val) {
               this.userFavoritesTeamsIds = val.split(',');
           }
        }).catch(e => {
            console.log(e);
        });

        this.teamProvider.getTeamsByEvent(this.event.id).subscribe(data => {this.teams = data.teams; this.filteredTeams = data.teams; this.filterTeams();});
    }

    filterTeams()
    {
        var self = this;
        this.filteredTeams = this.teams.filter((team) => {
            return team.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
        });
        //Put the favorites in front of the array
        var temp = [];

        this.filteredTeams.forEach(function(team) {
            //If we have no favorite, do nothing
            if(self.userFavoritesTeamsIds) {
                if(self.userFavoritesTeamsIds.indexOf(team.id) != -1) {
                    //Add the favorite in front of the array
                    team.favorite = true;
                    temp.unshift(team);
                }
                else {
                    //If it's not a favorite add it at the end
                    team.favorite = false;
                    temp.push(team)
                }
                self.filteredTeams = temp;
            }
        });
    }

    toggleFavoriteTeam(team) {
        this.userFavoritesTeamsPromise = this.sharedDataProvider.getCurrentEventFavoritesTeams();

        this.userFavoritesTeamsPromise.then(val => {
            if(val) {
                this.userFavoritesTeamsIds = val.split(',');
                var index = this.userFavoritesTeamsIds.indexOf(team.id);
                if(index != -1) {
                    this.userFavoritesTeamsIds.splice(index, 1);
                }
                else {
                    this.userFavoritesTeamsIds.push(team.id);
                }
            }
            else {
                //If we have no value, set the first one
                this.userFavoritesTeamsIds = [team.id];
            }
            this.sharedDataProvider.setCurrentEventFavoritesTeams(this.userFavoritesTeamsIds.toString());
        }).catch(e => {
           console.log(e);
        });
    }

    ionViewDidLoad() {
    }

}
