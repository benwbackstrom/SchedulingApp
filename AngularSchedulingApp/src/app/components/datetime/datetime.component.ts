import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { endDateValidator, startDateValidator } from 'src/app/directives/restricted-datetimes.directive';
import { DateTimeRange } from 'src/app/models/date-time-range';
import { ApptTransferService } from 'src/app/services/appt-transfer.service';

@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.component.html',
  styleUrls: ['./datetime.component.css']
})
export class DatetimeComponent implements OnInit {

  public dateForm!: FormGroup;

  // Object to hold the date and time range for transfer between components
  desiredDateTimeRange: DateTimeRange = new DateTimeRange(); 

  // bools to show/hide actual inputs over placeholder inputs
  public showSelectEndDate: boolean = false;
  public showSelectStartTime: boolean = false;
  public showSelectEndTime: boolean = false;

  // get the current date to restrict dates
  public currentDate: Date = new Date();

  public startDate: Date = new Date();

  // array to hold available times in the day an appointment can be selected
  public startTimes: number[] = [];
  public endTimes: number[] = [];

  // bool to fix invalid end time bug
  public validEndDate: boolean = false;

  // placeholder location start and end
  // would ideally be using the selected location's start & end times
  public locationStartTime = 9;
  public locationEndTime = 17;

  public animation:String = "slide-in";

  constructor(private formBuilder: FormBuilder, private router: Router, private transferService: ApptTransferService) { }

  ngOnInit(): void {
    // make form
    this.dateForm = this.formBuilder.group({
      // check if start date is today or later
      startDate: ['', [Validators.required, startDateValidator()]],

      // check if end date is start date or later
      endDate: ['', Validators.required],

      startTime: ['', Validators.required],

      // check if end time is after start time
      endTime: ['', Validators.required]
    });

    // remove time from currentDate to avoid issues when checking equality
    this.currentDate.setHours(0,0,0,0);

    // when startDate is changed, update the variable startDate so the endDate datepicker can be restricted (in the html)
    this.dateForm.get("startDate")?.valueChanges.subscribe(selectedValue => {
      // console.log("start date changed");
      // console.log(selectedValue);

      // date the user selected
      if (selectedValue != null && selectedValue != "") {
        this.startDate = new Date(this.convertDateString(selectedValue));
  
        // log for development purposes
        // console.log(this.startDate);
        
        if (this.startDate >= this.currentDate) {
          // enable the end time selector to be shown
          this.showSelectEndDate = true;
    
          // reset the end time in case the user is switching dates
          this.dateForm.get('endDate')?.reset();
          this.validEndDate = false;
        } else {
          // hide the other selectors
          this.showSelectEndDate = false;
          this.showSelectStartTime = false;
          this.showSelectEndTime = false;
          // reset the other inputs
          this.dateForm.get('endDate')?.reset();
          this.validEndDate = false;
        }

      } else {
        // hide the other selectors
        this.showSelectEndDate = false;
        this.showSelectStartTime = false;
        this.showSelectEndTime = false;
        // reset the other inputs
        this.dateForm.get('endDate')?.reset();
        this.validEndDate = false;
      }
    });

    // when endDate is changed, update the startTimes
    this.dateForm.get("endDate")?.valueChanges.subscribe(selectedValue => {
      // console.log("end date changed");
      // console.log(selectedValue);

      // validate end date with input start date
      if (selectedValue != null && selectedValue != "") {
        this.validEndDate = this.validateEndDate(this.startDate, new Date(this.convertDateString(selectedValue)) );
        if (!this.validEndDate) {
          this.dateForm.controls['endDate'].setErrors({ 'invalid': true });
        }
      }

      // clear start & end times
      this.dateForm.get('startTime')?.reset();
      this.dateForm.get('endTime')?.reset();
      this.showSelectStartTime = false;
      this.showSelectEndTime = false;

      if ( (selectedValue != null) && (selectedValue != "") && (new Date(this.convertDateString(selectedValue)) >= this.currentDate) && (this.validEndDate) ) {
        // set to valid
        this.dateForm.controls['endDate'].setErrors( null );
        // update starting times
        this.addStartTimes(this.locationStartTime, this.locationEndTime);
        // show starting times
        this.showSelectStartTime = true;
      } else {
        this.dateForm.get('startTime')?.reset();
        this.dateForm.get('endTime')?.reset();
        this.showSelectStartTime = false;
        this.showSelectEndTime = false;
      }
      
    });

    // when startTime is changed, update endTimes
    this.dateForm.get("startTime")?.valueChanges.subscribe(selectedValue => {
      // console.log("start time changed");
      // console.log(selectedValue);

      // clear end time
      this.dateForm.get('endTime')?.reset();
      
      this.addEndTimes(parseFloat(selectedValue), this.locationEndTime);
      this.showSelectEndTime = true;
    });
  }

  // submit just logs the data at the moment
  submitDateForm() {
    // validate all inputs first
    console.log("CURRENT INPUTS");
    console.log(this.dateForm.controls['startDate'].value);
    console.log(this.dateForm.controls['endDate'].value);
    console.log(this.dateForm.controls['startTime'].value);
    console.log(this.dateForm.controls['endTime'].value);

    if (!this.validateAllInput(this.dateForm.controls['startDate'].value, 
        this.dateForm.controls['endDate'].value, 
        this.dateForm.controls['startTime'].value, 
        this.dateForm.controls['endTime'].value)
    ) {
      console.log("Invalid Inputs!");
      return;
    }

    // log for testing purposes
    console.log("User Input Date: ")
    console.log(`Starting date: ${this.dateForm.controls['startDate'].value}`);
    console.log(`Ending date: ${this.dateForm.controls['endDate'].value}`);
    console.log(`Starting time: ${this.dateForm.controls['startTime'].value}`);
    console.log(`Ending time: ${this.dateForm.controls['endTime'].value}`);
    
    // set the model's fields using the form
    this.desiredDateTimeRange.setStartDate(this.dateForm.controls['startDate'].value.replace(/-/g,'/')); // string replace to convert MM-dd-YYYY to MM/dd/YYYY
    this.desiredDateTimeRange.setEndDate(this.dateForm.controls['endDate'].value.replace(/-/g,'/'));
    this.desiredDateTimeRange.setStartTime(this.dateForm.controls['startTime'].value);
    this.desiredDateTimeRange.setEndTime(this.dateForm.controls['endTime'].value);

    // set the model in the transfer service
    this.transferService.setDesiredDateTimeRange(this.desiredDateTimeRange);

    // log for testing purposes
    console.log("Transfer Service Data: ")
    console.log(this.transferService.getAppt());
    console.log(this.transferService.getDesiredDateTimeRange());

    // go to next page
    this.nextPage();
  }

  // adds start times to the respective select input
  addStartTimes(locationOpenTime:number, locationCloseTime:number) {
    // array of valid starting times
    let validStartTimes = [];
    for (let i = locationOpenTime; i < locationCloseTime; i+= 0.5) {
      validStartTimes.push(i)
    }
    this.startTimes = validStartTimes;
  }

  // adds end times to the respective select input
  addEndTimes(startTime:number, locationCloseTime:number) {

    let validEndTimes = [];

    // loop through and get the valid ending times
    for (let i = startTime+0.5; i <= locationCloseTime; i+= 0.5) {
      validEndTimes.push(i);
    }

    this.endTimes = validEndTimes;
  }

  // ===============================================
  // ===============================================

  // changes YYYY-MM-dd date formate to MM/dd/YYYY
  convertDateString(dateString:string) :string {
    let arr = dateString.split("-");
    return `${arr.splice(4,6)}/${arr.slice(6,8)}/${arr.slice(0,4)}`
  }

  nextPage():void{
    this.animation = "slide-out";
    setTimeout(() => {this.router.navigate(['calendar']);}, 1000);
  }

  // check if the end date is valid (fix for invalid end date bug)
  validateEndDate(startDate: Date, endDate: Date) :boolean {
    console.log("############# Validating End Date against Start Date");
    console.log("Start date: ");
    console.log(startDate);
    console.log("End date: ");
    console.log(endDate);
    console.log("########## Done Validating End Date against Start Date");
    return (startDate <= endDate);
  }

  validateAllInput(startDateString: string, endDateString: string, startTimeString: string, endTimeString: string): boolean {
    // create dates
    let startDate = new Date(this.convertDateString(startDateString));
    let endDate = new Date(this.convertDateString(endDateString));

    // check start date
    if (startDate == null) {console.log("start date is null"); return false;}
    if (startDate < this.currentDate) {console.log("start less than current date"); return false;}

    // check end date
    if (endDate == null) {console.log("end date is null"); return false;}
    if (!this.validateEndDate(startDate, endDate)) {console.log("end less than current date"); return false;}

    // create times
    let startTime = Number(startTimeString);
    let endTime = Number(endTimeString);

    // check start time
    if (startTime == null || startTime == 0 || startTime == NaN) {console.log("start time is null"); return false;}

    // check end time
    if (endTime == null || endTime == 0 || endTime == NaN) {console.log("end time is null"); return false;}
    if (startTime > endTime) {console.log("start time greater than end time"); return false;}

    return true;
  }
}
