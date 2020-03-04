import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Home2Page } from './home2.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tareas'
  },
  {
    path: '',
    component: Home2Page,
    children: [
      {
        path: 'tareas',
        loadChildren: '../tareas/tareas.module#TareasPageModule'
      },
      {
        path: 'formularios',
        loadChildren: '../formularios/formularios.module#FormulariosPageModule'
      },
      {
        path: 'listado-zonas',
        loadChildren: '../listado-zonas/listado-zonas.module#ListadoZonasPageModule'
      }

    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [Home2Page]
})
export class Home2PageModule {}
