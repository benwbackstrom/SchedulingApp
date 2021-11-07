import { getLocaleDateTimeFormat } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApptTransferService } from 'src/app/services/appt-transfer.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, AfterViewInit  {

  time1 = new Date();
  time2 = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  time3 = new Date(new Date().getTime() + 2* 24 * 60 * 60 * 1000);
  time4 = new Date(new Date().getTime() + 3* 24 * 60 * 60 * 1000);
  time5 = new Date(new Date().getTime() + 4* 24 * 60 * 60 * 1000);
  time6 = new Date(new Date().getTime() + 5* 24 * 60 * 60 * 1000);
  time7 = new Date(new Date().getTime() + 6* 24 * 60 * 60 * 1000);

  times = ["12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"];
  appointments:any = [];
  topTime:string = "time8";

  constructor(private router: Router, private transferService: ApptTransferService, ) { }

  ngOnInit(): void {
    // let startD = this.transferService.getStartDate();
    // console.log("Start Date:" + startD);
    // let endD = this.transferService.getEndDate();
    // let rangeD = this.getDateRange(startD, endD);
    // let startT = this.transferService.getStartTime();
    // this.setTopTime(startT);
    // let endT = this.transferService.getEndTime();
    // let rangeT = this.getTimeRange(startT, endT);
    // for(let date in rangeD){
    //   console.log(date);
    //   console.log(typeof(date));
    //   // this.appointments.push({"year": date.getFullYear(), "dow": this.getDOW(date), "date": this.getMyDate(this.time1), times: [9, 9.5, 14, 15]});
    // }
    this.appointments.push( {"year": this.time1.getFullYear(), "dow": this.getDOW(this.time1), "date": this.getMyDate(this.time1), times: [9, 9.5, 14, 15]});
    this.appointments.push( {"year": this.time2.getFullYear(), "dow": this.getDOW(this.time2), "date": this.getMyDate(this.time2), times: [14, 15.5, 16.5, 17, 17.5]});
    this.appointments.push( {"year": this.time3.getFullYear(), "dow": this.getDOW(this.time3), "date": this.getMyDate(this.time3), times: [14, 15.5, 16.5, 17, 17.5]});
    this.appointments.push( {"year": this.time4.getFullYear(),"dow": this.getDOW(this.time4), "date": this.getMyDate(this.time4), times: []});
    this.appointments.push( {"year": this.time5.getFullYear(),"dow": this.getDOW(this.time5), "date": this.getMyDate(this.time5), times: [14, 15.5, 16.5, 17, 17.5]});
    this.appointments.push( {"year": this.time6.getFullYear(), "dow": this.getDOW(this.time6), "date": this.getMyDate(this.time6), times: [14, 15.5, 16.5, 17, 17.5]});
    this.appointments.push( {"year": this.time7.getFullYear(), "dow": this.getDOW(this.time7), "date": this.getMyDate(this.time7), times: [14, 15.5, 16.5, 17, 17.5]});
  }

  ngAfterViewInit() {
    let element = document.getElementById(this.topTime);
    if(element){
      element.scrollIntoView();
    }
  }

  getDateRange(start:Date, end:Date): any{
    let range = new Array();
    let current = start;
    while (current <= end) {
        range.push(new Date (current));
        current.setDate(current.getDate() + 1);
    }
    return range;
  }

  getTimeRange(start:number, end:number): any{
    let range = new Array();
    let current = start;
    while (current <= end) {
        range.push(new Date (current));
        current += .5;
    }
    return range;
  }

  getMyDate(data:Date): string{
    return data.getMonth() + "/" + data.getDate();
  }

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

  setTopTime(id:number){
    let num = Math.floor(id) - 1;
    if(num < 0){
      num = 0;
    }
    this.topTime = "time" + num;
  }

  rightTime(id:any, time:any):boolean{
    return id == time;
  }

  nextPage(time:any, appt:any):void{
    this.transferService.setApptDate(appt.date + "/"+appt.year);
    this.transferService.setApptTime(time);
    this.router.navigate(["confirm"]);
  }
}
