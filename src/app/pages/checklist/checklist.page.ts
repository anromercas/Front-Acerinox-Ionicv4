import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checklist-page',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
})
export class ChecklistPage implements OnInit {

  secciones = ['Barreras', 'Sensores', 'Orden y Limpieza', 'Puertas'];

  constructor() { }

  ngOnInit() {
  }

}
