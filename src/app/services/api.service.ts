import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITicket } from '../interfaces/ITicket';
import { IUsuario } from '../interfaces/IUsuario';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _url = 'http://localhost:3000';

  constructor(private _httpClient: HttpClient) { }

  public getData(): Observable<ITicket> {
    return this._httpClient.get<ITicket>(this._url);
  }
  public getUsers(): Observable<IUsuario[]> {
    return this._httpClient.get<IUsuario[]>(`${this._url}/users`);
  }
  public getTickets(): Observable<ITicket[]> {
    return this._httpClient.get<ITicket[]>(`${this._url}/tickets`);
  }

  // Partial para omitir algunas propiedades
  public crearTicket(ticket: Partial<ITicket>): Observable<any> {
    return this._httpClient.post<any>(`${this._url}/tickets`, ticket);
  }

}
