export interface Ball {
  id: number;
  kugelnummer: number;
  reihenfolge: number;
}

export interface BallEvent{
  //bingoraumcode: string;
  key: string;
  kugelnummer: number;
  runde: number;
}
