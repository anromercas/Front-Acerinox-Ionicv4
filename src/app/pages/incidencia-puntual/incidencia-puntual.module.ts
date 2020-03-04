import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IncidenciaPuntualPage } from './incidencia-puntual.page';

const routes: Routes = [
  {
    path: '',
    component: IncidenciaPuntualPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IncidenciaPuntualPage]
})
export class IncidenciaPuntualPageModule {}
