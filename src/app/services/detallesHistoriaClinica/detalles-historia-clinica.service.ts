import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DetallesHistoriaClinicaService {
  private URL = "http://localhost:8082/detalles/";

  constructor(private httpClient: HttpClient) { }
  public getAllDetallesHistoriaClinica(): Observable<any> {
    return this.httpClient.get(this.URL);
  }

  public saveDetallesHistoriaClinica(detallles: any): Observable<any> {
    return this.httpClient.post(this.URL, detallles);
  }

  public deleteDetallesHistoriaClinica(id: any): Observable<any> {
    return this.httpClient.delete(this.URL + "delete/" + id);
  }


}
