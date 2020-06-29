import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Tarea } from 'src/app/interfaces/tarea.interface';
import * as moment from 'moment';
import { UiService } from '../../services/ui.service';
import { SeccionChecklist } from '../../interfaces/seccionChecklist.interface';
import { ChecklistInstance } from 'src/app/interfaces/checklistInstance.interface';
import { ChecklistService } from '../../services/checklist.service';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {

  size = 'large';
  tareas: Tarea[] = [];
  // tareas2: Observable<ChecklistInstance[]>;
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
    public uiService: UiService,
    public navCtrl: NavController,
    public chkInstanceService: ChecklistService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    // console.log('will enter');
    this.getData();
  }


  getData() {
    this.secciones.forEach( sec => {
      sec.tareas = [];
    })
    this.tareas2 = [];
    console.log(this.tareas2);
    this.chkInstanceService.getInstances().subscribe( (data: any) => {
      console.log(data);
      this.tareas2 = data.data;
      //console.log(this.tareas2);
      this.dividirTareas();
    });
  }
  irAtarea(tarea, item) {
  //  console.log(item);
  //  console.log(tarea);

    if (item.name === 'Tareas Expiradas' || item.name === 'Expired Tasks') {
      this.uiService.alertaConTiempo('Tarea Expirada', 'Esta Tarea ha expirado y no es posible realizarla');
    } else if (item.name === 'Tareas Pendientes' || item.name === 'Pending Tasks') {
      this.navCtrl.navigateRoot(['/checklist', tarea._id]);
    }
  }

  dividirTareas() {
    this.tareas2.forEach(tarea => {
      console.log(tarea);
      let hoy = moment(new Date());
      let dueDateIsBefore = moment(tarea.dueDate).isBefore(hoy);
      // ['ASSIGNED', 'REVIEW-PENDING', 'REVIEWED']
      if (tarea.status === 'ASIGNADA' && dueDateIsBefore) {
        this.añadirFromNow('EXPIRADA', tarea);
        this.secciones[0].tareas.push(tarea);
      } else if (tarea.status === 'ASIGNADA' || tarea.status === 'A_REVISAR' && dueDateIsBefore === false) {
        this.añadirFromNow(tarea.status, tarea);
        if( tarea.status === 'A_REVISAR') {
          this.secciones[1].tareas.unshift(tarea);
        } else {
          this.secciones[1].tareas.push(tarea);
        }
      } else if (tarea.status === 'OK') {
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
      case 'EXPIRADA':
        let fecha = new Date(tarea.dueDate);
        tarea.fromNow = moment(fecha).format('LL');
        tarea.colorFromNow = 'danger';
        break;

      case 'ASIGNADA':
        let fechaP = new Date(tarea.dueDate);
        tarea.fromNow = moment(fechaP).fromNow();
        tarea.colorFromNow = 'tertiary';
        break;

      case 'A_REVISAR':
        tarea.fromNow = 'Pendiente Aprobación';
        tarea.colorFromNow = 'success';
        tarea.pendiente = 'pending';
        break;

      case 'OK':
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
