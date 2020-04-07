import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { TareaService } from '../../services/tarea.service';
import { Tarea } from 'src/app/interfaces/tarea.interface';
import * as moment from 'moment';
import { TAREASEXP } from '../../data/data.tareas-expiradas';
import { TAREASREALIZ } from '../../data/data.tareas-realizadas';
import { TAREASPEN } from '../../data/data.tareas-pendientes';
import { UiService } from '../../services/ui.service';
import { ignoreElements } from 'rxjs/operators';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {

  size = 'large';
  tareas: Tarea[] = [];
  tareas2: any[] = [];
  tareasExpiradas: any[] = [];
  tareasRealizadas: any[] = [];
  tareasPendientes: any[] = [];
  tareaDeHoy = '';
  secciones: any[] = [
    {
      name: 'Expired Tasks',
      name2: 'Tareas Expiradas',
      expanded: true,
      tareas: [],
      color: 'separador-rojo'
    },
    {
      name: 'Pending Tasks',
      name2: 'Tareas Pendientes',
      expanded: true,
      tareas: [],
      color: 'separador-verde'
    },
    {
      name: 'Verified Tasks',
      name2: 'Tareas Aprobadas',
      expanded: false,
      tareas: [],
      color: 'separador-azul'
    }
  ];

  constructor(private router: Router,
              public usuarioService: UsuarioService,
              public tareaService: TareaService,
              public uiService: UiService) { }

  ngOnInit() {

    this.tareasExpiradas = TAREASEXP;
    this.tareasPendientes = TAREASPEN;
    this.tareasRealizadas = TAREASREALIZ;

    this.añadirFromNow();


    /* this.dividirTareas(); */
    this.secciones.forEach( seccion => {
      if ( seccion.name === 'Tareas Expiradas' || seccion.name === 'Expired Tasks' ) {
        seccion.tareas = this.tareasExpiradas;
      } else if ( seccion.name === 'Tareas Pendientes' || seccion.name === 'Pending Tasks' ) {
        seccion.tareas = this.tareasPendientes;
        /* let arr = seccion.tareas;
        arr.forEach( t => {
          if ( t.estado === 'ASIGNADA' ) {
            t.color = 'light';
          }
        }); */
      } else if ( seccion.name === 'Tareas Aprobadas' || seccion.name === 'Verified Tasks') {
        seccion.tareas = this.tareasRealizadas;
      }
    });


    console.log(this.secciones);

    /* this.tareaService.obtenerTareasDeUsuario().subscribe( (resp: any) => {
      console.log(resp);
      this.tareas = resp.tareas;
      this.añadirFromNow();
    }); */
  }

  irAtarea( tarea, item ) {
    console.log(item);

    if(item.name === 'Tareas Expiradas' || item.name === 'Expired Tasks') {
      this.uiService.alertaConTiempo('Tarea Expirada', 'Esta Tarea ha expirado y no es posible realizarla');
    } else {
      this.router.navigate([`/checklist`]);
    }
  }

  /* dividirTareas() {
    this.secciones.forEach( seccion => {
      this.tareas2.forEach( tarea => {
        if ( tarea.expirada && seccion.name === 'Tareas Expiradas' ) {
          console.log(tarea);
          tarea.color = 'danger';
          seccion.tareas.push(tarea);
        } else if ( tarea.pendienteAprobacion && seccion.name === 'Tareas Pendientes'  ) {
          seccion.tareas.push(tarea);
          tarea.color = 'light';
        } else if ( tarea.estado === 'REALIZADA' && seccion.name === 'Tareas Realizadas') {
          seccion.tareas.push(tarea);
        }
      });
      // seccion.tareas = this.tareas2;
    });
  } */

  expandItem(item): void {

    if (item.name === 'Tareas Aprobadas' || item.name === 'Verified Tasks' ) {

      if (item.expanded) {
        item.expanded = false;
      } else {
        item.expanded = true;
      }
    }
      /* else {
      this.secciones.map(listItem => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    } */
  }

  añadirFromNow() {
    this.tareasPendientes.forEach( (tarea, index) => {
      let fecha = new Date(tarea.fechaFin);
      tarea.fromNow = moment(fecha).fromNow();
      if ( tarea.estado === 'PENDIENTE APROBACION') {
        /* tarea.fromNow = 'Pendiente Aprovación'; */
        // tarea.fromNow = 'Pending Aproval'
        tarea.fromNow = ''
        tarea.colorFromNow = 'success';
      }
      if (tarea.fromNow.includes('hours') || tarea.fromNow.includes('minutes')) {
        tarea.fromNow = 'Today';
        tarea.colorFromNow = 'success';
      }

      if ( tarea.id === 4 ) {
        tarea.fromNow = 'Until 18 March';
        tarea.colorFromNow = 'success';
      }

      if ( tarea.id === 6 ) {
        tarea.fromNow = '12:30';
        tarea.colorFromNow = 'success';
      }

      if (tarea.id === 1) {
        tarea.fromNow = '9:00';
        tarea.colorFromNow = 'success';
      }

      /* if ( tarea.fromNow === 'in a day') {
        tarea.colorFromNow = 'success';
      } */
      /* if ( tarea.expirado === true ) {
        const exp = this.tareas2.splice(index, 1);
        console.log(exp);
        this.tareasExpiradas.push(exp[0]);
      } */
    });

    this.tareasExpiradas.forEach( exp => {
      let fecha = new Date(exp.fechaFin);
      exp.fromNow = moment(fecha).fromNow();
      exp.colorFromNow = 'danger';
    });

    this.tareasRealizadas.forEach( real => {
      let fecha = new Date(real.fechaRealizada);
      real.fromNow = moment(fecha).format('LL');
      real.colorFromNow = 'success';
    });
  }

  cerrar_sesion() {
    this.usuarioService.logout();
  }

  ir(page: string) {

    this.router.navigate([`/${page}`]);
  }

}
