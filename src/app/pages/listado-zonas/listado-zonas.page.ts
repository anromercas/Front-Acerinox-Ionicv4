import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { ZONAACERIA } from 'src/app/data/data.zona-aceria';
import { ZONALF } from 'src/app/data/data.zona-lf'
import { ZONALC } from './../../data/data.zona-lc';
import { Router, NavigationExtras } from '@angular/router';
import { Zona } from 'src/app/interfaces/zona.interface';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-listado-zonas',
  templateUrl: './listado-zonas.page.html',
  styleUrls: ['./listado-zonas.page.scss'],
})
export class ListadoZonasPage implements OnInit {

  zonaAceria: Zona[] = [];
  zonaLC: Zona[] = [];
  zonaLF: Zona[] = [];
  orientation: string;
  admin = false;

  constructor(private router: Router,
              public navCtrl: NavController,
              public usuarioService: UsuarioService
  ) {
    this.zonaAceria = ZONAACERIA.slice(0);
    this.zonaLC = ZONALC.slice(0);
    this.zonaLF = ZONALF.slice(0);
  }

  ngOnInit() {
  //  this.usuarioService.loginOtp('david@mail.com', '1234', '623972');
  }

  async ionViewDidEnter() {
    await this.usuarioService.cargarStorage();
    console.log(this.usuarioService.role);
    if (this.usuarioService.role === 'ADMIN_ROLE') {
      this.admin = true;
    } else {
      this.admin = false;
    }
  }
  irZona( zona: Zona ) {

    const navigationExtras: NavigationExtras = {
      queryParams: {
        zona
      }
    };

    this.router.navigate(['/zona'], navigationExtras);
  }

  cerrar_sesion() {
    this.usuarioService.logout();
  }

  nueva_basura() {
    this.router.navigate(['/nueva-basura']);
  }

}
