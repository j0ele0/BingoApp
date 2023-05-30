import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {Ball} from '../../../models/ball';
import {Bingo} from '../../../models/bingo';
import {Player} from '../../../models/player';
import {RoomDetails} from '../../../models/room';
import {SwiperComponent} from 'swiper/angular';
import {SwiperOptions} from 'swiper';
import {ApiStreamService} from '../../../services/api-stream.service';
import {IonButton} from '@ionic/angular';

@Component({
  selector: 'app-round',
  templateUrl: './round.page.html',
  styleUrls: ['./round.page.scss'],
})
export class RoundPage implements OnInit {
  @ViewChild('nextRoundBtn') nextRoundBtn: IonButton;
  @ViewChild('addBallGenBtn') addBallGenBtn: IonButton;
  @ViewChild('swiper') swiper: SwiperComponent;
  public swiperConfig: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 10
  };

  public balls: Ball[] = [];
  public bingos: Bingo[] = [];
  public players: Player[] = [];
  public room: RoomDetails;
  public round = 0;

  public addableBalls = new Set<number>();

  constructor(private activatedRoute: ActivatedRoute,
              private apiService: ApiService,
              private router: Router,
              private apiStreamService: ApiStreamService) { }

  ngOnInit(){
    this.round = parseInt(this.activatedRoute.snapshot.paramMap.get('round'), 10);
    this.getRoomData();
  }

  public nextRound(){
    this.nextRoundBtn.disabled = true;
    this.apiService.startRunde(this.room.raumname, this.round + 1)
      .subscribe( (data) => {
        if (data.ok){
          this.apiStreamService.closeEventSources();
          this.router.navigate(['gameMaster/'+ this.room.raumname + '/round/' + (this.round  + 1)]);
        }
        this.nextRoundBtn.disabled = false;
      });
  }

  public getAllBalls(){
    if(this.room !== undefined) {
      this.apiService.getKugeln(this.room.raumname, this.round)
        .subscribe((data) => {
          this.balls = [...data.body];
          this.initAddableBalls();
          this.updateSwiper();
        });
    }
  }

  public getBingos(event){
    if(this.room !== undefined && this.round !== 0) {
      this.apiService.getBingos(this.room.raumname, this.round)
        .subscribe((data) => {
          this.bingos = [...data.body];
          if (event){
            event.target.complete();
          }
        });
    }
  }

  public getNewBingo(){
    if(this.room !== undefined && this.round !== 0){
      this.apiStreamService.getBingo(this.room.raumname, this.round)
        .subscribe( async data => {
          await this.timeOutFor(50);
          this.getBingos(null);
          this.getPlayer();
        }, error => {
          console.log(error);
        });
    }
  }

  public getPlayer(){
    if(this.room !== undefined){
      this.apiService.getAllSpieler(this.room.raumname)
        .subscribe((data) => {
          this.players = [ ... data.body];
        });
    }
  }

  public getNewPlayer(){
    if(this.room !== undefined) {
      this.apiStreamService.getPlayer(this.room.raumname)
        .subscribe( async data => {
          await this.timeOutFor(50);
          this.getPlayer();
        }, error => {
          console.log('points: '+error);
        });
    }
  }

  public loadNewBall(){
    if(this.room !== undefined) {
      this.apiService.getKugeln(this.room.raumname, this.round)
        .subscribe((data) => {
          const tmp: Ball[] = [...data.body];
          const topBall: Ball = tmp.pop();
          this.balls.push(topBall);
          this.addableBalls.delete(topBall.kugelnummer);
          this.updateSwiper();
        });
    }
  }

  public addBallGen(): void {
    this.addBallGenBtn.disabled = true;
    if(this.room !== undefined && this.round !== 0) {
      this.apiService.addGenKugel(this.room.raumname, this.round)
        .subscribe((data) => {
          this.loadNewBall();
          this.addBallGenBtn.disabled = false;
        });
    }
  }

  public addBallMan(ballNumber: number): void {
    if(this.room !== undefined && this.round !== 0) {
      this.apiService.addManKugel(this.room.raumname, this.round, ballNumber)
        .subscribe((data) => this.loadNewBall());
    }
  }

  public startNextRound(): void{
    if(this.room !== undefined && this.round !== 0) {
      this.apiService.startRunde(this.room.raumname, this.round +1)
        .subscribe((data) => {
          if (data.ok) {
            this.router.navigate(['gameMaster/' + this.room.raumname + '/round/' + this.round +1]);
          }
        });
    }
  }

  public getRoomData(){
    const bingoroomcode = this.activatedRoute.snapshot.paramMap.get('bingoroomcode');
    this.apiService.getBingoraum(bingoroomcode)
      .subscribe((data) => {
        this.room = {...data.body};
        this.getAllBalls();
        this.getPlayer();
        this.getBingos(null);
        this.getNewPlayer();
        this.getNewBingo();
      });
  }

  public deletePlayer(playerId: number, index: number){
    this.apiService.deleteSpieler(playerId)
      .subscribe((data) => {
        if (data.ok){
          this.players.splice(index,1);
          this.getBingos(null);
        }
      });
  }

  public anyCorrectBingo(): boolean{
    for(const bingo of this.bingos){
      if (bingo.korrekt){
        return true;
      }
    }
    return false;
  }

  // Quelle: https://stackoverflow.com/questions/16767301/calculate-difference-between-2-timestamps-using-javascript
  timeDifference(timestamp: string): string{
    let difference = new Date().getTime() - new Date(timestamp).getTime();

    const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= daysDifference*1000*60*60*24;
    const hoursDifference = Math.floor(difference / 1000 / 60 / 60);
    difference -= hoursDifference*1000*60*60;
    const minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference*1000*60;
    const secondsDifference = Math.floor(difference / 1000);

    if(daysDifference > 1){
      return 'vor ' + daysDifference + 'Tage ' + (hoursDifference) + 'std';
    } else if (hoursDifference > 1){
      return 'vor ' + hoursDifference + 'std ' + (minutesDifference) + 'min';
    } else if (minutesDifference > 1){
      return 'vor ' + minutesDifference + 'min ' + (secondsDifference) + 'sec';
    } else {
      return 'vor ' + secondsDifference + 'sec';
    }
  }

  public back() {
    this.apiStreamService.closeEventSources();
    this.router.navigateByUrl('/tabs/profile');
  }

  private async updateSwiper(){
    await this.timeOutFor(50);
    this.swiper.swiperRef.slideTo(0);
  }

  private async timeOutFor(ms: number){
    await new Promise(f => setTimeout(f, ms));
  }

  private initAddableBalls(){
    this.addableBalls = new Set<number>();
    for(let i = 1; i <= 75; i++){
      if (!this.balls.find((value) => value.kugelnummer === i)){
        this.addableBalls.add(i);
      }
    }
  }


}
