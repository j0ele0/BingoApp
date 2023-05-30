import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ApiService} from '../../../services/api.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {SpielerCreate} from '../../../models/player';

@Component({
  selector: 'app-enter-name',
  templateUrl: './enter-name.page.html',
  styleUrls: ['./enter-name.page.scss'],
})
export class EnterNamePage implements OnInit {

  showInfo: boolean;
  roomName: string;

  constructor(private apiService: ApiService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.showInfo = false;
  }

  private enterNickname(f: NgForm){
    const bingoroomcode = this.activatedRoute.snapshot.paramMap.get('bingoroomcode');
    const round = this.activatedRoute.snapshot.paramMap.get('round');
    this.apiService.addSpieler(bingoroomcode, new SpielerCreate(f.value.nickname))
      .subscribe((data) => {
        if (data.status === 201){
          this.router.navigate(['bingoApp', bingoroomcode, 'round', round, 'userid', data.body.id],
                                  { queryParams: {room: bingoroomcode, round: round, userid: data.body.id}});
          this.showInfo = false;
        }
      },error => {
        this.showInfo = true;
      });
  }

  private back() {
    this.router.navigateByUrl('/');
  }

  ngOnInit() {
    this.roomName = this.activatedRoute.snapshot.paramMap.get('bingoroomcode');
  }

}
