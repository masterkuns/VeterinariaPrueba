import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {
  private URL = "http://localhost:8082/colaborador/";
  constructor(private httpClient: HttpClient) { }


  public getAllColaborador(): Observable<any> {
    return this.httpClient.get(this.URL);
  }

  public saveColaborador(colaborador: any): Observable<any> {
    return this.httpClient.post(this.URL, colaborador);
  }

  public deleteColaborador(id: any): Observable<any> {
    return this.httpClient.delete(this.URL + "delete/" + id);
  }

}
