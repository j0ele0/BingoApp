import {Injectable} from '@angular/core';
import {SpielleiterCreate} from '../models/gamemaster';
import {ApiService} from './api.service';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {
  private accessToken = '';
  private username: string;

  constructor(private apiService: ApiService) {
  }

  public register(spielleiter: SpielleiterCreate, onSuccess: () => any, onFail: () => any){
    this.apiService.register(spielleiter)
      .subscribe((data) => {
        if (data.status === 200){
          this.accessToken = data.body.token;
          this.username = spielleiter.username;
          onSuccess();
        }
      }, error => {
        onFail();
      });
  }

  public login(spielleiter: SpielleiterCreate, onSuccess: () => any, onFail: () => any){
    this.apiService.login(spielleiter)
      .subscribe((data) => {
        if (data.status === 200){
          this.accessToken = data.body.token;
          this.username = spielleiter.username;
          onSuccess();
        }
      }, error => {
        onFail();
      });
  }

  public getAccessToken() {
    return this.accessToken;
  }

  public getUsername(){
    return this.username;
  }

  public isAuthenticated(): boolean{
    return this.accessToken !== '';
  }
}
