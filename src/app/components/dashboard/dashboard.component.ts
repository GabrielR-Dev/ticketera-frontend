import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  
  ticketsCliente: any[] = [];
  ticketSeleccionado: any = null;

  elementosPorPagina = 5;
  paginaActual = 1;
  elementosMostrados: any[] = [];
  totalPaginas = 1;
  paginas: number[] = [];

  clienteIDActual: number = 3;
  clienteRol: string = 'CLIENTE';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarTicketsFiltrados();
  }

  cargarTicketsFiltrados(): void {
    this.apiService.getFilteredTickets(this.clienteIDActual, this.clienteRol).subscribe({
      next: (datos) => {
        this.ticketsCliente = Array.isArray(datos)
          ? datos.map((d: any) => ({
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
              cliente_nombre: d.ClienteNombre,
              cliente_apellido: d.ClienteApellido,
              cliente_email: d.ClienteEmail,
              cliente_rol: d.ClienteRol,
              adjuntos: [],
            }))
          : [];

        console.log('Tickets desde backend (filtrados):', this.ticketsCliente);

        this.calcularPaginacion();
        this.actualizarVista();
      },
      error: (err) => {
        console.error('Error al cargar tickets filtrados:', err);
      },
    });
  }

  abrirModal(ticket: any): void {
    this.ticketSeleccionado = ticket;
    const modal = new (window as any).bootstrap.Modal(
      document.getElementById('exampleModal')
    );
    modal.show();
  }

  calcularPaginacion(): void {
    this.totalPaginas = Math.ceil(
      this.ticketsCliente.length / this.elementosPorPagina
    );
    this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  actualizarVista(): void {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    this.elementosMostrados = this.ticketsCliente.slice(inicio, fin);
  }

  cambiarPagina(nuevaPagina: number): void {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
      this.actualizarVista();
    }
  }
}
