import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TeamService} from "../../providers/team-service";
import {SharedDataService} from '../../providers/sharedData-service';

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


    constructor(public navCtrl: NavController, public teamProvider: TeamService, public sharedDataProvider: SharedDataService)
    {
        this.event = this.sharedDataProvider.getCurrentEvent();

        this.teamProvider.getByEvent(this.event.id).subscribe(data => {this.teams = data.teams; this.filteredTeams = data.teams}, this.filterTeams)

    }

    filterTeams()
    {
        this.filteredTeams = this.teams.filter((team) => {
            return team.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
        });
    }

    ionViewDidLoad() {
    }

}
