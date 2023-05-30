import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {Player} from '../../../models/player';
import {ApiStreamService} from '../../../services/api-stream.service';


@Component({
  selector: 'app-points',
  templateUrl: './points.page.html',
  styleUrls: ['./points.page.scss'],
})
export class PointsPage implements OnInit {
  public players: Player[] | [];

  constructor(private activatedRoute: ActivatedRoute,
              private apiService: ApiService,
              private sse: ApiStreamService) {}

  private pointsChanged() {
    const room = this.activatedRoute.snapshot.queryParamMap.get('room');
    const round = parseInt(this.activatedRoute.snapshot.queryParamMap.get('round'), 10);
    this.sse.getBingo(room, round).subscribe((res) => {
      this.getPlayer(null);
    });
  }

  private getPlayer(event) {
    const room = this.activatedRoute.snapshot.queryParamMap.get('room');
    return this.apiService.getAllSpieler(room)
      .subscribe((data) => {
        this.players = [ ... data.body];
        this.players.sort();
        if(event) {
          event.target.complete();
        }
      }, error => {
        console.log('getPlayer(): '+error);
        if(event) {
          event.target.complete();
        }
    });
  }

  ngOnInit() {
    this.pointsChanged();
    this.getPlayer(null);
  }

}
