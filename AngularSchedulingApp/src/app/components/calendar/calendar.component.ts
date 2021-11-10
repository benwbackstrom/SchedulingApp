import { getLocaleDateTimeFormat } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApptTransferService } from 'src/app/services/appt-transfer.service';
import { CalendarserviceService } from 'src/app/services/calendarservice.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, AfterViewInit  {

  // times to hold all possible times, appointments to hold all possible appointments
  times = ["12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"];
  appointments:any = [];
  // topTime to know where to scroll to see the top of the time range given
  topTime:string = "time8";

  // to set the id of the card so that it knows to use the CSS slide-in when starting.
  public animation:String = "slide-in";

  constructor(private router: Router, private transferService: ApptTransferService, private cs: CalendarserviceService) { }

  ngOnInit(): void {
    // connected to CalendarService
    this.cs.getTimes().subscribe(
      (times:any)=>{
        // get date range based on data from transferService
        let startD = this.transferService.getStartDate();
        let endD = this.transferService.getEndDate();

        // set start and end date to today if none were provided
        if(startD == undefined){
          startD = new Date();
        }
        if(endD == undefined){
          endD = new Date();
        }
        let rangeD = this.getDateRange(startD, endD);

        // get start range based on data from transferService
        let startT = this.transferService.getStartTime();
        // start time is set to 9 if none is provided.
        if(startT == undefined){
          startT = 9;
        }
        this.setTopTime(startT);
        let endT = this.transferService.getEndTime();
        // end time is set to 5pm if none is provided
        if(endT == undefined){
          endT = 17;
        }

        //get the days in the date range, and get the appointment times each day has, push them to the appointments array
        for(let i=0; i<rangeD.length; i++){
            let dow = this.getDOW(rangeD[i]);
            if(dow == "Sun" || dow == "Sat"){
              this.appointments.push({"year": rangeD[i].getFullYear(), "dow": dow, "date": this.getMyDate(rangeD[i]), times: this.getTimesInRange(startT, endT, times[0].times)});
            }
            else if(dow == "Mon" || dow == "Wed" || dow == "Fri"){
              this.appointments.push({"year": rangeD[i].getFullYear(), "dow": dow, "date": this.getMyDate(rangeD[i]), times: this.getTimesInRange(startT, endT, times[1].times)});
            }
            else{
              this.appointments.push({"year": rangeD[i].getFullYear(), "dow": dow, "date": this.getMyDate(rangeD[i]), times: this.getTimesInRange(startT, endT, times[2].times)});
            }
        }
      }
    );

    // set top time so that the application knows where to scroll to see the top of the time range
    let startT = this.transferService.getStartTime();
    if(startT == undefined){
      startT = 9;
    }
    this.setTopTime(startT);
  }

  ngAfterViewInit() {
    // gets element to scroll to based on topTime
    let element = document.getElementById(this.topTime);
    if(element){
      element.scrollIntoView();
    }
  }

  // gets start and end date, returns the range of dates
  getDateRange(start:Date, end:Date): any{
    let range = new Array();
    let current = start;
    while (current <= end) {
      console.log(current);
        range.push(new Date (current));
        current.setDate(current.getDate() + 1);
    }
    return range;
  }

  // gets the start and end time, plus the appointment times available, and returns the appointment
  // times available that are within the range
  getTimesInRange(start:number, end:number, times:any): any{
    let range = new Array();
    for(let i = 0; i<times.length; i++){
      let current = times[i];
      if(current >= start && current <= end){
        range.push(current);
      }
    }
    return range;
  }

  // formats a Date object as a string MM/dd
  getMyDate(data:Date): string{
    return data.getMonth() + "/" + data.getDate();
  }

  // gets the day of the week based on a Date
  getDOW(dowData:Date): string{
    switch (dowData.getDay()) {
      case 0:
        return "Sun";
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
    }
    return "ERROR";
  }

  // creates a string which will be the id of the time at the top of the time range
  setTopTime(id:number){
    let num = Math.floor(id);
    if(num < 0){
      num = 0;
    }
    this.topTime = "time" + num;
  }

  // makes sure we only print the appointment in the schedule once
  rightTime(id:any, time:any):boolean{
    return id == time;
  }

  // functionality for when an appointment time is clicked.
  // sets appointment date and time, triggers animation, and then navigates to confirm page.
  nextPage(time:any, appt:any):void{
    this.transferService.setApptDate(appt.date + "/"+appt.year);
    this.transferService.setApptTime(time);
    this.animation = "slide-out";
    setTimeout(() => {this.router.navigate(['confirm']);}, 1000);
  }
}