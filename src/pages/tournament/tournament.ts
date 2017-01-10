import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {SharedDataService} from '../../providers/sharedData-service';
import {TournamentService} from '../../providers/tournament-service';

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
    event: any;
    tournament: any;
    tournamentData: any = {};

    constructor(public navCtrl: NavController, public navParam: NavParams, public sharedDataProvider: SharedDataService, public tournamentProvider: TournamentService) {
        this.event = sharedDataProvider.getCurrentEvent();
        this.tournament = sharedDataProvider.getCurrentTournament();
        console.log(this.tournament);
        this.tournamentProvider.getTournament(this.tournament.id, this.event.id).subscribe(data => this.tournamentData = data);
    }

    ionViewDidLoad() {
    }

}