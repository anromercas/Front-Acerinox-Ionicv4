import { Usuario } from './usuario.interface';
import { Formulario } from './formulario.interface';

export interface CheckList {
    nombre: string;
    observaciones: string;
    img: string[];
    formulario?: Formulario;
}