import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/ITicket';
import { IUsuario } from '../interfaces/IUsuario';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _url = 'http://localhost:3000';

  constructor(private _httpClient: HttpClient) {}

  public getData(): Observable<ApiResponse> {
    return this._httpClient.get<ApiResponse>(this._url);
  }
  public getUsers(): Observable<IUsuario[]> {
    return this._httpClient.get<IUsuario[]>(`${this._url}/users`);
  }
}
