import { Component, OnInit } from '@angular/core';
import { Formulario } from 'src/app/interfaces/formulario.interface';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { INCIDENCIAS } from '../../data/data.incidencias';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.page.html',
  styleUrls: ['./formularios.page.scss'],
})
export class FormulariosPage implements OnInit {

  forms: any[] = [];

  constructor(private router: Router,
              public usuarioService: UsuarioService, ) { }

  ngOnInit() {
    this.forms = INCIDENCIAS;
  }

  ir( pagina: string ) {
    this.router.navigate([`/${pagina}`]);
  }

  cerrar_sesion() {
    this.usuarioService.logout();
  }

}
