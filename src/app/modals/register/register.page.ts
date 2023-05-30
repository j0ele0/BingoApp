import {Component, OnInit, ViewChild} from '@angular/core';
import {SpielleiterCreate} from '../../models/gamemaster';
import {AuthService} from '../../services/auth.service';
import {LoginPage} from '../login/login.page';
import {IonButton, ModalController} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @ViewChild('registerBtn') registerBtn: IonButton;
  public registerFail = false;
  public registerData: SpielleiterCreate = new SpielleiterCreate('','');

  constructor(private authService: AuthService,
              private modalController: ModalController) { }

  public register(){
    this.registerBtn.disabled = true;
    this.authService.register(this.registerData, () => {
      this.dismiss();
      this.registerBtn.disabled = false;
    }, () => {
      this.registerFail = true;
    });
  }

  public toLogin(){
    this.presentLoginModal();
    this.dismiss();
  }

  async presentLoginModal() {
    const modal = await this.modalController.create({
      component: LoginPage,
      swipeToClose: true
    });
    return await modal.present();
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  ngOnInit() {
  }
}
