import {Room} from './room';

export interface Player {
  id: number;
  username: string;
  raum: Room;
  punktestand: number;
}

export interface SpielerInRaum {
  id: number;
  username: string;
  punktestand: number;
}

export class SpielerCreate{
  public username: string;

  constructor(username: string) {
    this.username = username;
  }
}

export interface PlayerEvent{
  id: number;
  username: string;
  punktestand: number;
}
