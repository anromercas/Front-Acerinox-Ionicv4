import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { IonicModule } from '@ionic/angular';
import { ExpandableComponent } from './expandable/expandable.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChecklistComponent } from './checklist/checklist.component';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [
    AvatarSelectorComponent,
    ExpandableComponent,
    ChecklistComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    PipesModule
  ],
  exports: [
    AvatarSelectorComponent,
    ExpandableComponent,
    ChecklistComponent
  ]
})
export class ComponentsModule { }
