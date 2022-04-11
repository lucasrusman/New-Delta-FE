import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auto } from '../models/auto';
import { Booking } from '../models/booking';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private readonly http: HttpClient) {}
  getBookings() {
    return this.http.get(`${environment.apiBooking}`);
  }

  postBooking(booking: Booking) {
    return this.http.post(`${environment.apiBooking}/crear`, booking);
  }


  asignarAuto(id:number, auto : Auto){
    return this.http.post(`${environment.apiBooking}/asignar/${id}`, auto)
  }

  cancelar(idReserva: number){
    console.log(idReserva);
    return this.http.post(`${environment.apiBooking}/cancelar`, {idReserva});
  }

  completar(idReserva: number){
    console.log(idReserva);
    return this.http.post(`${environment.apiBooking}/completar`, {idReserva});
  }
}
