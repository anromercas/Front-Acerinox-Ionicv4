import { UiService } from './../../services/ui.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonSlides } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario.interface';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal', {static: true}) slides: IonSlides;


  loginUser = {
    email: 'axel@mail.com',
    password: '1234'
  };

  registerUser: Usuario = {
    email: '',
    password: '',
    nombre: '',
    avatar: 'av-1.png',
  };

  constructor(public navCtrl: NavController,
              public usuarioService: UsuarioService,
              public uiService: UiService  ) { }

  ngOnInit() {

    this.slides.lockSwipes(true);
  }

  async login( fLogin: NgForm ) {

    if ( fLogin.invalid ) {
      console.log('formulario invalido');
      return;
    }
    const valido = await this.usuarioService.login( this.loginUser.email, this.loginUser.password );

    if (valido) {
      // navegar al HomePage
      this.navCtrl.navigateRoot('home2', { animated: true } );
    } else {
      // mostrar alerta de usuario y contraseña no correctas
      this.uiService.alertaInformativa('Error en el Login', 'Usuario o contraseña incorrectos');
    }

  }


  async registro( fRegistro: NgForm ) {

    if ( fRegistro.invalid ) {
      this.uiService.mostrar_toast('Campos Inválidos');
      return;
    }

    const valido = await this.usuarioService.registro( this.registerUser );
    if ( valido ) {
      // navegar al login
    //  this.navCtrl.navigateRoot( '/login', { animated: true } );
      console.log('Usuario creado');
      this.uiService.alertaConTiempo('Usuario Registrado con Éxito. ', '2000');

    } else {
      // mostrar alerta de usuario y pass no correctos
      this.uiService.alertaConTiempo('Usuario incorrecto', '2000');
    }

  }

  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }

}
