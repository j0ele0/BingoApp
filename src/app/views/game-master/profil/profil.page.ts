import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {RoomDetails} from '../../../models/room';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {IsLoggedInService} from '../../../services/is-logged-in.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  public rooms: RoomDetails[] | [];

  constructor(private apiService: ApiService,
              private router: Router,
              public authService: AuthService) { }

  public getAllRooms(){
    this.apiService.getAllRoomsToGameMaster()
      .subscribe((data) => {
        if (data.status === 200){
          this.rooms = [ ...data.body];
        } else if (data.status === 204) {
          this.rooms = [];
        }
      });
  }

  public deleteRoom(bingoraumcode: string, index: number){
    this.apiService.deleteBingoraum(bingoraumcode)
      .subscribe((data) => {
        if (data.status === 200){
          this.rooms.splice(index,1);
        } else if (data.status === 204) {
          console.log('Room not deleted');
        }
      });
  }

  public enterRoom(room: RoomDetails){
    this.router.navigate(['gameMaster/' + room.raumname + '/round/' + this.getCurrentRound(room)]);
  }

  public getCurrentRound(room: RoomDetails): number{
    for(const round of room.runden){
      if(!round.freigegeben){
        return round.rundennummer -1;
      }
    }
    return room.runden.length;
  }

  public toCreateRoom(){
    this.router.navigate(['tabs/create']);
  }

  ngOnInit() {
    this.getAllRooms();
  }
}
