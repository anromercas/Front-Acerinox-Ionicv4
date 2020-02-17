import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  size = 'large';

  constructor( private router: Router,
               public usuarioService: UsuarioService,
               private platform: Platform, ) {
                /* console.log('Width: ' + platform.width());
                console.log('Height: ' + platform.height()); */
                const width = platform.width();
                if(width < 720){
                  this.size = 'default';
                }

  }

  ngOnInit() {

  }

  ir(page: string) {

    this.router.navigate([`/${page}`]);

    /* switch (page) {
      case 'auditoria':
        this.router.navigate(['/listado-zonas']);
        break;
      case 'notificar':
        this.router.navigate(['/']);
        break;
      case 'observaciones':
        this.router.navigate(['/']);
        break;
      case 'perfil':
        this.router.navigate(['/perfil'])
    } */

  }


  cerrar_sesion() {
    this.usuarioService.logout();
  }
}
