import { CategoriaTicket } from "../enums/CategoriaTicket";
import { EstadoTicket } from "../enums/EstadoTicket";
import { IAdjunto } from "./IAdjunto";

export interface ITicket {
  id?: number;
  titulo: string;
  descripcion: string;
  estado: EstadoTicket;
  fechaCreacion: Date;
  fechaAsignacion?: Date | null;
  fechaCierre?: Date | null;
  clienteID: number;
  tecnicoID?: number | null;
  categoria: CategoriaTicket;
  adjuntos: IAdjunto[];
}