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
import { SeccionChecklist } from '../../interfaces/seccionChecklist.interface';
import { ChecklistInstance } from 'src/app/interfaces/checklistInstance.interface';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {

  size = 'large';
  tareas: Tarea[] = [];
  tareas2: ChecklistInstance[] = [];
  tareasExpiradas: any[] = [];
  tareasRealizadas: any[] = [];
  tareasPendientes: any[] = [];
  tareaDeHoy = '';
  secciones: SeccionChecklist[] = [
    {
      name: 'Expired Tasks',
      nameEs: 'Tareas Expiradas',
      expanded: true,
      tareas: [],
      color: 'separador-rojo'
    },
    {
      name: 'Pending Tasks',
      nameEs: 'Tareas Pendientes',
      expanded: true,
      tareas: [],
      color: 'separador-verde'
    },
    {
      name: 'Verified Tasks',
      nameEs: 'Tareas Aprobadas',
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

    this.tareas2 = this.tareaService.getCheklistInstances();
    // console.log(this.tareas2);

    this.dividirTareas();
  }

  irAtarea(tarea, item) {
  //  console.log(item);
  //  console.log(tarea);

    if (item.name === 'Tareas Expiradas' || item.name === 'Expired Tasks') {
      this.uiService.alertaConTiempo('Tarea Expirada', 'Esta Tarea ha expirado y no es posible realizarla');
    } else if (item.name === 'Tareas Pendientes' || item.name === 'Pending Tasks') {
      this.router.navigate(['/checklist', tarea._id]);
    }
  }

  dividirTareas() {
    this.tareas2.forEach(tarea => {
      let hoy = moment(new Date());
      let dueDateIsBefore = moment(tarea.dueDate).isBefore(hoy);
      // ['ASSIGNED', 'REVIEW-PENDING', 'REVIEWED']
      if (tarea.status === 'ASSIGNED' && dueDateIsBefore) {
        this.añadirFromNow('EXPIRED', tarea);
        this.secciones[0].tareas.push(tarea);
      } else if (tarea.status === 'ASSIGNED' || tarea.status === 'REVIEW-PENDING' && dueDateIsBefore === false) {
        this.añadirFromNow(tarea.status, tarea);
        if( tarea.status === 'REVIEW-PENDING') {
          this.secciones[1].tareas.unshift(tarea);
        } else {
          this.secciones[1].tareas.push(tarea);
        }
      } else if (tarea.status === 'REVIEWED') {
        this.añadirFromNow(tarea.status, tarea);
        this.secciones[2].tareas.push(tarea);
      }
    });
  }

  expandItem(item): void {

    if (item.name === 'Tareas Aprobadas' || item.name === 'Verified Tasks') {

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

  añadirFromNow(tipo: string, tarea: any) {
    // ['ASSIGNED', 'REVIEW-PENDING', 'REVIEWED']
    switch (tipo) {
      case 'EXPIRED':
        let fecha = new Date(tarea.dueDate);
        tarea.fromNow = moment(fecha).format('LL');
        tarea.colorFromNow = 'danger';
        break;

      case 'ASSIGNED':
        let fechaP = new Date(tarea.dueDate);
        tarea.fromNow = moment(fechaP).fromNow();
        tarea.colorFromNow = 'tertiary';
        break;

      case 'REVIEW-PENDING':
        tarea.fromNow = 'Pendiente Aprobación';
        tarea.colorFromNow = 'success';
        tarea.pendiente = 'pending';
        break;

      case 'REVIEWED':
        tarea.fromNow = '';
        tarea.colorFromNow = 'success';
        break;
    }

  }

  cerrar_sesion() {
    this.usuarioService.logout();
  }

  ir(page: string) {

    this.router.navigate([`/${page}`]);
  }

}
