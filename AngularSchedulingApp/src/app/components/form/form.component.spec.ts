import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
         FormComponent 
      ],
      imports: [
        BrowserModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(FormComponent);

      component = fixture.componentInstance; //test instance

      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the submitForm method', async () => {
    fixture.detectChanges();
    spyOn(component, 'submitForm');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.submitForm).toHaveBeenCalledTimes(0);
    //Test passes if the submitForm method is called 0 times as it should be disabled
  });

  it('form should be invalid', async () => {
    component.ngOnInit(); //Form gets built in the OnInit method, so we must call it

    //In this test, all form values are empty, so it should be invalid
    component.informationForm.controls['firstName'].setValue('');
    component.informationForm.controls['lastName'].setValue('');
    component.informationForm.controls['email'].setValue('');
    component.informationForm.controls['phoneNumber'].setValue('');

    expect(component.informationForm.valid).toBeFalsy();
    //Test passes if form is invalid
  })

  it('form should be valid', async () => {
    component.ngOnInit();

    //In this test, all form values will be valid, so the form should be valid
    component.informationForm.controls['firstName'].setValue('John');
    component.informationForm.controls['lastName'].setValue('Doe');
    component.informationForm.controls['email'].setValue('jdoe@gmail.com');
    component.informationForm.controls['phoneNumber'].setValue('1-234-567-8910');

    expect(component.informationForm.valid).toBeTruthy();
    //Test passes if the form is valid
  })

  it('should not allow incorrect phone number formats', async () => {
    component.ngOnInit();

    //In this test, all form values except the phone number will be valid, so the form should be invalid
    component.informationForm.controls['firstName'].setValue('John');
    component.informationForm.controls['lastName'].setValue('Doe');
    component.informationForm.controls['email'].setValue('jdoe@gmail.com');
    component.informationForm.controls['phoneNumber'].setValue('12345'); //This is not how a phone number looks

    expect(component.informationForm.valid).toBeFalsy();
    //Test passes if the form is invalid
  })

  it('should save the appointment when submitted', async () => {
    component.ngOnInit();
    component.informationForm.controls['firstName'].setValue('John');
    component.informationForm.controls['lastName'].setValue('Doe');
    component.informationForm.controls['email'].setValue('jdoe@gmail.com');
    component.informationForm.controls['phoneNumber'].setValue('1-234-567-8910');
    
    //we set up a valid form, and now we need to submit it
    component.submitForm();

    expect(component.appointment).toBeTruthy();
    //Test passes if the appointment is not undefined

  })

});
