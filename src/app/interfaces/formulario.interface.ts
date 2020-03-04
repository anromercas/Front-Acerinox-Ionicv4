import { Usuario } from './usuario.interface';
import { CheckList } from './checkList.interface';

export interface Formulario {
    nombre: string;
    seccion: string;
    realizado?: boolean;
    checkList: CheckList[];
    usuario: Usuario;
}