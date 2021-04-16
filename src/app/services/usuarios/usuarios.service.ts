import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private URL = "http://localhost:8082/usuarios"
  constructor(private httpClient: HttpClient) { }




  public getAllUsuarios(): Observable<any> {
    return this.httpClient.get(this.URL);
  }

  public savePersona(persona: any): Observable<any> {
    return this.httpClient.post(this.URL, persona);
  }

  // public deletePersona(id): Observable<any> {
  //  return this.httpClient.delete(this.URL + "delete/" + id);
  // }


}
