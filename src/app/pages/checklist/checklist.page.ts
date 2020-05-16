import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checklist-page',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
})
export class ChecklistPage implements OnInit {

  nombreChecklist: string;

  constructor() { }

  ngOnInit() {
  }

  recibeNombre( nombreChecklist: string ) {
    this.nombreChecklist = nombreChecklist;
  }

}
