export interface Gamemaster {
  id: number;
  username: number;
}

export class SpielleiterCreate{
  public username: string;
  public password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

export interface SpielleiterToken{
  token: string;
}
