import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ChecklistService } from '../../services/checklist.service';
import { debounceTime } from "rxjs/operators";
import { ChecklistInstance } from '../../interfaces/checklistInstance.interface';
import { ActivatedRoute } from "@angular/router";
import { NetworkService } from 'src/app/services/network.service';
import { OfflineManagerService } from 'src/app/services/offline-manager.service';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
})
export class ChecklistComponent implements OnInit {

  @Output() nombreChecklist = new EventEmitter;
  
  private secciones2: any[] = [];
  public myForm: FormGroup;
  public formArr = new FormArray([]);
  checklist: ChecklistInstance;

  isConnected = false;

  avatarSlide = {
    slidesPerView: 2.5
  };

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
];

constructor(private formBuilder: FormBuilder, 
  private checklistService: ChecklistService, 
  private activatedRoute: ActivatedRoute,
  private networkService: NetworkService,
  private offlineManager: OfflineManagerService) {
  this.myForm = this.formBuilder.group({
    sections: this.formBuilder.array([])
  });
}

ngOnInit() {

  /* this.networkService.getNetworkStatus().subscribe( (connected: boolean) => {
    this.isConnected = connected;
    console.log(this.isConnected);
  }) */

  this.networkService.getNetworkStatus().subscribe( (connected: boolean) => {
    this.isConnected = connected;
    if (!this.isConnected) {
      console.log('Por favor enciende tu conexión a Internet');
      console.log(this.isConnected);
    //  this.uiService.mostrar_toast_up('Comprueba tu conexión a internet antes de iniciar sesión');
    } else {
      console.log(this.isConnected);
    //  this.uiService.mostrar_toast_up('conexión a internet correcta');
    }
  });

  this.activatedRoute.paramMap.subscribe( paramMap => {
    const recipeId = paramMap.get('id');
    this.checklist = this.checklistService.getCheklist(recipeId);
    this.secciones2 = this.checklist.content;
    console.log(this.checklist);
    this.nombreChecklist.emit(this.checklist.checklist_id.name);
  });
  
  /* console.log({secciones: this.secciones}); */
  this.secciones2.forEach( (seccion: any) => {
  //  console.log(seccion.nombre);
    this.addNewSection(seccion.name);
  });
  //  console.log(this.myForm);

  this.secciones2.forEach( (sec, i) => {
    sec.freeValues.forEach( (check, j) => {
    //  console.log( i, sec.name, check.text, check.images );
      this.addDataChek( i, sec.name, check.text, check.images );
    });
  });

  
}

save() {
  console.log('Guardando Formulario');
  // Guardar en Local siempre y que el subscribe compruebe si hay conexion y mande los datos a la API
}

sign() {
  // hacer la llamada a la API para la firma
}

sections(): FormArray {
  return this.myForm.get('sections') as FormArray;
}

addNewSection(name: string) {
//  console.log('add new section ' + name);
  this.sections().push( this.formBuilder.group({[name]: new FormArray([])}));
}

removeSection(secIndex: number) {
  this.sections().removeAt(secIndex);
}

sectionCheks(secIndex: number, section: string): FormArray {
  return this.sections().at(secIndex).get(section) as FormArray;
}

sectionCheckFotos(secIndex: number, section: string): FormArray {
  return this.sections().at(secIndex).get(section) as FormArray;
}

subscribeItemToAdd( itemToAdd, secIndex, section ) {

  itemToAdd.valueChanges.pipe(
    debounceTime(500)
  )
  .subscribe( value => {
    console.log(value);
    const valores: any[] = [];
    this.sectionCheks(secIndex, section).controls.forEach( control => {
      valores.push(control.value);
    })
    console.log(valores);
    this.checklist.content[secIndex].freeValues = valores;
    console.log(this.checklist);
  });
}


addNewChek(secIndex: number, section: string) {
  this.addDataChek(secIndex, section, '', [], true);
}

addDataChek(secIndex: number, section: string, texto: string, fotos: string[], nuevo: boolean = false) {

  const itemToAdd = this.formBuilder.group({ text: this.formBuilder.control(texto), images: this.formBuilder.control(fotos)});
  this.subscribeItemToAdd(itemToAdd, secIndex, section);
  if(nuevo){
    this.checklistService.addChecklsitContent(this.checklist._id, section, { texto, fotos } );
    this.sectionCheks(secIndex, section).controls.unshift( itemToAdd );
    console.log(this.sectionCheks(secIndex, section).controls);
    return;
  }

  this.sectionCheks(secIndex, section).controls.push( itemToAdd );
  

}

removeChek(secIndex: number, chekIndex: number, section: string) {
  this.sectionCheks(secIndex, section).removeAt(chekIndex);

  console.log(chekIndex);
  const borrado = this.checklistService.removeCheklistContent(this.checklist._id, section, chekIndex);
  console.log(borrado);
}

removeImg(img) {
    console.log(img);
}


// cambio de turno
changeShift( value ) {
  this.checklist.shift = value;
  console.log(this.checklist);
}

}
