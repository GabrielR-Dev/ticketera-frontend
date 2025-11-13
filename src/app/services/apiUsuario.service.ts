import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario'

@Injectable({
    providedIn: 'root'
})
export class ApiUsuarioService {
    private url = 'http://localhost:3000/';

    constructor(private httpClient: HttpClient) { }

    public getAllUsers(): Observable<Usuario[]> {
        return this.httpClient.get<Usuario[]>(this.url + 'menu/dashboard-soporte/');
    }

    public getUserById(id:string): Observable<Usuario> {
        return this.httpClient.get<Usuario>(this.url + 'menu/dashboard-soporte/' + id);
    }
}