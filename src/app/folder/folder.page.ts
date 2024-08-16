import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(
    public navCtrl: NavController,
    public menuController: MenuController,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.menuController.swipeGesture(false);
  }

  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.navigateRoot('categorias');
      },
        error => { }
      )
  }

  signup() {
    this.navCtrl.navigateRoot('signup')
  }

  ionViewDidEnter() {
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.navigateRoot('categorias');
      },
        error => { }
      )
  }

  // Habilita o menu ao sair da tela inicial
  ionViewWillLeave() {
    this.menuController.swipeGesture(true);
  }


}
