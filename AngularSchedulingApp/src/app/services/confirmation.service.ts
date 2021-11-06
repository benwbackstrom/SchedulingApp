import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  constructor(private http:HttpClient) { }

  postAppt(appt:Appointment):Observable<any>{     //post appointment to server
    const httpheader = new HttpHeaders(           //TODO move url to const variable
      { 'Content-Type' : 'application/json' }
    );
    return this.http.post("http://localhost:3000/appointments", appt, {headers: httpheader});
  }
}
