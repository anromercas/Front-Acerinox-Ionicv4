import { UiService } from './ui.service';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { map } from 'rxjs/operators';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  clave: string;
  usuario: Usuario;
  token: string = null;
  role: string;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController,
    private uiService: UiService
  ) {
    this.cargarStorage();
  }

  login(email: string, password: string) {
    const url = URL + '/loginApp';
    const usr = {
      email,
      password
    };

    return new Promise(resolve => {
      this.http.post(url, usr).subscribe(
        (resp: any) => {
          if (resp['ok']) {
            console.log(resp.usuario);
            this.usuario = resp.usuario;
            this.role = resp.usuario.role;
            this.token = resp.token;
            this.guardarStorage();
            resolve(true);
          }
        },
        (error: any) => {
          this.token = null;
          this.role = null;
          this.borrarStorage();
          resolve(false);
        }
      );
    });
  }

  registro( usuario: Usuario ) {

    return new Promise( resolve => {

      this.http.post(`${ URL }/usuario`, usuario )
        .subscribe( async (resp: any) => {
          console.log(resp);
          if( resp['ok'] ) {
            console.log(resp.usuario);
            this.usuario = resp.usuario;
            this.role = resp.usuario.role;
            this.token = resp.token;
            this.guardarStorage();
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        });

    });

  }

  actualizarUsuario( usuario: Usuario ) {

    const headers = new HttpHeaders({
      'token': this.token
    });

    const id = this.usuario._id;
    console.log(usuario);
    return new Promise( resolve => {

      this.http.put(`${ URL }/usuario/${id}`, usuario, { headers })
                .subscribe( resp => {
                  if( resp['ok'] ) {
                    this.guardarToken( resp['token'] );
                    this.usuario = resp['usuario'];
                    this.storage.set('usuario', this.usuario);
                    resolve(true);
                  } else {
                    resolve(false);
                  }
                });
    });
  }

  renuevaToken() {
    const url = URL + '/login/renuevatoken';

    return this.http.get(url).pipe(
      map((resp: any) => {
        this.token = resp.token;
        this.guardarStorage();
        return true;
      })
    );
  }

  getUsuario() {

    if ( !this.usuario._id ) {
      this.validaToken();
    }

    return { ...this.usuario };
  }

  borrarStorage() {
    this.storage.remove('usuario');
    this.storage.remove('token');
  }

  guardarStorage() {
    this.storage.set('usuario', this.usuario);
    this.storage.set('token', this.token);
  }

  async guardarToken( token: string ) {

    this.token = token;
    await this.storage.set('token', token);

    await this.validaToken();
  }

  async cargarStorage() {
    this.token = await this.storage.get('token') || null;
    this.usuario = await this.storage.get('usuario') || null;
    if( this.usuario !== null ) {
      this.role = this.usuario.role;
    }
  }

  async validaToken(): Promise<boolean> {

    await this.cargarStorage();

    if ( !this.token ) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>( resolve => {

      const headers = new HttpHeaders({
        token: this.token
      });

      this.http.get(`${ URL }/usuario-token/`, { headers })
          .subscribe( ( resp: any ) => {
          //  console.log(resp);
            if ( resp.ok ) {
              this.usuario = resp.usuario;
              resolve(true);
            } else {
              this.navCtrl.navigateRoot('/login');
              resolve(false);
            }
          }, err => {
            this.navCtrl.navigateRoot('/login');
            this.uiService.mostrar_toast('La sesión ha caducado');
          }
          );
    });
  }

  logout() {
    this.borrarStorage();
    this.navCtrl.navigateRoot('/login', { animated: true });
  }
}
