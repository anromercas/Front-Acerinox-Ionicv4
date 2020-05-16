import { Injectable } from '@angular/core';
import { CHECKLIST } from '../data/data.checklist';
import { CHECKLISTINSTANCES } from '../data/checklistInstance';
import { ChecklistInstance } from '../interfaces/checklistInstance.interface';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  
  
  private checklistInstances: ChecklistInstance[];

  constructor() { 
    this.checklistInstances = CHECKLISTINSTANCES;
  }

  getChecklistInstances() {
    return [...this.checklistInstances];
  }

  getCheklist(id: string) {

    return {
      ...this.checklistInstances.find( check => {
        return check._id === id
      })
    }
    // return this.checklist;
  }

  addChecklsitContent( idChecklist: string, nameContent: string, cheklistContent: any ) {
    console.log('Recibiendo Datos: ', cheklistContent );
    const checkpoint = this.checklistInstances.find( check => check._id === idChecklist );
    const content = checkpoint.content.find( content => content.name === nameContent );
    const add = content.freeValues.unshift( cheklistContent );
    console.log(content);
    return add;
  }

  removeCheklistContent( idChecklist: string, nameContent: string, indexArr: number ) {
    // probar a hacerlo guardando constantes como si fueran llamadas asincronas
    const checkpoint = this.checklistInstances.find( check => check._id === idChecklist );
    const content = checkpoint.content.find( content => content.name === nameContent );
    const deleted = content.freeValues.splice( indexArr, 1 );
    console.log('Free Value borrado', deleted);
    return deleted;

    
  }
}
