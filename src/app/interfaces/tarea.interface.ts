import { Usuario } from './usuario.interface';
import { Formulario } from './formulario.interface';

export interface Tarea {
    nombre: string;
    tipo: string;
    fechaInicio: string;
    fechaFin: string;
    fechasAleatoria: string[];
    repeticion: string;
    realizado: boolean;
    repeticiones: number;
    codigo: string;
    fromNow: string;
    usuario: Usuario;
    formulario: Formulario;
    tareaDeHoy: string;
    color: string;
}