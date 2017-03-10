import {Component} from '@angular/core';
import {NavController, NavParams, Refresher} from 'ionic-angular';
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
    public finish: boolean = true;

    constructor(public navCtrl: NavController, public navParam: NavParams, public tournamentProvider: TournamentService, public sharedDataProvider: SharedDataService) {
        this.loadData();
    }

    loadData() {
        // Get the current event
        this.event = this.sharedDataProvider.getCurrentEvent();
        // get the current tournament
        this.tournament = this.sharedDataProvider.getCurrentTournament();

        // Get the tournament
        this.tournamentProvider.getTournament(this.event.id, this.tournament.id).subscribe(data => this.tournamentData = data);
    }

    // Refresh the current page
    refresh(refresher: Refresher) {
        this.loadData();

        setTimeout(() => {
            refresher.complete();
        }, 1000);
    }

    // Go to page detail pool
    goToPool(pool) {
        // Add a spinner when the view is loaded
        document.getElementById('spinnerContent').style.visibility = 'visible';

        this.sharedDataProvider.setCurrentPool(pool);
        this.navCtrl.push(PoolPage);
    }

    // Go to page detail team
    goToTeam(team) {
        // Add a spinner when the view is loaded
        document.getElementById('spinnerContent').style.visibility = 'visible';

        this.sharedDataProvider.setCurrentTeam(team);
        this.navCtrl.push(TeamPage);
    }

    // Add a spinner when the view is loading
    ionViewDidLoad() {
        document.getElementById('spinnerContent').style.visibility = 'hidden';
    }

}