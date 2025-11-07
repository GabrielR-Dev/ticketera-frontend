import { RolUsuario } from "../enums/RolUsuario";

export interface IUsuario {
  id: number;
  email: string;
  contraseña: string;
  nombre: string;
  apellido: string;
  rol: RolUsuario;
  telefono: string;
  dni: string;
  activo: boolean;
  fechaRegistro: Date;
}