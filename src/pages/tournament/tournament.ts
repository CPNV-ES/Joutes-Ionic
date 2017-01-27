import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {SharedDataService} from '../../providers/sharedData-service';
import {TournamentService} from '../../providers/tournament-service';
import {TeamPage} from "../team/team";
import {PoolPage} from "../pool/pool";

/*
 Generated class for the Tournament page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-tournament',
    templateUrl: 'tournament.html'
})
export class TournamentPage {

    public event: any;
    public tournament: any;
    public tournamentData: any = {};

    constructor(public navCtrl: NavController, public navParam: NavParams, public tournamentProvider: TournamentService, public sharedDataProvider: SharedDataService) {
        this.event = sharedDataProvider.getCurrentEvent();
        this.tournament = sharedDataProvider.getCurrentTournament();

        this.tournamentProvider.getTournament(this.event.id, this.tournament.id).subscribe(data => this.tournamentData = data);
    }

    goToPool(pool) {
        document.getElementById('spinnerContent').style.visibility = 'visible';
        this.sharedDataProvider.setCurrentPool(pool);
        this.navCtrl.push(PoolPage);
    }

    goToTeam(team) {
        document.getElementById('spinnerContent').style.visibility = 'visible';
        this.sharedDataProvider.setCurrentTeam(team);
        this.navCtrl.push(TeamPage);
    }

    ionViewDidLoad() {
        document.getElementById('spinnerContent').style.visibility = 'hidden';
    }

}