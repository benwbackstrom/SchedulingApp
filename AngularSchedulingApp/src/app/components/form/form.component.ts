import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appointment } from 'src/app/models/appointment';
import { ApptTransferService } from 'src/app/services/appt-transfer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public informationForm!: FormGroup;
  appointment: Appointment = new Appointment();

  public animation:String = "slide-in";

  constructor(private formBuilder: FormBuilder, private transferService: ApptTransferService, private router: Router) { }

  ngOnInit(): void {
    this.informationForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/)]],
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]], //Might have to validate if its a true email address
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g)]]
    })
  }

  submitForm(): void {
    this.appointment.firstName = this.informationForm.controls['firstName'].value;
    this.appointment.lastName = this.informationForm.controls['lastName'].value;
    this.appointment.email = this.informationForm.controls['email'].value;
    this.appointment.phoneNumber = this.informationForm.controls['phoneNumber'].value;

    //console.log(this.appointment); //Debugging statement
    //Here we will send the data to where it needs to go, and change views

    this.transferService.setAppt(this.appointment); //gives our transfer service singleton the initial values

    //console.log(this.transferService.getAppt()); //Debugging statement
    
    this.animation = "slide-out";
    setTimeout(() => {this.router.navigate(['map']);}, 1000);
    //This will take us to the map component view
  }

}
