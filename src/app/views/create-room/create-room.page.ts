import { Component, OnInit } from '@angular/core';
import {RoomCreate, RoomDetails} from '../../models/room';
import {NgForm} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {IsLoggedInService} from '../../services/is-logged-in.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.page.html',
  styleUrls: ['./create-room.page.scss'],
})
export class CreateRoomPage implements OnInit {
  public roomCreate: RoomCreate = new RoomCreate(1,1,false);

  constructor(private apiService: ApiService,
              private router: Router) { }

  public createRoom(f: NgForm) {
    this.apiService.addBingoraum(this.roomCreate)
      .subscribe((data: HttpResponse<RoomDetails>) => {
        if (data.status === 201){
          this.router.navigate(['gameMaster/' + data.body.raumname + '/round/1']);
        }
      });
  }

  ngOnInit() {
  }
}
