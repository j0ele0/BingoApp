import {Component, OnInit, ViewChild} from '@angular/core';
import {SpielleiterCreate} from '../../models/gamemaster';
import {AuthService} from '../../services/auth.service';
import {IonButton, IonItem, ModalController} from '@ionic/angular';
import {RegisterPage} from '../register/register.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('LoginBtn') loginBtn: IonButton;
  public loginFail = false;
  public loginData: SpielleiterCreate = new SpielleiterCreate('','');

  constructor(private authService: AuthService,
              private modalController: ModalController) { }

  public login(){
    this.loginBtn.disabled = true;
    this.authService.login(this.loginData, () => {
      this.dismiss();
      this.loginBtn.disabled = false;
    }, () => {
      this.loginFail = true;
    });
  }

  public toRegister(){
    this.presentRegisterModal();
    this.dismiss();
  }

  async presentRegisterModal() {
    const modal = await this.modalController.create({
      component: RegisterPage,
      swipeToClose: true
    });
    return await modal.present();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }

  ngOnInit() {
  }

}
