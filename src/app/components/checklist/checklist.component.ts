import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
})
export class ChecklistComponent implements OnInit {

  @Input() secciones: string[] = [];

  public myForm: FormGroup;
  public formArr = new FormArray([]);
  private checkCount = 1;

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

  constructor(private formBuilder: FormBuilder) {
    /* this.addNewSection('Barreras'); */
    this.myForm = this.formBuilder.group({
      sections: this.formBuilder.array([])
    });
  }

ngOnInit() {
    /* console.log({secciones: this.secciones}); */
    this.secciones.forEach( seccion => {
      this.addNewSection(seccion);
    });

    /* for (let i = 0; i < this.secciones.length; i++) {
      this.myForm[i] = this.formBuilder.group({
        chek1: ['', Validators.required]
      });
      console.log(this.myForm[i].controls);
      console.log(this.myForm[i]);
    } */

    /* this.seccion = this.formBuilder.group({
       chek1: ['', Validators.required]
       seccion1: this.formBuilder.array([])
     }); */

    /* this.secciones.forEach( seccion => {
      this.addNewSection(seccion);
    }); */


    console.log(this.myForm);

  }

  sections(): FormArray {
    return this.myForm.get('sections') as FormArray;
  }

  addNewSection(name: string) {
    console.log('add new section ' + name);
    this.sections().push( this.formBuilder.group({[name]: new FormArray([])}));
  }

  removeSection(secIndex: number) {
    this.sections().removeAt(secIndex);
  }

  sectionCheks(secIndex: number, section: string): FormArray {
    return this.sections().at(secIndex).get(section) as FormArray;
  }

  addNewChek(secIndex: number, section: string) {
    console.log('add new chek in ' + section);
    this.sectionCheks(secIndex, section).push( this.formBuilder.group({ chek: this.formBuilder.control('')}) );
  }

  removeChek(secIndex: number, chekIndex: number, section: string) {
    this.sectionCheks(secIndex, section).removeAt(chekIndex);
  }




  addItems() {
    this.sections().push(this.formBuilder.control(''));
  }

addControl( seccion ) {
    console.log(seccion);

    this.checkCount++;
    this.myForm.addControl(seccion, new FormControl('', Validators.required));
    console.log(this.myForm.controls);
  }

addField(): FormGroup {
    return this.formBuilder.group({
      check1: ['', Validators.required]
    });
  }

removeControl(control) {
    console.log(control);
    this.myForm.removeControl(control.key);
  }

removeImg(img) {
    console.log(img);
  }

seleccionarAvatar( avatar ) {

    this.avatars.forEach( av => av.seleccionado = false );
    avatar.seleccionado = true;

    console.log(avatar.img);
  //  this.avatarSel.emit( avatar.img );

  }
}
