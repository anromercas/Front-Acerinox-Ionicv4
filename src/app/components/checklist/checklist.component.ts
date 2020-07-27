import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { ChecklistService } from '../../services/checklist.service';
import { debounceTime } from "rxjs/operators";
import { ChecklistInstance } from '../../interfaces/checklistInstance.interface';
import { ActivatedRoute, Router } from "@angular/router";
import { NetworkService } from 'src/app/services/network.service';
import { UiService } from '../../services/ui.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Subscription } from 'rxjs';
import { NavController } from '@ionic/angular';


declare var window;

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
})
export class ChecklistComponent implements OnInit {

  @Output() nombreChecklist = new EventEmitter;
  
  private comments: Subscription;
  contents: any[] = [];
  public myForm: FormGroup;
  public formArr = new FormArray([]);
  checklist: ChecklistInstance;

  isConnected = false;

  avatarSlide = {
    slidesPerView: 2.5
  };

  puntuacion = [0, 1, 2, 3, 4, 5];
  shift = ['Turno 1', 'Turno 2', 'Turno 3', 'Turno 4'];

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
  private uiService: UiService,
  private router: Router,
  public navCtrl: NavController,
  private camera: Camera) {
  this.myForm = this.formBuilder.group({
    shift: this.formBuilder.control(''),
    comments: this.formBuilder.control(''),
    contents: this.formBuilder.array([])
    // sections: this.formBuilder.array([])
  });
}

ngOnInit() {

  this.networkService.getNetworkStatus().subscribe( (connected: boolean) => {
    this.isConnected = connected;
    if (!this.isConnected) {
      console.log('Por favor enciende tu conexión a Internet');
      console.log('Conectado: ', this.isConnected);
    //  this.uiService.mostrar_toast_up('Comprueba tu conexión a internet antes de iniciar sesión');
    } else {
      console.log('Conectado: ', this.isConnected);
    //  this.uiService.mostrar_toast_up('conexión a internet correcta');
    }
  });

  this.activatedRoute.paramMap.subscribe( paramMap => {
    const recipeId = paramMap.get('id');
    this.checklistService.getCheklist(recipeId).subscribe( data => {
      console.log(data);
      this.checklist = data;
      this.contents = this.checklist.content;
      this.nombreChecklist.emit(this.checklist.checklist_id.name);
      this.myForm.get('shift').setValue(this.checklist.shift);

      this.comments = this.myForm.controls.comments.valueChanges.pipe(
        debounceTime(500)
      ).subscribe( value => {
        this.checklist.comments = value;
      });

      this.contents.forEach( (content: any, i) => {
        this.addNewContent(content.section);
        content.checkpoints.forEach( (seccion: any, index) => {
          this.addNewSection(i, content.section, seccion.name, this.checklist.content[i].checkpoints[index].score);
        });
      });

      /* this.contents.forEach( (content: any, i) => {
        content.checkpoints.forEach( (seccion: any, index) => {
          this.addNewSection(i, content.section, seccion.name, this.checklist.content[i].checkpoints[index].score);
        });
      }); */

      this.contents.forEach( (content: any, i) => {
        content.checkpoints.forEach( (seccion: any, index) => {
          seccion.observations.forEach( (check, j) => {
            console.log(check);
            this.addDataChek( index, j, content.section, seccion.name, check.text, check.images );
          });
        });
      });


    });
  });
   // console.log(this.myForm.controls);

}

ionViewDidLeave() {
  this.comments.unsubscribe();
}

content(): FormArray {
  return this.myForm.get('contents') as FormArray;
}

sections(contIndex: number, section: string): FormArray {
  // return this.myForm.get('sections') as FormArray;
  return this.content().at(contIndex).get(section) as FormArray;
}

addNewContent(section: string) {
  // console.log('Add new Content ' + section);
  this.content().push( this.formBuilder.group({[section]: new FormArray([])}));
}

addNewSection(contIndex: number, section: string, nameCheck: string, score: number) {
   console.log('add new section - checkpoint ' + contIndex + section + nameCheck + score);
  this.sections(contIndex, section).push( this.formBuilder.group({[nameCheck]: new FormArray([]), score: this.formBuilder.control(score)} ));
}

removeSection(contIndex: number, section: string, secIndex: number) {
  this.sections(contIndex, section).removeAt(secIndex);
}

sectionCheks(contIndex: number, secIndex: number, section: string, nameCheck: string): FormArray {
  // console.log(`${contIndex} - ${section} - ${nameCheck}`);
  // console.log(this.sections(contIndex, section).at(secIndex).get(nameCheck));
  return this.sections(contIndex, section).at(secIndex).get(nameCheck) as FormArray;
}

subscribeItemToAdd( itemToAdd: FormGroup, contIndex: number, secIndex: number, section: string, nameCheck: string ) {

  itemToAdd.valueChanges.pipe(
    debounceTime(500)
  )
  .subscribe( value => {
    console.log(value);
    const valores: any[] = [];
    this.sectionCheks(contIndex, secIndex, section, nameCheck).controls.forEach( control => {
      valores.push(control.value);
    })
    console.log(valores);
    this.checklist.content[contIndex].checkpoints[secIndex].observations = valores;
    console.log(this.checklist);
  });
}

addNewChek(contIndex: number, secIndex: number, section: string, nameCheck: string) {
  this.addDataChek(contIndex, secIndex, section, nameCheck, '', [], true);
}

addDataChek(contIndex: number, secIndex: number, section: string, nameCheck: string, texto: string, fotos: string[], nuevo: boolean = false) {

  const itemToAdd = this.formBuilder.group({ text: this.formBuilder.control(texto), images: this.formBuilder.control(fotos)});
  this.subscribeItemToAdd(itemToAdd, contIndex, secIndex, section, nameCheck);
  if(nuevo){
    this.checklistService.addChecklsitContent(section, nameCheck, { texto, fotos } );
    this.sectionCheks(contIndex, secIndex, section, nameCheck).controls.unshift( itemToAdd );
    // console.log(this.sectionCheks(contIndex, secIndex, section, nameCheck).controls);
    return;
  }
  console.log(contIndex, secIndex, section, nameCheck);
  this.sectionCheks(contIndex, secIndex, section, nameCheck).controls.push( itemToAdd );
  
}

async removeChek(contIndex: number, secIndex: number,  chekIndex: number, section: string, nameCheck: string) {
  console.log(nameCheck);
  const alert = await this.uiService.alertConfirmar('Borrar', '¿quiere borrar la línea?');

  alert.present();

  const data = await alert.onDidDismiss();

  if(data.role === 'ok') {
    
    this.sectionCheks(contIndex, secIndex, section, nameCheck).removeAt(chekIndex);
    console.log(chekIndex);
    const borrado = this.checklistService.removeCheklistContent(this.checklist._id, section, chekIndex);
    console.log(borrado);
  }

}

async removeImg(images: string[], avatar: string) {

  const alert = await this.uiService.alertConfirmar('Borrar', '¿quiere borrar la imágen?');
  alert.present();
  const data = await alert.onDidDismiss();

  if(data.role === 'ok') {
    const indexImg = images.findIndex( img => img === avatar );
    images.splice(indexImg, 1);
  }

}

checked(contIndex, secIndex, event) {
  console.log(event);
  this.checklist.content[contIndex].checkpoints[secIndex].checked = event;
  console.log(this.checklist);
}

// cambio de turno
changeShift( value ) {
  this.checklist.shift = value;
  console.log(this.checklist.shift);
}

changeScore ( value, contIndex, secIndex ) {
  // this.checklist.content[secIndex].score = value;
  this.checklist.content[contIndex].checkpoints[secIndex].score = value;
  console.log(this.checklist.content[contIndex].checkpoints[secIndex].score);
}

save() {
  console.log('Guardando Formulario');
  this.checklistService.updateChecklist(this.checklist._id, this.checklist, this.isConnected)
    .subscribe( resp => {
      console.log(resp);
      if(resp.success) {
        this.uiService.mostrar_toast_up('Tarea guardada');
      }
    });
  // Guardar en Local siempre y que el subscribe compruebe si hay conexion y mande los datos a la API
}

sign() {
  // hacer la llamada a la API para la firma
  this.checklist.status = 'A_REVISAR';
  this.save();
  this.uiService.mostrar_toast_up('Tarea Firmada');
  this.navCtrl.navigateRoot(['/home2']);


}

camara( images: string[], contentSection: string, checkpointName: string, indexObservation: number) {
  const options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    sourceType: this.camera.PictureSourceType.CAMERA,
    saveToPhotoAlbum: true
  };

  console.log(images);

  this.camera.getPicture(options).then(
    imageData => {
      // img es la imagen a mostrar en la interfaz
        const img = window.Ionic.WebView.convertFileSrc(imageData);
        // img64 es la data de la imagen a guardar
        // this.imagen64 = imageData;
        if ( this.isConnected === false ) {
          this.checklistService.imgStorage(imageData, this.checklist._id, contentSection, checkpointName, indexObservation);
          // añado imagen al array del form
          images.unshift(img)
        } else {
          this.checklistService.subirImagen(
            imageData,
            this.checklist._id, 
            contentSection,
            checkpointName,
            indexObservation
          ).then( data => {
            images.unshift(img);
            this.uiService.mostrar_toast('Imagen subida');
          }).catch( err => {
            console.log('Error en carga', err);
            this.checklistService.imgStorage(imageData, this.checklist._id, contentSection, checkpointName, indexObservation);
            images.unshift(img);
          });
        }
     
    },
    err => {
      console.log('ERROR EN CAMARA', JSON.stringify(err));
    }
  );
}


}
