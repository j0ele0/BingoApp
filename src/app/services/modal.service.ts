import { Injectable } from '@angular/core';
import {LoginPage} from '../modals/login/login.page';
import {IonRouterOutlet, ModalController} from '@ionic/angular';
import {RegisterPage} from '../modals/register/register.page';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public routerOutlet: IonRouterOutlet,
              private modalController: ModalController) { }

  async presentLoginModal() {
    const modal = await this.modalController.create({
      component: LoginPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }

  async presentRegisterModal() {
    const modal = await this.modalController.create({
      component: RegisterPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    return await modal.present();
  }
}
