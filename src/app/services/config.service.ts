import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private readonly http: HttpClient) { }

  getConfig() {
    return this.http.get(`${environment.apiConfig}`);
  }

  editPrice(precioKm:number) {
    return this.http.put(`${environment.apiConfig}`, {precioKm})
  }
}
