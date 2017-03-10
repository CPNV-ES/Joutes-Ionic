import {Component} from '@angular/core';
import {NavController, NavParams, Refresher} from 'ionic-angular';
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
    pool: any = {id: ''};
    teamData: any = {};

    constructor(public navCtrl: NavController, public navParam: NavParams, public sharedDataProvider: SharedDataService, public teamProvider: TeamService) {
        this.loadData();
    }

    loadData() {
        // Get the current event
        this.event = this.sharedDataProvider.getCurrentEvent();
        // Get the current team
        this.team = this.sharedDataProvider.getCurrentTeam();

        // Get the team
        this.teamProvider.getTeam(this.team.id, this.event.id).subscribe(data => this.teamData = data);
    }

    // Refresh the current page
    refresh(refresher: Refresher) {
        this.loadData();

        setTimeout(() => {
            refresher.complete();
        }, 1000);
    }

    // Go to page detail pool
    goToPool(tournament, pool_id) {
        // Add a spinner when the view is loaded
        document.getElementById('spinnerContent').style.visibility = 'visible';

        this.sharedDataProvider.setCurrentTournament(tournament);
        this.pool.id = pool_id;
        this.sharedDataProvider.setCurrentPool(this.pool);
        this.navCtrl.push(PoolPage);
    }

    // Go to page detail tournament
    goToTournament(tournament) {
        // Add a spinner when the view is loaded
        document.getElementById('spinnerContent').style.visibility = 'visible';

        this.sharedDataProvider.setCurrentTournament(tournament);
        this.navCtrl.push(TournamentPage);
    }

    // Set different icons for the sport
    setIconSports(sport)
    {
        switch (sport)
        {
            case 'Badminton':
                return 'badminton.png';
            case 'Basketball':
                return 'basketball.png';
            case 'Football':
                return 'football.png';
            case 'Pétanque':
                return 'petanque.png';
            case 'Unihockey':
                return 'unihockey.png';
            case 'Volley':
                return 'volley.png';
            case 'Marche':
                return 'walking.png';
            default:
                return 'default.png'
        }
    }

    // Add a spinner when the view is loading
    ionViewDidLoad() {
        document.getElementById('spinnerContent').style.visibility = 'hidden';
    }
}

