import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {SharedDataService} from '../../providers/sharedData-service';
import {TeamService} from '../../providers/team-service';
import {PoolPage} from "../pool/pool";
import {TournamentPage} from "../tournament/tournament";

@Component({
    selector: 'page-team',
    templateUrl: 'team.html'
})
export class TeamPage {
    event: any;
    team: any;
    pool: any = {id:''};
    teamData: any = {};


    constructor(public navCtrl: NavController, public navParam: NavParams, public sharedDataProvider: SharedDataService, public teamProvider: TeamService) {
        this.event = sharedDataProvider.getCurrentEvent();
        this.team = sharedDataProvider.getCurrentTeam();

        this.teamProvider.getTeam(this.team.id, this.event.id).subscribe(data => this.teamData = data);
    }

    goToPool(tournament, pool_id)
    {
        this.sharedDataProvider.setCurrentTournament(tournament)
        this.pool.id = pool_id;
        this.sharedDataProvider.setCurrentPool(this.pool);
        this.navCtrl.push(PoolPage);
    }

    goToTournament(tournament)
    {
        this.sharedDataProvider.setCurrentTournament(tournament)
        this.navCtrl.push(TournamentPage);
    }

    ionViewDidLoad() {
    }
}
