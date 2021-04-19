import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
let headersReq = new HttpHeaders({
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Origin': '*'
});

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private URL = "https://veterinariaprueba.herokuapp.com/usuario/";
  constructor(private httpClient: HttpClient) { }





  public getAllUsuarios(): Observable<any> {
    return this.httpClient.get(this.URL, { headers: headersReq });
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
