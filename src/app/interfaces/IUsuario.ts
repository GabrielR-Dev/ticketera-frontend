import { RolUsuario } from "../enums/RolUsuario";

export interface IUsuario {
  ID: number;
  EMAIL: string;
  CONTRASENA: string;
  NOMBRE?: string;
  APELLIDO?: string;
  ROL: RolUsuario;
  TELEFONO: string;
  DNI: string;
  ACTIVO: boolean;
  FECHAREGISTRO: Date;
}