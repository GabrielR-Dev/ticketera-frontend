import { RolUsuario } from "../enums/RolUsuario";
import { IUsuario } from "../interfaces/IUsuario";



export class Usuario implements IUsuario {
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

  constructor(data: Usuario) {
    this.id = data.id || 0;
    this.email = data.email || '';
    this.contraseña = data.contraseña || '';
    this.nombre = data.nombre || '';
    this.apellido = data.apellido;
    this.rol = data.rol || RolUsuario.CLIENTE;
    this.telefono = data.telefono || '';
    this.dni = data.dni || '';
    this.activo = data.activo !== undefined ? data.activo : true;
    this.fechaRegistro = data.fechaRegistro || new Date();
  }

  // Verificar si el usuario es de soporte
  esSoporte(): boolean {
    return this.rol === RolUsuario.SOPORTE;
  }

  // Verificar si el usuario es cliente
  esCliente(): boolean {
    return this.rol === RolUsuario.CLIENTE;
  }

  // Metodo para obtener el nombre z apellido 
  getNombreyApellido(): string {
    return `${this.nombre} ${this.apellido}`;
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
  toJSONsC(): Omit<IUsuario, 'contraseña'> {
    return {
      id: this.id,
      email: this.email,
      nombre: this.nombre,
      apellido: this.apellido,
      rol: this.rol,
      telefono: this.telefono,
      dni: this.dni,
      activo: this.activo,
      fechaRegistro: this.fechaRegistro
    };
  }
}