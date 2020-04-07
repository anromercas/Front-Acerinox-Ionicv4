import { Injectable } from '@angular/core';
import { CHECKLIST } from '../data/data.checklist';


@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  
  private checklist: any;

  constructor() { 
    this.checklist = CHECKLIST;
  }

  getCheklist() {
    return this.checklist;
  }

  addCheklsit( cheklist ) {

  }

  removeCheklist( cheklist ) {

  }
}
