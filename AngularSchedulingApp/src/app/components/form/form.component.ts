import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public informationForm!: FormGroup;
  appointment = {
    firstName: '',
    lastName: '',
    email: ''
  };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.informationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required] //Might have to validate if its a true email address
    })
  }

  submitForm(){
    this.appointment.firstName = this.informationForm.controls['firstName'].value;
    this.appointment.lastName = this.informationForm.controls['lastName'].value;
    this.appointment.email = this.informationForm.controls['email'].value;
    
    console.log(this.appointment); //Here we will send the data to where it needs to go, and change views
  }

}
