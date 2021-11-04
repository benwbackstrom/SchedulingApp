import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Appointment } from 'src/app/models/appointment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public informationForm!: FormGroup;
  appointment: Appointment = new Appointment();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.informationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required], //Might have to validate if its a true email address
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g)]]
    })
  }

  submitForm(){
    this.appointment.firstName = this.informationForm.controls['firstName'].value;
    this.appointment.lastName = this.informationForm.controls['lastName'].value;
    this.appointment.email = this.informationForm.controls['email'].value;
    this.appointment.phoneNumber = this.informationForm.controls['phoneNumber'].value;

    console.log(this.appointment); //Here we will send the data to where it needs to go, and change views
  }

}
