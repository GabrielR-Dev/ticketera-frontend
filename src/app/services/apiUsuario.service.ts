import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiUsuarioService {
  private url = 'http://3.94.185.64/';

  constructor(private httpClient: HttpClient) {}

  public getAllUsers(): Observable<Usuario[]> {
    return this.httpClient
      .get<Usuario[]>(this.url + 'main/dashboard-soporte/detalle/usuarios')
      .pipe(map((data) => this.toLowerCaseKeys(data)));
  }

  public getUserById(id: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(
      this.url + 'main/dashboard-soporte/detalle/usuarios/' + id
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
