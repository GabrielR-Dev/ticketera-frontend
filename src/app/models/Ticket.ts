import { CategoriaTicket } from "../enums/CategoriaTicket";
import { EstadoTicket } from "../enums/EstadoTicket";
import { IAdjunto } from "../interfaces/IAdjunto";
import { ITicket } from "../interfaces/ITicket";

export class TicketModel implements ITicket {


  id?: number | undefined;
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


  constructor(data : ITicket) {
    this.titulo = data.titulo;
    this.descripcion = data.descripcion;
    this.estado = EstadoTicket.PENDIENTE;
    this.fechaCreacion = new Date();
    this.fechaAsignacion = data.fechaAsignacion || null;
    this.fechaCierre = data.fechaCierre || null;
    this.clienteID = data.clienteID;
    this.tecnicoID = data.tecnicoID || null;
    this.categoria = data.categoria;
    this.adjuntos = data.adjuntos;
  }

  // Verificar si el ticket esta pendiente
  estaPendiente(): boolean {
    return this.estado === EstadoTicket.PENDIENTE;
  }

  // Verificar si el ticket esta asignado
  estaAsignado(): boolean {
    return this.estado === EstadoTicket.ASIGNADO;
  }

  // Verificar si el ticket esta cerrado
  estaCerrado(): boolean {
    return this.estado === EstadoTicket.CERRADO;
  }

  // Asignar un técnico
  asignarTecnico(tecnicoID: number): void {

    this.tecnicoID = tecnicoID;
    this.estado = EstadoTicket.ASIGNADO;
    this.fechaAsignacion = new Date();

  }

  // Cerrar el ticket
  cerrarTicket(): void {
    this.estado = EstadoTicket.CERRADO;
    this.fechaCierre = new Date();
  }


  // agregar un adjunto
  agregarAdjunto(nombreArchivo: string, url: string): void {
    this.adjuntos.push({ nombreArchivo, url });
  }



  // Obtener la cantidad de adjuntos
  getCantidadAdjuntos(): number {
    return this.adjuntos.length;
  }


  // Transcribir estado a String
  getEstadoLegible(): string {

    switch (this.estado) {
      case EstadoTicket.PENDIENTE:
        return 'Pendiente';
      case EstadoTicket.ASIGNADO:
        return 'Asignado';
      case EstadoTicket.CERRADO:
        return 'Cerrado';
    }

  }


  // Transcribir categoria a string
  getCategoriaString(): string {
    switch (this.categoria) {
      case CategoriaTicket.RED:
        return 'Red';
      case CategoriaTicket.HARDWARE:
        return 'Hardware';
      case CategoriaTicket.SOFTWARE:
        return 'Software';
      default:
        return 'Otros';
    }
  }

  // Verificar si tiene tecnico asignado
  tieneTecncoAsignado(): boolean {
    return this.tecnicoID !== null && this.tecnicoID !== undefined;
  }

  // Convetir a objeto JSON
  toJSON(): ITicket {
    return {
      id: this.id,
      titulo: this.titulo,
      descripcion: this.descripcion,
      estado: this.estado,
      fechaCreacion: this.fechaCreacion,
      fechaAsignacion: this.fechaAsignacion,
      fechaCierre: this.fechaCierre,
      clienteID: this.clienteID,
      tecnicoID: this.tecnicoID,
      categoria: this.categoria,
      adjuntos: this.adjuntos
    };
  }

}