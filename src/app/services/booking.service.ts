import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Booking } from '../models/booking';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private readonly http: HttpClient) {}
  getBookings() {
    return this.http.get(`${environment.apiUrl}/productos`);
  }

  postBooking(booking: Booking) {
    console.log(booking);
    return this.http.post(`${environment.apiUrl}/productos`, booking);
  }
}
