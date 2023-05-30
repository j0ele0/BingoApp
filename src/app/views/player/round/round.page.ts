import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Card } from '../../../models/card';
import { Field } from '../../../models/field';
import { ApiService } from '../../../services/api.service';
import SwiperCore, {EffectCoverflow, Pagination, Scrollbar, FreeMode} from 'swiper';
import {ActivatedRoute, Router, UrlSegment} from '@angular/router';
import {AlertController, ToastController} from '@ionic/angular';
import {ApiStreamService} from '../../../services/api-stream.service';
import {Ball, BallEvent} from '../../../models/ball';


SwiperCore.use([EffectCoverflow, Pagination, Scrollbar, FreeMode]);

@Component({
  selector: 'app-round',
  templateUrl: 'round.page.html',
  styleUrls: ['round.page.scss'],
})
export class RoundPage implements OnInit {

  public cards: Card[] = [];
  public round: number;
  public balls: Ball[] = [];
  public isNextRoundReady: boolean;
  public isGameOver: boolean;
  public swipeIndex: number;
  private userid: number;
  private roomName: string;

  constructor(private api: ApiService,
              private sse: ApiStreamService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public toastController: ToastController,
              public alertController: AlertController) {}

  ngOnInit() {
    this.sse.closeEventSources();
    this.cards = [];
    this.balls = [];
    this.isNextRoundReady = false;
    this.swipeIndex = 0;
    this.userid = parseInt(this.activatedRoute.snapshot.queryParamMap.get('userid'), 10);
    this.round = parseInt(this.activatedRoute.snapshot.queryParamMap.get('round'), 10);
    this.roomName = this.activatedRoute.snapshot.queryParamMap.get('room');
    this.loadCards();
    this.getAllBalls();

    this.getBalls();

    this.setupNextRoundAction();
  }

  public setupNextRoundAction() {
    console.log('Checking...');
    this.api.getRunde(this.roomName, this.round+1).subscribe((res) => {
      console.log('nextRound');
      this.nextRound();
    }, error => {
      console.log('lastRound');
      this.gameOver();
    });
  }

  public async confirmBingo(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Bitte Bestätige',
      message: 'Bingo für Zettel#'+(this.swipeIndex+1)+' abgeben?',
      buttons: [
        {
          text: 'Stop',
          role: 'cancel',
          cssClass: 'dismissBingo',
          id: 'cancel-button',
          handler: () => {
            return false;
          }
        }, {
          text: 'Okay',
          id: 'confirm-button',
          cssClass: 'confirmBingo',
          handler: () => {
            this.api.bingoEinreichen(this.cards[this.swipeIndex].id).subscribe((data)=>{});
          }
        }
      ]
    });
    await alert.present();
  }

  public getBalls(){
    this.sse.getBalls(this.roomName, this.round).subscribe((data) => {
      console.log(data.data);
      if(this.balls.unshift(JSON.parse(data.data)) > 4) {
      }
    });
  }

  public getAllBalls() {
    this.api.getKugeln(this.roomName, this.round).subscribe((data) => {
      this.balls = data.body.reverse();
    });
  }

  public goToNextRound() {
    this.round++;
    this.router.navigate(['/bingoApp', this.roomName, 'round', this.round, 'userid', this.userid],
      {queryParams: {room: this.roomName, round: this.round, userid: this.userid}});
    this.ngOnInit();
  }

  public nextRound() {
    this.sse.getRound(this.roomName, this.round+1).subscribe((data) => {
      this.isNextRoundReady = true;
    });
  }

  public gameOver() {
    this.sse.getBingo(this.roomName, this.round).subscribe((data) => {
      console.log('new Bingo');

      console.log(JSON.parse(data.data).korrekt);
      if(JSON.parse(data.data).korrekt) {
        console.log('=>its korrekt!');
        this.isGameOver = true;
      }
    }, error => {
      console.log('ERROR: new Bingo');
    });
  }

  public goToEndscreen() {
    this.sse.closeEventSources();
    this.router.navigate(['/bingoApp', this.roomName, 'round', this.round, 'userid', this.userid, 'points'],
      {queryParams: {room: this.roomName, round: this.round, userid: this.userid}});
  }

  public async newRoundPopUp() {
    const toast = await this.toastController.create({
      //header: 'Toast header',
      message: 'Click to Close',
      //icon: 'information-circle',
      position: 'middle',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  public loadCards() {
    this.cards = [];
    this.api.getAllZettelZuRunde(this.userid,this.round).subscribe((data)  => {
      this.cards = [ ... data.body];
    });
  }

  public markField(cardNr: number, fieldNr: number) {
    //console.log('id: '+cardNr+'_'+fieldNr);
    const elem = document.getElementById(cardNr+'_'+fieldNr);
    this.api.feldToggeln(this.cards[cardNr].id, fieldNr).subscribe((data) => {});

    this.cards[cardNr].felder[fieldNr].markiert = !this.cards[cardNr].felder[fieldNr].markiert;
  }

  public getRow(card: Card, rowIndex: number) {
    const rowFields: Field[] = [];
    for(let i=0; i<5;i++) {
      rowFields.push(card.felder[5*rowIndex+i]);
    }
    return rowFields;
  }

}
