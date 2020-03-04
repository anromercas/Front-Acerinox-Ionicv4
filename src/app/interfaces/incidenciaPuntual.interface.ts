import { Usuario } from './usuario.interface';

export interface IncidenciaPuntual {
    nombre: string;
    observaciones: string;
    img: string[];
    usuario: Usuario;
}