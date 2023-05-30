import { Injectable } from '@angular/core';
import {CanLoad, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {LoginPage} from '../modals/login/login.page';
import {ModalController} from '@ionic/angular';

@Injectable({providedIn: 'root'})
export class IsLoggedInService implements CanLoad {

  constructor(private modalController: ModalController, private authService: AuthService) {
  }

  canLoad(): boolean {
    if (!this.authService.isAuthenticated()){
      this.presentLoginModal();
    }
    return this.authService.isAuthenticated();
  }

  async presentLoginModal() {
    const modal = await this.modalController.create({
      component: LoginPage,
      swipeToClose: true
    });
    return await modal.present();
  }
}
