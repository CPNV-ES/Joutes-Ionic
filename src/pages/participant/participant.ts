import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ParticipantPage Page');
  }

}
