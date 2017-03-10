import {Component} from '@angular/core';
import {NavController, NavParams, Refresher} from 'ionic-angular';
import {ParticipantService} from "../../providers/participant-service";
import {SharedDataService} from "../../providers/sharedData-service";
import {TournamentPage} from "../tournament/tournament";
import {TeamPage} from "../team/team";
import {TeamService} from "../../providers/team-service";
import {PoolPage} from "../pool/pool";

/*
 Generated class for the Participant page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-participant',
    templateUrl: 'participant.html'
})
export class ParticipantPage {

    public event: any;
    public participant: any;
    public participantData: any = {};
    public teamData: any = {};
    public pool: any = {id: ''};

    constructor(public navCtrl: NavController, public navParam: NavParams, public teamProvider: TeamService, public participantProvider: ParticipantService, public sharedDataProvider: SharedDataService) {
        this.loadData()
    }

    loadData() {
        this.sharedDataProvider.httpError = false;
        // Get the current event
        this.event = this.sharedDataProvider.getCurrentEvent();
        // Get the current participant
        this.participant = this.sharedDataProvider.getCurrentParticipant();

        // Get the participant
        this.participantProvider.getParticipant(this.event.id, this.participant.id).subscribe(data => {
            this.participantData = data;
            this.getTeamInfos();
        });
    }

    // Refresh the current page
    refresh(refresher: Refresher) {
        this.loadData();

        setTimeout(() => {
            refresher.complete();
        }, 1000);
    }

    // Get infos for the team
    getTeamInfos() {
        if(this.participantData.team.length > 0) {
            this.teamProvider.getTeam(this.participantData.team[0].id, this.event.id).subscribe(data => this.teamData = data);
        }
    }

    // Go the page detail tournament
    goToTournament(tournament) {
        // Add a spinner when the view is loaded
        document.getElementById('spinnerContent').style.visibility = 'visible';

        this.sharedDataProvider.setCurrentTournament(tournament);
        this.navCtrl.push(TournamentPage);
    }

    // Go to page detail team
    goToTeam(team) {
        // Add a spinner when the view is loaded
        document.getElementById('spinnerContent').style.visibility = 'visible';

        this.sharedDataProvider.setCurrentTeam(team);
        this.navCtrl.push(TeamPage);
    }

    // Go to page detail pool
    goToPool(pool_id) {
        // Add a spinner when the view is loaded
        document.getElementById('spinnerContent').style.visibility = 'visible';

        this.sharedDataProvider.setCurrentTournament(this.participantData.tournament[0]);
        this.pool.id = pool_id;
        this.sharedDataProvider.setCurrentPool(this.pool);
        this.navCtrl.push(PoolPage);
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