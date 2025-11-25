import { RolUsuario } from "../enums/RolUsuario";
import { IUsuario } from "../interfaces/IUsuario";



export class Usuario implements IUsuario {
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

  constructor(data: Usuario) {
    this.ID = data.ID || 0;
    this.EMAIL = data.EMAIL || '';
    this.CONTRASENA = data.CONTRASENA || '';
    this.NOMBRE = data.NOMBRE || '';
    this.APELLIDO = data.APELLIDO;
    this.ROL = data.ROL || RolUsuario.CLIENTE;
    this.TELEFONO = data.TELEFONO || '';
    this.DNI = data.DNI || '';
    this.ACTIVO = data.ACTIVO !== undefined ? data.ACTIVO : true;
    this.FECHAREGISTRO = data.FECHAREGISTRO || new Date();
  }

  // Verificar si el usuario es de soporte
  esSoporte(): boolean {
    return this.ROL === RolUsuario.SOPORTE;
  }

  // Verificar si el usuario es cliente
  esCliente(): boolean {
    return this.ROL === RolUsuario.CLIENTE;
  }

  // Metodo para obtener el nombre y apellido 
  getNombreyApellido(): string {
    return `${this.NOMBRE} ${this.APELLIDO}`;
  }

  /* Convertir a JSON
  toJSON(): IUsuario {
    return {
      id: this.id,
      email: this.email,
      nombre: this.nombre,
      apellido: this.apellido,
      contraseña: this.contraseña,
      rol: this.rol,
      telefono: this.telefono,
      dni: this.dni,
      activo: this.activo,
      fechaRegistro: this.fechaRegistro
    };
  }*/
  // Convertir a JSON (el Omit retorna un tipo de IUsuario excluyendo "contraseña" )
  // toJSONsC(): Omit<IUsuario, 'contraseña'> {
  //   return {
  //     ID: this.id,
  //     EMAIL: this.email,
  //     NOMBRE: this.nombre,
  //     APELLIDO: this.apellido,
  //     ROL: this.rol,
  //     TELEFONO: this.telefono,
  //     DNI: this.dni,
  //     ACTIVO: this.activo,
  //     FECHAREGISTRO: this.fechaRegistro
  //   };
  // }
}