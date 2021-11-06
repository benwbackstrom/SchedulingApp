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
  appointment:Appointment = new Appointment();
  transComplete:boolean = false;

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

  submitForm(){                     //on sumbit adjust appointment object and send to confirm service
    console.log(this.appointment);                                    //temp log for troubleshooting
    this.appointment.booked = true;                               
    this.appointment.firstName = this.informationForm.controls['firstName'].value;
    this.appointment.lastName = this.informationForm.controls['lastName'].value;
    this.appointment.email = this.informationForm.controls['email'].value;
    this.appointment.phoneNumber = this.informationForm.controls['phoneNumber'].value;
    this.confirmServ.postAppt(this.appointment).subscribe(data => {
      console.log(data);                                              //temp log for troubleshooting
      this.transComplete = true;    //after http response, conclude appointment process
                                    //TODO add error handling and route to final view
    });
  }

  navToMap(){                       //route back to map component to select new location
    console.log("navToMap called");
  }
  
  navToCalendar(){                  //route back to calendar componenet to select new location
    console.log("navToCalendar called");
  }
}
