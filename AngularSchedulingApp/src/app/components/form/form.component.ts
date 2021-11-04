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
      firstName: [this.appointment.firstName, Validators.required],
      lastName: [this.appointment.lastName, Validators.required],
      email: [this.appointment.email, Validators.required] //Might have to validate if its a true email address
    })
  }

  submitForm(){
    console.log('Hello!'); //Here we will send the data to where it needs to go, and change views
  }

}
