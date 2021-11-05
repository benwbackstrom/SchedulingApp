import { Component, OnInit } from '@angular/core';
import { ApptTransferService } from 'src/app/services/appt-transfer.service';
import { Appointment } from 'src/app/models/appointment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  public informationForm!: FormGroup;
  appointment:Appointment = new Appointment();
  appt:Appointment = new Appointment();

  constructor(public apptTransfer:ApptTransferService, private formBuilder: FormBuilder, public router:Router) {  
    this.appointment = apptTransfer.getAppt();
  }

  ngOnInit(): void {
    this.informationForm = this.formBuilder.group({
      firstName: [this.appointment.firstName, Validators.required],
      lastName: [this.appointment.lastName, Validators.required],
      email: [this.appointment.email, Validators.required],
      phoneNumber: [this.appointment.phoneNumber, [Validators.required, Validators.pattern(/^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g)]],
      location: [{value:this.appointment.location, disabled:true}],
      date: [{value:this.appointment.date, disabled:true}],
      time: [{value:this.appointment.time, disabled:true}]
    })
  }

  submitForm(){
    console.log(this.appointment); //need an http service to submit this, maybe
  }

  navToMap(){
    //send http .post
    console.log("navToMap called");
  }
  
  navToCalendar(){
    //send http .post
    console.log("navToCalendar called");
  }
}
