import {Player} from './player';
import {Round} from './round';
import {Gamemaster} from './gamemaster';

export interface Room {
  id: number;
  raum: string;
}

export interface RoomDetails {
  id: number;
  raumname: string;
  kugelnGenerieren: boolean;
  zettelProSpieler: number;
  rundenAnzahl: number;
  spielleiter: Gamemaster;
  spieler: Player[];
  runden: Round[];
}

export class RoomCreate {
  public rundenAnzahl: number;
  public zettelAnzahl: number;
  public kugelnGenerieren: boolean;

  constructor(rundenAnzahl: number, zettelAnzahl: number, kugelGenerieren: boolean) {
    this.rundenAnzahl = rundenAnzahl;
    this.zettelAnzahl = zettelAnzahl;
    this.kugelnGenerieren = kugelGenerieren;
  }
}
