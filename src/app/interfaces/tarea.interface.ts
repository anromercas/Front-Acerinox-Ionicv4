import { Usuario } from './usuario.interface';

export interface Tarea {
    nombre: string;
    tipo: string;
    fechaInicio: string;
    fechaFin: string;
    fechasAleatoria: string[];
    repeticion: string;
    realizado: boolean;
    expirado: boolean;
    repeticiones: number;
    codigo: string;
    fromNow: string;
    usuario: Usuario;
    tareaDeHoy: string;
}