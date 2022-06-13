import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Chofer } from '../models/chofer';

@Injectable({
  providedIn: 'root'
})
export class ChoferesService {

  constructor(private readonly http: HttpClient) { }

  getChoferes() {
    return this.http.get(`${environment.apiChofer}`);
  }

  getChofer(id: any) {
    return this.http.get(`${environment.apiChofer}/${id}`);
  }

  editChofer(id: any, chofer: Chofer) {
    return this.http.put(`${environment.apiChofer}/${id}`, chofer)
  }

  postChofer(chofer: Chofer) {
    return this.http.post(`${environment.apiChofer}/signup`, chofer);
  }

  deleteChofer(id: number) {
    return this.http.delete(`${environment.apiChofer}/${id}`)
  }
}
