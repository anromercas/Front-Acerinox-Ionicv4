import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario: Usuario = {};

  constructor( private usuarioService: UsuarioService,
               private uiService: UiService) {}

  async ngOnInit() {
    await this.usuarioService.cargarStorage();
    this.usuario = await this.usuarioService.getUsuario();

    console.log(this.usuario);
  }

  async actualizar( fActualizar: NgForm ) {

    if ( fActualizar.invalid ) { return; }

    const actualizado = await this.usuarioService.actualizarUsuario( this.usuario );
    console.log(actualizado);

    if ( actualizado ) {
      // toast con el mensaje de actualizado
      this.uiService.mostrar_toast( 'Usuario modificado' );
    } else {
      // toast con el error
      this.uiService.mostrar_toast( 'No se pudo modificar el usuario' );

    }

  }


}
