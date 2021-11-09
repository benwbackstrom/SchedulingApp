import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { DatetimeComponent } from './datetime.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('DatetimeComponent', () => {
  let component: DatetimeComponent;
  let fixture: ComponentFixture<DatetimeComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatetimeComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(DatetimeComponent);
      component = fixture.componentInstance;

      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid (empty inputs)', async () => {
    component.ngOnInit();

    component.dateForm.controls['startDate'].setValue('');
    component.dateForm.controls['endDate'].setValue('');
    component.dateForm.controls['startTime'].setValue('');
    component.dateForm.controls['endTime'].setValue('');

    expect(component.dateForm.valid).toBeFalsy();
  });

  it('form should be invalid (invalid inputs)', async () => {
    component.ngOnInit();

    component.dateForm.controls['startDate'].setValue('01/01/0001');
    component.dateForm.controls['endDate'].setValue('01/01/0001');
    component.dateForm.controls['startTime'].setValue('0');
    component.dateForm.controls['endTime'].setValue('0');

    expect(component.dateForm.valid).toBeFalsy();
  });

  it('form should be invalid (start date AFTER end date)', async () => {
    component.ngOnInit();

    component.dateForm.controls['startDate'].setValue('12/01/2021');
    component.dateForm.controls['endDate'].setValue('12/01/2020');
    component.dateForm.controls['startTime'].setValue('9');
    component.dateForm.controls['endTime'].setValue('11');

    expect(component.dateForm.valid).toBeFalsy();
  });

  it('form should be valid (start date ON end date)', async () => {
    component.ngOnInit();

    component.dateForm.controls['startDate'].setValue('12/01/2021');
    component.dateForm.controls['endDate'].setValue('12/01/2021');
    component.dateForm.controls['startTime'].setValue('9');
    component.dateForm.controls['endTime'].setValue('11');

    expect(component.dateForm.valid).toBeTruthy();
  });

  it('form should be valid (start date BEFORE end date)', async () => {
    component.ngOnInit();

    component.dateForm.controls['startDate'].setValue('12/01/2021');
    component.dateForm.controls['endDate'].setValue('12/02/2021');
    component.dateForm.controls['startTime'].setValue('8');
    component.dateForm.controls['endTime'].setValue('12');

    expect(component.dateForm.valid).toBeTruthy();
  });
});
