import {SpielerInRaum} from './player';

export interface Bingo {
  id: number;
  korrekt: boolean;
  spielerDTO: SpielerInRaum;
  timestamp: string;
}

export interface BingoEvent{
  username: string;
  timestamp: string;
  korrekt: boolean;
  bingoraumcode: string;
  runde: number;
}
