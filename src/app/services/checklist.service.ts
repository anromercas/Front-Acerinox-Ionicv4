import { Injectable } from '@angular/core';
import { ChecklistInstance } from '../interfaces/checklistInstance.interface';
import { UsuarioService } from './usuario.service';
import { OfflineManagerService } from './offline-manager.service';
import { from } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  
  
  private checklistInstances: ChecklistInstance[];
  public checklistInstance: ChecklistInstance;

  constructor(private usuarioService: UsuarioService,
  private offlineManager: OfflineManagerService,
  private http: HttpClient,
  private fileTransfer: FileTransfer,
  ) { 
    // this.checklistInstances = CHECKLISTINSTANCES;
  }

  getInstances() {
    const url = URL + '/checklistInstances/instance/byuser/go';
    const headers = new HttpHeaders({
      'token': this.usuarioService.token
    });
    return this.http.get(url, {headers});

  }

  getCheklist(id: string) {

    const headers = new HttpHeaders({
      'token': this.usuarioService.token
    });

    const url = URL + '/checklistInstances/' + id;
    return this.http.get(url, {headers})
    .pipe(
      map( (resp: any) => {
        this.checklistInstance = resp.data;
        return this.checklistInstance;
      })
    );

  }

  updateChecklist( id: string, checklist: ChecklistInstance, connected: boolean) {
    console.log('Actualizar Checklist ', checklist, " Conectada: ", connected);

    const headers = new HttpHeaders({
      'token': this.usuarioService.token
    });
    const url = URL + '/checklistInstances/' + id;

    if (!connected) {
      return from(this.offlineManager.storeRequest(url, 'PUT', checklist));
    } else {
      return this.http.put( url, checklist, {headers} );
    }
  }

  addChecklsitContent( nameSection: string, checkpointName: string, cheklistContent: any ) {
    console.log('Recibiendo Datos: ', cheklistContent );
     const section = this.checklistInstance.content.find( content => content.section === nameSection );
     const checkpoint = section.checkpoints.find( check => check.name === checkpointName);
     const add = checkpoint.observations.unshift( cheklistContent );
     console.log(this.checklistInstance);
     return add;
  
  }

  removeCheklistContent( idChecklist: string, nameContent: string, indexArr: number ) {
    // const content = this.checklistInstance.content.find( content => content.name === nameContent );
    // const deleted = content.freeValues.splice( indexArr, 1 );
    // console.log('Free Value borrado', deleted);
    // return deleted;
  }

  imgStorage(img: string, id: string, contentSection: string, checkpointName: string, indexObservation: number) {
    const options: FileUploadOptions = {
      fileKey: 'img',
      httpMethod: 'put',
      mimeType: 'image/jpeg',
      headers: {
        'token': this.usuarioService.token
      }
    };
    // const url = `${URL}/upload/checklistInstance-content/${id}/${contentName}/${indexFreeValue}`;
    const url = `${URL}/upload/checklistInstance-content/${id}?contentSection=${contentSection}&checkpointName=${checkpointName}&indexObservation=${indexObservation}`;
    return from(this.offlineManager.storeImg(url, 'PUT', options, img, id, contentSection, checkpointName, indexObservation));

  }

  subirImagen(img: string, id: string, contentSection: string, checkpointName: string, indexObservation: number) {

    const options: FileUploadOptions = {
      fileKey: 'img',
      httpMethod: 'put',
      mimeType: 'image/jpeg',
      headers: {
        'token': this.usuarioService.token
      }
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    const url = `${URL}/upload/checklistInstance-content/${id}?contentSection=${contentSection}&checkpointName=${checkpointName}&indexObservation=${indexObservation}`;

    return fileTransfer.upload( img, url, options );

                /* .then( data => {
                  console.log(data);
                }).catch( err => {
                  console.log('Error en carga', err);
                  this.uiProv.alertaInformativa('Imagen no subida', 'compruebe su conexión a internet e intentelo de nuevo');
                }); */

  }
}
