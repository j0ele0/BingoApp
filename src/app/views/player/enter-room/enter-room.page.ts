import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ApiService} from '../../../services/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-enter-room',
  templateUrl: './enter-room.page.html',
  styleUrls: ['./enter-room.page.scss'],
})
export class EnterRoomPage implements OnInit {
  showInfo: boolean;

  constructor(private apiService: ApiService, private router: Router) { }

  enterRaum(f: NgForm){
    this.apiService.getBingoraum(f.value.bingoroomcode)
      .subscribe((data) => {
        if (data.status === 200){
          this.showInfo = false;
          let rounds = data.body.runden;
          let activRound = 1;
          for(let i=1; i<rounds.length; i++) {
            if(!rounds[i].freigegeben) {break;}
            activRound++;
          }
          this.router.navigate(['tabs','enter-room', f.value.bingoroomcode, 'round', activRound]);
        }
      }, error => {
        this.showInfo = true;
      });
  }

  ngOnInit() {
    this.showInfo = false;
  }

}

