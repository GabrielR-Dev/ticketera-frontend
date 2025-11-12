import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ITicket } from '../../interfaces/ITicket';
import { ApiService } from '../../services/api.service';
import { ApiResponse } from '../../interfaces/ITicket';
import { IUsuario } from '../../interfaces/IUsuario';

@Component({
  selector: 'app-historial-issues',
  imports: [CommonModule, FormsModule],
  templateUrl: './historial-issues.component.html',
  styleUrl: './historial-issues.component.css',
})
export class HistorialIssuesComponent {
  todosLosElementos: ITicket[] = [];
  ticketsCerrados: ITicket[] = [];
  ticketSeleccionado: any = null;
  usuarios: IUsuario[] = [];
  filtro = 'todos';
  usuariosConTickets: string[] = [];
  usuariosUnicos: string[] = [];

  elementosPorPagina = 5;
  paginaActual = 1;
  elementosMostrados: any[] = [];
  totalPaginas = 1;
  paginas: number[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.cargarTickets();
  }

  cargarTickets() {
    this.apiService.getTickets().subscribe({
      next: (datos) => {
        this.todosLosElementos = datos.map((d: any) => ({
          id: d.ID,
          titulo: d.TITULO,
          descripcion: d.DESCRIPCION,
          estado: d.ESTADO,
          categoria: d.CATEGORIA,
          fechaCreacion: d.FECHACREACION,
          fechaAsignacion: d.FECHAASIGNACION,
          fechaCierre: d.FECHACIERRE,
          clienteID: d.CLIENTEID,
          tecnicoID: d.TECNICOID,
          cliente_nombre: d.CLIENTE_NOMBRE,
          cliente_apellido: d.CLIENTE_APELLIDO,
          cliente_email: d.CLIENTE_EMAIL,
          cliente_rol: d.CLIENTE_ROL,
          adjuntos: [],
        }));

        this.usuariosConTickets = this.todosLosElementos
          .filter((usuario) => usuario.estado === 'CERRADO')
          .map(
            (usuario) => `${usuario.cliente_nombre} ${usuario.cliente_apellido}`
          );

        this.usuariosUnicos = [...new Set(this.usuariosConTickets)];

        // console.log("Los usuarios con tickets son: ", this.usuariosConTickets)

        this.aplicarFiltro();
        // console.log('Respuesta completa del backend:', this.todosLosElementos);
      },
      error: (error) => {
        console.error('Error al cargar tickets:', error);
      },
    });
  }

  aplicarFiltro() {
    console.log('Filtro actual:', this.filtro);

    if (this.filtro === 'todos') {
      this.ticketsCerrados = this.todosLosElementos.filter(
        (t) => t.estado === 'CERRADO'
      );
      // console.log('Filtro actual:', this.filtro);
    } else {
      this.ticketsCerrados = this.todosLosElementos.filter(
        (t) =>
          t.estado === 'CERRADO' &&
          `${t.cliente_nombre} ${t.cliente_apellido}` === this.filtro
      );
      // console.log('Filtro actual:', this.filtro);
    }

    this.calcularPaginacion();
    this.actualizarVista();
  }

  abrirModal(item: any) {
    this.ticketSeleccionado = item;
    // console.log('Ticket seleccionado:', item);
    const modal = new (window as any).bootstrap.Modal(
      document.getElementById('exampleModal')
    );
    modal.show();
  }

  calcularPaginacion() {
    this.totalPaginas = Math.ceil(
      this.ticketsCerrados.length / this.elementosPorPagina
    );
    this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  actualizarVista() {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    this.elementosMostrados = this.ticketsCerrados.slice(inicio, fin);
  }

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
      this.actualizarVista();
    }
  }
}
