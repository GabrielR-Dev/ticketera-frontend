import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketModel } from '../models/Ticket';
import { EstadoTicket } from '../enums/EstadoTicket';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiTicketService {
  private url = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) {}

  public getAllTickets(): Observable<TicketModel[]> {
    return this.httpClient.get<TicketModel[]>(
      this.url + 'main/dashboard-soporte/detalle'
    );
  }

  public getAllAsignedTickets(): Observable<TicketModel[]> {
    return this.httpClient.get<TicketModel[]>(
      this.url + 'main/dashboard-soporte/detalle'
    );
  }

  public getAllUnasignedTickets(): Observable<TicketModel[]> {
    return this.httpClient.get<TicketModel[]>(
      this.url + 'main/dashboard-soporte/detalle'
    );
  }

  public getTicketById(id: string): Observable<TicketModel> {
    return this.httpClient.get<TicketModel>(
      this.url + 'main/dashboard-soporte/detalle/' + id
    ).pipe(map(data => this.toLowerCaseKeys(data)));
  }

  public setTecnico(
    idTecnico: number,
    idTicket: number | undefined
  ): Observable<TicketModel> {
    return this.httpClient.put<TicketModel>(
      `${this.url}tecnico/${idTecnico}/${idTicket}`,
      {}
    );
  }

  private toLowerCaseKeys(obj: any): any {
    if (Array.isArray(obj)) {
      return obj.map((item) => this.toLowerCaseKeys(item));
    } else if (obj !== null && typeof obj === 'object') {
      return Object.keys(obj).reduce((acc: any, key: string) => {
        acc[key.toLowerCase()] = this.toLowerCaseKeys(obj[key]);
        return acc;
      }, {});
    }
    return obj;
  }
}
