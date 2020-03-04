import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  constructor(private http: HttpClient,
              private usuarioService: UsuarioService, ) { }



  obtenerTareasDeUsuario() {
    const headers = new HttpHeaders({
      'token': this.usuarioService.token
    });
    const url = URL + '/tareas' /* + this.usuarioService.usuario._id */;
    return this.http.get( url, {headers});
  }
}
