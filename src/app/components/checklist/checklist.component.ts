import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ChecklistService } from '../../services/checklist.service';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
})
export class ChecklistComponent implements OnInit {

  @Input() secciones: string[] = [];
  
  private secciones2: any[] = [];
  public myForm: FormGroup;
  public formArr = new FormArray([]);
  private checkCount = 1;
  checklist: any;

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

constructor(private formBuilder: FormBuilder, private checklistService: ChecklistService) {
  /* this.addNewSection('Barreras'); */
  this.myForm = this.formBuilder.group({
    sections: this.formBuilder.array([])
  });

  this.checklist = checklistService.getCheklist();

  /* this.checklist.secciones.forEach( sec => {
    this.secciones2.push(sec.nombre)
  }); */

  this.secciones2 = this.checklist.secciones;

  console.log(this.checklist);
  console.log(this.secciones2);
}

ngOnInit() {
  /* console.log({secciones: this.secciones}); */
  this.secciones2.forEach( (seccion: any) => {
  //  console.log(seccion.nombre);
    this.addNewSection(seccion.nombre);
  });
  //  console.log(this.myForm);

  this.secciones2.forEach( (sec, i) => {
    sec.checkList.forEach( (check, j) => {
    //  console.log( i, sec.nombre, check.texto, check.fotos );
      this.addDataChek( i, sec.nombre, check.texto, check.fotos );
    });
  });
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

addNewChek(secIndex: number, section: string) {
  console.log('add new chek in ' + section);
  this.sectionCheks(secIndex, section).controls.unshift( this.formBuilder.group({ texto: this.formBuilder.control(''), fotos: this.formBuilder.control([])}) );
//  console.log(this.myForm);
}

addDataChek(secIndex: number, section: string, texto: string, fotos: string[]) {
//  console.log('add data chek in ' + section);
  this.sectionCheks(secIndex, section).controls.unshift( this.formBuilder.group({ texto: this.formBuilder.control(texto), fotos: this.formBuilder.control(fotos)}) );
//  console.log(this.sectionCheks(secIndex, section).controls[0].value);
}

removeChek(secIndex: number, chekIndex: number, section: string) {
  this.sectionCheks(secIndex, section).removeAt(chekIndex);
}

removeImg(img) {
    console.log(img);
}


}
