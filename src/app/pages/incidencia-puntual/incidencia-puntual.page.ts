import { Component, OnInit } from '@angular/core';
import { Incidents } from 'src/app/interfaces/incidents.interface';
import { IncidenciaPuntualService } from '../../services/incidencia-puntual.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UiService } from 'src/app/services/ui.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, ignoreElements } from 'rxjs/operators';
import { NetworkService } from 'src/app/services/network.service';
import { UsuarioService } from '../../services/usuario.service';
import { Subscription } from 'rxjs';

declare var window;


@Component({
  selector: 'app-incidencia-puntual',
  templateUrl: './incidencia-puntual.page.html',
  styleUrls: ['./incidencia-puntual.page.scss'],
})
export class IncidenciaPuntualPage implements OnInit {

  tempImages: string[] = [];
  incident: Incidents;
  public myForm: FormGroup;

  /* avatarSlide = {
    slidesPerView: 2.5
  }; */

  zoneControl: Subscription;

  isConnected = false;

  insecureActs = [
    'Operar equipos sin autorización',
    'Anular dispositivos y elementos de seguridad',
    'Uso de herramientas, equipos, etc. defectuosos o inadecuados',
    'No uso de E.P.I.´s',
    'No bloquear / consignar equipos de trabajo',
    'Trabajar sin permiso de trabajo',
    'Cargar / Mover de forma incorrecta materiales',
    'Adoptar posiciones o posturas inadecuadas',
  ];

  insecureConditions = [
    'Desorden y suciedad en el área de trabajo',
    'Piso, suelo en malas condiciones',
    'Escaleras, puertas, plataformas de trabajo, etc. en mal estado',
    'Mal funcionamiento de dispositivos y elementos de seguridad',
    'Iluminación inadecuada',
    'Instalación eléctrica en mal estado',
    'Condiciones ambientales peligrosas (gases, polvo, humos, etc.)',
    'Peligro de incendio / explosión',
  ];
  
  category = [];

  constructor( public incidentService: IncidenciaPuntualService,
    private camera: Camera,
    private formBuilder: FormBuilder,
    private networkService: NetworkService,
    private usuarioService: UsuarioService,
    private uiService: UiService) {
      this.myForm = this.formBuilder.group({
        department: this.formBuilder.control({value:''}, [Validators.required]),
        zone: this.formBuilder.control({value:''}, [Validators.required]),
        category: this.formBuilder.control({value:''}, [Validators.required]),
        insecureCategory: this.formBuilder.control({value:''}, [Validators.required]),
        name: this.formBuilder.control({value:''}, [Validators.required]),
        description: this.formBuilder.control({value:''}, [Validators.required]),
        images: this.formBuilder.array([])
      });
     }

  ngOnInit() {
    this.initIncident();

    this.myForm.reset();


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

    this.zoneControl = this.myForm.controls.zone.valueChanges.pipe(
      debounceTime(500)
    ).subscribe( value => {
      this.incident.location = value;
    });

    this.myForm.controls.name.valueChanges.pipe(
      debounceTime(500)
    ).subscribe( value => {
      this.incident.name = value;
    });

    this.myForm.controls.description.valueChanges.pipe(
      debounceTime(500)
    ).subscribe( value => {
      this.incident.description = value;
    });

  }

  ionViewDidLeave () {
    this.myForm.reset();
  }

  guardarIncidencia(btnGuardar: boolean = false) {

    console.log('Guardando Incidencia');

    if(btnGuardar) { // Actualiza la incidencia al pulsar el btn de guardar y resetea la incidencia
      this.incidentService.updateIncident(this.incident, this.isConnected)
                          .subscribe( data => {
                            if( data.success ) {
                              console.log('incidencia actualizada');
                              this.uiService.mostrar_toast_center('¡Incidencia Guardada!');
                              this.myForm.reset();
                              this.initIncident();
                            }
                          })
      
    } else { // Crea la incidencia al pulsar el btn de cámara

      this.incidentService.addIncident(this.incident, this.isConnected)
                          .subscribe( data => {
                            if( data.success ) {
                              console.log(data);
                              this.incident = data.data;
                              console.log('Incidencia Guardada');
                              // this.zoneControl.unsubscribe();
                            }
                          });
    }

  }

  initIncident() {
    this.incident = {
      user_id: this.usuarioService.usuario._id,
      department: '',
      location: '',
      insecureActs: '',
      insecureConditions: '',
      name: '',
      description: '',
      images: []
    };
  }


  changeDepartment( value: string ) {
    this.incident.department = value;
  //  console.log(this.incident);
  }

  changeCategory( value: string ) {
  //  console.log(this.incident);
    if( value === 'actos-inseguros') {
      this.category = this.insecureActs;
    } else {
      this.category = this.insecureConditions;
    }
    /* this.incident.category = value;
    if(this.myForm.valid) {
      console.log(this.myForm.valid);
      this.changeToFreeValues();
    } */
  }

  changeCategoryDescription ( value: string ) {
    if( this.myForm.controls.category.value === 'actos-inseguros') {
      this.incident.insecureActs = value;
    } else {
      this.incident.insecureConditions = value;
    }
  //  console.log(this.incident);
  }

  camara( indexCheck: number) {

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: true
    };

    if( this.incident.images.length > 0) {
      this.incidentService.updateIncident(this.incident, this.isConnected)
                          .subscribe( data => {
                            if( data.success ) {
                              console.log('incidencia actualizada');
                            }
                          })
    } else {
      this.guardarIncidencia();
    }

  
    this.camera.getPicture(options).then(
      imageData => {
        // img es la imagen a mostrar en la interfaz
          const img = window.Ionic.WebView.convertFileSrc(imageData);
          // img64 es la data de la imagen a guardar
          // this.imagen64 = imageData;
          if ( this.isConnected === false ) {
            this.incidentService.imgStorage(imageData, this.incident._id);
            // añado imagen al array del form
            this.incident.images.unshift(img);
          } else {
            this.incidentService.subirImagen(
              imageData,
              this.incident._id
            ).then( data => {
              this.incident.images.unshift(img);
              this.uiService.mostrar_toast('Imagen subida');
            }).catch( err => {
              console.log('Error en carga', err);
              this.incidentService.imgStorage(imageData, this.incident._id);
              this.incident.images.unshift(img);
            });
          }
       
      },
      err => {
        console.log('ERROR EN CAMARA', JSON.stringify(err));
      }
    );
  }

}
