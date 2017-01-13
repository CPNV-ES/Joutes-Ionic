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

    public event: any;
    public tournament: any;
    public tournamentData: any = {};

    constructor(public navCtrl: NavController, public navParam: NavParams, public tournamentProvider: TournamentService, public sharedDataProvider: SharedDataService) {
        this.event = sharedDataProvider.getCurrentEvent();
        this.tournament = sharedDataProvider.getCurrentTournament();

        this.tournamentProvider.getTournament(this.tournament.id, this.event.id).subscribe(data => this.tournamentData = data);
    }

    ionViewDidLoad() {
        console.log('Hello TournamentPage Page');
    }

}