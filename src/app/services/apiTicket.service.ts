import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketModel } from '../models/Ticket'
import { EstadoTicket } from '../enums/EstadoTicket';

@Injectable({
    providedIn: 'root'
})
export class ApiTicketService {
    private url = 'http://localhost:3000/';

    constructor(private httpClient: HttpClient) { }

    public getAllTickets(): Observable<TicketModel[]> {
        return this.httpClient.get<TicketModel[]>(this.url + 'menu/dashboard-soporte');
    }

    public getAllAsignedTickets(): Observable<TicketModel[]> {
        return this.httpClient.get<TicketModel[]>(this.url + 'menu/dashboard-soporte/asignedTickets');
    }

    public getAllUnasignedTickets(): Observable<TicketModel[]> {
        return this.httpClient.get<TicketModel[]>(this.url + 'menu/dashboard-soporte/unasignedTickets');
    }

    public getTicketById(id: string): Observable<TicketModel> {
        return this.httpClient.get<TicketModel>(this.url + 'menu/dashboard-soporte/' + id);
    }

    public setTecnico(idTecnico: number, idTicket: number | undefined): Observable<TicketModel> {
        return this.httpClient.put<TicketModel>(`${this.url}tecnico/${idTecnico}/${idTicket}`, {});
    }
}