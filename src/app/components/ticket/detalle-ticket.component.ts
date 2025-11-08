import { Component } from '@angular/core';
import { TicketModel } from '../../models/Ticket';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-ticket',
  imports: [],
  templateUrl: './detalle-ticket.component.html',
  styleUrl: './detalle-ticket.component.css'
})
export class DetalleTicketComponent {
  constructor(private route: ActivatedRoute) {}
  
  ticket?: TicketModel;

  ngOnInit() {

  }
}
