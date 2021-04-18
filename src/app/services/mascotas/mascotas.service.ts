
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {
  private URL = "https://veterinariaprueba.herokuapp.com/mascota/";
  constructor(private httpClient: HttpClient) { }



  public getAllMascota(): Observable<any> {
    return this.httpClient.get(this.URL);
  }
  public saveMascota(mascota: any): Observable<any> {
    return this.httpClient.post(this.URL, mascota);
  }



  public deleteMascota(id: any): Observable<any> {
    return this.httpClient.delete(this.URL + "delete/" + id);
  }
}


