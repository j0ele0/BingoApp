import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from "../../../services/api.service";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.page.html',
  styleUrls: ['./navbar.page.scss'],
})
export class NavbarPage implements OnInit {

  public param: string;

  constructor(public activatedRoute: ActivatedRoute,
              private api: ApiService,
              private router: Router,
              public alertController: AlertController) { }

  ngOnInit() {
    const room = this.activatedRoute.snapshot.queryParamMap.get('room');
    const round = this.activatedRoute.snapshot.queryParamMap.get('round');
    const userid = this.activatedRoute.snapshot.queryParamMap.get('userid');
    this.param = '?room='+room+'&round='+round+'&userid='+userid;
  }

  buildParameter(room: string, round: number, userid: number) {
    this.param = '?room='+room+'&round='+round+'&userid='+userid;
  }

  nextRound(fdg) {
    console.log('NAVBAR');
    const room = this.activatedRoute.snapshot.queryParamMap.get('room');
    let round = parseInt(this.activatedRoute.snapshot.queryParamMap.get('round'),10);
    const userid = parseInt(this.activatedRoute.snapshot.queryParamMap.get('userid'),10);
    round++;
    this.buildParameter(room,round,userid);
  }

  private async confirmLogout(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Bitte Bestätige',
      message: 'Willst du den Raum wirklich verlassen?',
      buttons: [
        {
          text: 'Nein',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: () => {
            return false;
          }
        }, {
          text: 'Ja',
          id: 'confirm-button',
          handler: () => {
            this.router.navigateByUrl('/');
          }
        }
      ]
    });
    await alert.present();
  }

}
