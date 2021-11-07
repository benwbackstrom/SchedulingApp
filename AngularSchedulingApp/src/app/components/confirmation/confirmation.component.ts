import { Component, OnInit } from '@angular/core';
import { ApptTransferService } from 'src/app/services/appt-transfer.service';
import { Appointment } from 'src/app/models/appointment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'src/app/services/confirmation.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  public informationForm!: FormGroup;
  public appointment:Appointment = new Appointment();
  public transComplete:boolean = false;
  public postError: boolean = false;

  constructor(
    private apptTransfer:ApptTransferService,
    private formBuilder: FormBuilder,
    private router:Router,
    private confirmServ:ConfirmationService) {

    this.appointment = apptTransfer.getAppt();                        //get appointment data from transfer service
  }

  ngOnInit(): void {                                                  //on init, populate form with current                     
    this.informationForm = this.formBuilder.group({                   //appointment data. Location, date, time
      firstName: [this.appointment.firstName, Validators.required],   //disabled. Must return to map and/or
      lastName: [this.appointment.lastName, Validators.required],     //calendar feature to change
      email: [this.appointment.email, Validators.required],
      phoneNumber: [
        this.appointment.phoneNumber, 
        [Validators.required,                                         //phone number regex validation
         Validators.pattern(/^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g)]
      ],
      location: [{value:this.appointment.location, disabled:true}],
      date: [{value:this.appointment.date, disabled:true}],
      time: [{value:this.appointment.time, disabled:true}]
    });
  }

  submitForm(){                     //on submit adjust appointment object and send to confirm service
    console.log(this.appointment);                                    //temp log for troubleshooting                               
    this.updateInitialFormInfo();
    this.appointment.booked = true;
    this.confirmServ.postAppt(this.appointment).subscribe(data => {
      console.log(data);                                              //temp log for troubleshooting
      this.apptTransfer.setAppt(this.appointment);                 
      this.displaySummary();                                          
      this.sendConfirmationEmail();                                                                                                                                                 
    }, error => {                 //if error, appt is not marked as booked. display message or redirect?
      this.appointment.booked = false;
      this.apptTransfer.setAppt(this.appointment);                                
      console.log(error);                                             //temp log for troubleshooting
      this.postError = true;
    });
  }

  displaySummary(): void{
    this.transComplete = true;
    //display reformatting can go here otherwise maybe move above line back to submitForm
  }

  sendConfirmationEmail(): void{
    //looks like this will be an http request, but still looking into it
  }

  navToMap(): void{
    this.updateInitialFormInfo();                  //route back to map component to select new location
    console.log("navToMap called");
  }
  
  navToCalendar(): void{
    this.updateInitialFormInfo();                  //route back to calendar component to select new date/time
    console.log("navToCalendar called");
  }

  updateInitialFormInfo(): void{
    this.appointment.firstName = this.informationForm.controls['firstName'].value;
    this.appointment.lastName = this.informationForm.controls['lastName'].value;
    this.appointment.email = this.informationForm.controls['email'].value;
    this.appointment.phoneNumber = this.informationForm.controls['phoneNumber'].value;
    this.apptTransfer.setAppt(this.appointment);
  }
}
