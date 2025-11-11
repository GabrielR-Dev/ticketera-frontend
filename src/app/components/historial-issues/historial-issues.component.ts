import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITicket } from '../../interfaces/ITicket';
import { ApiService } from '../../services/api.service';
import { ApiResponse } from '../../interfaces/ITicket';
import { IUsuario } from '../../interfaces/IUsuario';

@Component({
  selector: 'app-historial-issues',
  imports: [CommonModule],
  templateUrl: './historial-issues.component.html',
  styleUrl: './historial-issues.component.css',
})
export class HistorialIssuesComponent {
  // todosLosElementos: ApiResponse[] = [];
  todosLosElementos: IUsuario[] = [];

  // 2. Variables para la paginación
  elementosPorPagina = 10;
  paginaActual = 1;
  elementosMostrados: any[] = [];
  totalPaginas = 1;
  paginas: number[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.apiService.getUsers().subscribe({
      next: (datos) => {
        console.log('Respuesta completa del backend:', datos);
        this.todosLosElementos = datos;
        this.calcularPaginacion();
        this.actualizarVista();
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
      },
    });
  }

  // cargarProductos() {
  //   this.apiService.getData().subscribe({
  //     next: (datos) => {
  //       console.log('Respuesta completa del backend:', datos);
  //       this.todosLosElementos = datos.data;
  //       this.calcularPaginacion();
  //       this.actualizarVista();
  //     },
  //     error: (err) => {
  //       console.error('Error al cargar productos:', err);
  //     },
  //   });
  // }

  // 3. Calcula el total de páginas y genera el array de números [1, 2, 3...]
  calcularPaginacion() {
    this.totalPaginas = Math.ceil(
      this.todosLosElementos.length / this.elementosPorPagina
    );
    this.paginas = Array.from({ length: this.totalPaginas }, (_, i) => i + 1);
  }

  // 4. Actualiza qué elementos se muestran según la página actual
  actualizarVista() {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    this.elementosMostrados = this.todosLosElementos.slice(inicio, fin);
    console.log('Elementos mostrados:', this.elementosMostrados);
  }

  // 5. Método llamado al hacer clic en un botón de página
  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;
      this.actualizarVista();
    }
  }
}
