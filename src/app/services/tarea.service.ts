import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { environment } from 'src/environments/environment';
import { CHECKLISTINSTANCES } from '../data/checklistInstance';


const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private checklistInstances: any;

  constructor(private http: HttpClient,
    private usuarioService: UsuarioService) {
    this.checklistInstances = CHECKLISTINSTANCES;
  }

  getCheklistInstances() {
    return this.checklistInstances;
  }

  obtenerTareasDeUsuario() {
    const headers = new HttpHeaders({
      'token': this.usuarioService.token
    });
    const url = URL + '/tareas' /* + this.usuarioService.usuario._id */;
    return this.http.get(url, { headers });
  }
}
