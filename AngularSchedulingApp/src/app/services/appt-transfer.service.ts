import { Injectable } from '@angular/core';
import { Appointment } from '../models/appointment';
import { DateTimeRange } from '../models/date-time-range';

@Injectable({
  providedIn: 'root'
})
export class ApptTransferService {
  
  private appointment:Appointment = new Appointment();
  private desiredDateTimeRange:DateTimeRange = new DateTimeRange(); 

  constructor() { }

  setApptLocation(location:string): void{
    this.appointment.location = location;
  }
  
  setApptDate(date:string): void{
    this.appointment.date = date;
  }

  setApptTime(time:number): void{
    this.appointment.time = time;
  }

  setAppt(appointment:Appointment): void{
    this.appointment = appointment;
  }

  getAppt(): Appointment{
    return this.appointment;
  }

  // date-time-range functions
  getStartDate(): Date {
    return this.desiredDateTimeRange.startDate;
  }
  getEndDate(): Date {
    return this.desiredDateTimeRange.endDate;
  }
  getStartTime(): number {
    return this.desiredDateTimeRange.startTime;
  }
  getEndTime(): number {
    return this.desiredDateTimeRange.endTime;
  }
  setDesiredDateTimeRange(desiredDateTimeRange: DateTimeRange): void {
    this.desiredDateTimeRange = desiredDateTimeRange;
  }
  getDesiredDateTimeRange(): DateTimeRange {
    return this.desiredDateTimeRange;
  }
}
