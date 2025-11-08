import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { listaProductosMock } from './mock.prueba';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-dashboard-soporte',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-soporte.html',
  styleUrl: './dashboard-soporte.css'
})
export class DashboardSoporte {
  listaProductos = listaProductosMock;

  estadoModal = false;

  mostrarModal() {
    this.estadoModal = true;
  }

  cerrarModal() {
    this.estadoModal = false;
  }
}
