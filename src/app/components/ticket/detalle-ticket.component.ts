import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiTicketService } from '../../services/apiTicket.service';
import { ApiUsuarioService } from '../../services/apiUsuario.service'

import { TicketModel } from '../../models/Ticket';
import { Usuario } from '../../models/Usuario';

@Component({
  selector: 'app-detalle-ticket',
  imports: [],
  templateUrl: './detalle-ticket.component.html',
  styleUrl: './detalle-ticket.component.css'
})
export class DetalleTicketComponent {
  constructor(
    private route: ActivatedRoute,
    private apiTicketService: ApiTicketService,
    private apiUsuarioService: ApiUsuarioService
  ) { }

  idTicket: string = '';
  ticket?: TicketModel;
  usuario?: Usuario;

  ngOnInit(): void {
    this.route.params.subscribe(
      {
        next: param => {
          this.idTicket = param['id'];
          this.apiTicketService.getTicketById(this.idTicket).subscribe(
            {
              next: data => {
                this.ticket = data;
              },
              error: (error) => {
                console.log(error)
              }
            }
          )
        }
      }
    )
    this.apiUsuarioService.getUserById(this.idTicket).subscribe(
      {
        next: data => {
          this.usuario = data;
          this.usuario.contraseña = '';
        },
        error: (error) => {
          console.log(error)
        }
      }
    )
  }
}
