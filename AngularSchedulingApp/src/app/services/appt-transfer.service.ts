import { Injectable } from '@angular/core';
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class ApptTransferService {
  
  private appointment:Appointment = new Appointment();

  constructor() { }

  setApptLocation(location:string): void{
    this.appointment.location = location;
  }
  
  setApptDate(date:string): void{
    this.appointment.date = date;
  }

  setApptTime(time:string): void{
    this.appointment.time = time;
  }

  setAppt(appointment:Appointment): void{
    this.appointment = appointment;
  }

  getAppt(): Appointment{
    return this.appointment;
  }
}
