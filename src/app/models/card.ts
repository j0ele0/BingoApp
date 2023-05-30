import {Field} from './field';
import {Player} from './player';
import {Round} from './round';

export interface Card {
  id: number;
  runde: Round;
  spieler: Player;
  felder: Field[];
}
