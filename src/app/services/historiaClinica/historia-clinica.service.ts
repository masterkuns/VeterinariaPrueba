import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {

  private URL = "http://localhost:8082/historia/";
  constructor(private httpClient: HttpClient) { }


  public getAllHistorias(): Observable<any> {
    return this.httpClient.get(this.URL);
  }
  public saveHistorias(historias: any): Observable<any> {
    return this.httpClient.post(this.URL, historias);
  }



  public deleteHistorias(id: any): Observable<any> {
    return this.httpClient.delete(this.URL + "delete/" + id);
  }
}
