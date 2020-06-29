import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { OfflineManagerService } from './offline-manager.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';
import { Incidents } from '../interfaces/incidents.interface';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class IncidenciaPuntualService {

  constructor(private usuarioService: UsuarioService,
    private offlineManager: OfflineManagerService,
    private http: HttpClient,
    private fileTransfer: FileTransfer) { }



    addIncident(incident: Incidents, connected: boolean) {

      console.log('Añadir Incidencia Puntual ', incident, " Conectada: ", connected);

      const headers = new HttpHeaders({
        'token': this.usuarioService.token
      });

      const url = URL + '/incident';

      if (!connected) {
        return from(this.offlineManager.storeRequest(url, 'POST', incident));
      } else {
        return this.http.post( url, incident, {headers} );
      }
  
    }

    updateIncident( incident: Incidents, connected: boolean ) {

      console.log('Upadte Incidencia Puntual ', incident, " Conectada: ", connected);

      const headers = new HttpHeaders({
        'token': this.usuarioService.token
      });

      const url = URL + '/incident/' + incident._id;

      if (!connected) {
        return from(this.offlineManager.storeRequest(url, 'PUT', incident));
      } else {
        return this.http.put( url, incident, {headers} );
      }
    }

    imgStorage(img: string, id: string, contentSection: string = '', checkpointName: string = '', indexObservation: number = 0) {
      const options: FileUploadOptions = {
        fileKey: 'img',
        httpMethod: 'put',
        mimeType: 'image/jpeg',
        headers: {
          'token': this.usuarioService.token
        }
      };
      const url = `${URL}/upload/incident/${id}`;
      return from(this.offlineManager.storeImg(url, 'PUT', options, img, id, contentSection, checkpointName, indexObservation));
  
    }
  
    subirImagen(img: string, id: string) {
  
      const options: FileUploadOptions = {
        fileKey: 'img',
        httpMethod: 'put',
        mimeType: 'image/jpeg',
        headers: {
          'token': this.usuarioService.token
        }
      };
  
      const fileTransfer: FileTransferObject = this.fileTransfer.create();
      const url = `${URL}/upload/incident/${id}`;
  
      return fileTransfer.upload( img, url, options );
  
    }



}


