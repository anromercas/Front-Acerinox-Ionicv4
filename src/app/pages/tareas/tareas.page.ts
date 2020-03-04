import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TareaService } from '../../services/tarea.service';
import { Tarea } from 'src/app/interfaces/tarea.interface';
import * as moment from 'moment';
import { TAREAS } from '../../data/data.tareas';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {

  size = 'large';
  tareas: Tarea[] = [];
  tareas2: any[] = [];
  tareasExpiradas: Tarea[] = [];
  tareaDeHoy = '';
  secciones: any[] = [
    {
      name: 'Tareas Expiradas',
      open: false
    },
    {
      name: 'Tareas Pendientes',
      open: false
    },
    {
      name: 'Tareas Realizadas',
      open: false
    }
  ];

  constructor(private router: Router,
              public usuarioService: UsuarioService,
              public tareaService: TareaService) { }

  ngOnInit() {

    this.tareas2 = TAREAS;


    this.tareaService.obtenerTareasDeUsuario().subscribe( (resp: any) => {
      console.log(resp);
      this.tareas = resp.tareas;
      this.añadirFromNow();
    });
  }

  toggleSection(i) {
    this.secciones[i].open = !this.secciones[i].open;
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
