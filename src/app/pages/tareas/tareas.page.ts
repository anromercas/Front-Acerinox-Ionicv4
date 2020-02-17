import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TareaService } from '../../services/tarea.service';
import { Tarea } from 'src/app/interfaces/tarea.interface';
import * as moment from 'moment';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {

  size = 'large';
  tareas: Tarea[] = [];
  tareasExpiradas: Tarea[] = [];
  tareaDeHoy = '';

  constructor(private router: Router,
              public usuarioService: UsuarioService,
              public tareaService: TareaService) { }

  ngOnInit() {
    this.tareaService.obtenerTareasDeUsuario().subscribe( (resp: any) => {
      console.log(resp);
      this.tareas = resp.tareas;
      this.añadirFromNow();
    });
  }

  añadirFromNow() {
    this.tareas.forEach( (tarea, index) => {
      tarea.fromNow = moment(tarea.fechaFin).fromNow();
      if( tarea.fromNow === 'in a day') {
        tarea.tareaDeHoy = 'verdepastel';
      }
      if ( tarea.expirado === true ) {
        const exp = this.tareas.splice(index, 1);
        console.log(exp);
        this.tareasExpiradas.push(exp[0]);
      }
    });
    console.log(this.tareas);
  }

  cerrar_sesion() {
    this.usuarioService.logout();
  }

  ir(page: string) {

    this.router.navigate([`/${page}`]);
  }

}
