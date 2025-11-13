import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";

import { ApiTicketService } from '../../services/apiTicket.service';

import { TicketModel } from '../../models/Ticket';
import { EstadoTicket } from '../../enums/EstadoTicket';

@Component({
  selector: 'app-dashboard-soporte',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-soporte.html',
  styleUrl: './dashboard-soporte.css'
})
export class DashboardSoporte {
  constructor(
    private apiTicketService: ApiTicketService,
  ) { }

  listaTickets?: TicketModel[];

  ngOnInit(): void {
    this.apiTicketService.getAllTickets().subscribe(
      {
        next: data => {
          this.listaTickets = data;
        },
        error: (error) => {
          console.log(error)
        }
      }
    )
  }

  filtrarAsignado() {
    this.apiTicketService.getAllAsignedTickets().subscribe(
      {
        next: data => {
          this.listaTickets = data;
        },
        error: (error) => {
          console.log(error)
        }
      }
    )
  }

  filtrarNoAsignado() {
    this.apiTicketService.getAllUnasignedTickets().subscribe(
      {
        next: data => {
          this.listaTickets = data;
        },
        error: (error) => {
          console.log(error)
        }
      }
    )
  }

  asignarTicket(id: number | undefined) {
    const tecnico: number = 0;
    const ticket: number | undefined = id;

    this.apiTicketService.setTecnico(tecnico, ticket).subscribe(
      {
        next: tecnicoID => {
          console.log('ID del técnico asignado: ', tecnicoID);
        },
        error: error => {
          console.log('Error al asignar técnico', error)
        }
      }
    )
  }
}
