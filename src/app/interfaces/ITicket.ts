import { CategoriaTicket } from "../enums/CategoriaTicket";
import { EstadoTicket } from "../enums/EstadoTicket";
import { IAdjunto } from "./IAdjunto";

export interface ITicket {
  id?: number;
  titulo: string;
  descripcion: string;
  estado: EstadoTicket;
  categoria: CategoriaTicket;
  fechaCreacion: Date;
  fechaAsignacion?: Date | null;
  fechaCierre?: Date | null;
  clienteID: number;
  tecnicoID?: number | null;
  cliente_nombre?: string;
  cliente_apellido?: string;
  cliente_email?: string;
  cliente_rol?: string;
  adjuntos: IAdjunto[];
}

export interface ApiResponse {
  status: string;
  data: [];
}
