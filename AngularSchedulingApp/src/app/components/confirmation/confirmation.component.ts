import { Component, OnInit } from '@angular/core';
import { ApptTransferService } from 'src/app/services/appt-transfer.service';
import { Appointment } from 'src/app/models/appointment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'src/app/services/confirmation.service';
import { MilitaryToRegularTimePipe } from 'src/app/pipes/military-to-regular-time.pipe';

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
  public emailStatus: number = 0;
  
  public animation:String = "slide-in";

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
      email: [this.appointment.email, [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      phoneNumber: [
        this.appointment.phoneNumber, 
        [Validators.required,                                         //phone number regex validation
         Validators.pattern(/^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g)]
      ],
      location: [{value:this.appointment.location, disabled:true}],
      date: [{value:this.appointment.date, disabled:true}],
      time: [{value:MilitaryToRegularTimePipe.prototype.transform(this.appointment.time), disabled:true}]
    });
    this.postError = false;
  }

  submitForm(){                     //on submit adjust appointment object and send to confirm service
    console.log(this.appointment);                                    //temp log for troubleshooting                               
    this.updateInitialFormInfo();
    this.appointment.booked = true;
    this.confirmationAppt();
    this.sendConfirmationEmail();  
  }

  confirmationAppt(): void{
    this.confirmServ.postAppt(this.appointment).subscribe(data => {                                         
      this.apptTransfer.setAppt(this.appointment);                 
      this.transComplete = true;                                                                                                                                                                                         
    }, error => {                 //if error, appt is not marked as booked. display message or redirect?
      this.appointment.booked = false;
      this.apptTransfer.setAppt(this.appointment);                                
      console.log(error);                                             
      this.postError = true;
    });
  }

  sendConfirmationEmail(): void{
    this.confirmServ.sendMail(this.appointment).subscribe(data => {
      this.emailStatus = 1;
      console.log("wth?");                                                                                                                                            
    }, error => {
      this.emailStatus = 2;                                  //TODO display message in summary that email didnt send         
      console.log(error);                                             
    });
  }

  navToMap(): void{
    this.updateInitialFormInfo();                  //route back to map component to select new location
    console.log("navToMap called");
    this.animation = "slide-out";
    setTimeout(() => {this.router.navigate(['map']);}, 1000);
  }
  
  navToDatetime(): void{
    this.updateInitialFormInfo();                  //route back to datetime component to select new date/time
    console.log("navToDatetime called");
    this.animation = "slide-out";
    setTimeout(() => {this.router.navigate(['datetime']);}, 1000);
  }

  updateInitialFormInfo(): void{
    this.appointment.firstName = this.informationForm.controls['firstName'].value;
    this.appointment.lastName = this.informationForm.controls['lastName'].value;
    this.appointment.email = this.informationForm.controls['email'].value;
    this.appointment.phoneNumber = this.informationForm.controls['phoneNumber'].value;
    this.apptTransfer.setAppt(this.appointment);
  }
}
