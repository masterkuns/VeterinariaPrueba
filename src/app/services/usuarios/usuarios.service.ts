import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private URL = "http://localhost:8082/usuario/";
  constructor(private httpClient: HttpClient) { }





  public getAllUsuarios(): Observable<any> {
    return this.httpClient.get(this.URL);
  }

  public saveUsuario(usuario: any): Observable<any> {
    return this.httpClient.post(this.URL, usuario);
  }

  public deleteUsuario(id: any): Observable<any> {
    return this.httpClient.delete(this.URL + "delete/" + id);
  }

  // public deletePersona(id): Observable<any> {
  //  return this.httpClient.delete(this.URL + "delete/" + id);
  // }


}
