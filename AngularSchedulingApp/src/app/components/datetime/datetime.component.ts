import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { endDateValidator, startDateValidator } from 'src/app/directives/restricted-datetimes.directive';

@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.component.html',
  styleUrls: ['./datetime.component.css']
})
export class DatetimeComponent implements OnInit {

  public dateForm!: FormGroup;

  public showSelectEndDate: boolean = false;
  public showSelectStartTime: boolean = false;
  public showSelectEndTime: boolean = false;

  public currentDate: Date = new Date();

  public startDate: Date = new Date();
  public startTimes: number[] = [];
  public endTimes: number[] = [];

  // placeholder location start and end
  // would be using the selected location's start & end times
  public locationStartTime = 9;
  public locationEndTime = 17;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    // make form
    this.dateForm = this.formBuilder.group({
      // check if start date is today or later
      startDate: ['', [Validators.required, startDateValidator()]],

      // check if end date is start date or later
      endDate: ['', [Validators.required, endDateValidator(this.startDate)]],

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
        } else {
          // hide the other selectors
          this.showSelectEndDate = false;
          this.showSelectStartTime = false;
          this.showSelectEndTime = false;
          // reset the other inputs
          this.dateForm.get('endDate')?.reset();
        }

      } else {
        // hide the other selectors
        this.showSelectEndDate = false;
        this.showSelectStartTime = false;
        this.showSelectEndTime = false;
        // reset the other inputs
        this.dateForm.get('endDate')?.reset();
      }
    });

    // when endDate is changed, update the startTimes
    this.dateForm.get("endDate")?.valueChanges.subscribe(selectedValue => {
      // console.log("end date changed");
      // console.log(selectedValue);

      // clear start & end times
      this.dateForm.get('startTime')?.reset();
      this.dateForm.get('endTime')?.reset();
      this.showSelectStartTime = false;
      this.showSelectEndTime = false;

      if (selectedValue != null && selectedValue != "" && new Date(this.convertDateString(selectedValue)) >= this.currentDate) {
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
    console.log(`Starting date: ${this.dateForm.controls['startDate'].value}`);
    console.log(`Ending date: ${this.dateForm.controls['endDate'].value}`);
    console.log(`Starting time: ${this.dateForm.controls['startTime'].value}`);
    console.log(`Ending time: ${this.dateForm.controls['endTime'].value}`);
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
}
