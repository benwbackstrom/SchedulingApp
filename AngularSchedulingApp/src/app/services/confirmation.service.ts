import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  private readonly postURL = "http://localhost:3000/appointments";

  constructor(private http:HttpClient) { }

  postAppt(appt:Appointment):Observable<any>{     //post appointment to server
    const httpheader = new HttpHeaders(           
      { 'Content-Type' : 'application/json' }     //header needed for json-server post
    );
    return this.http.post(this.postURL, appt, {headers: httpheader});
  }
}
