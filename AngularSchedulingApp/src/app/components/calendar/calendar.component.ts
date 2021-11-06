import { getLocaleDateTimeFormat } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  selectedAppt:any = {};
  selectedTime:string = "";
  topTime:string = "time8";

  constructor(private router: Router) { }

  ngOnInit(): void {
    
    this.appointments.push( {"dow": this.getDOW(this.time1), "date": this.getMyDate(this.time1), times: [9, 9.5, 14, 15]});
    this.appointments.push( {"dow": this.getDOW(this.time2), "date": this.getMyDate(this.time2), times: [14, 15.5, 16.5, 17, 17.5]});
    this.appointments.push( {"dow": this.getDOW(this.time3), "date": this.getMyDate(this.time3), times: [14, 15.5, 16.5, 17, 17.5]});
    this.appointments.push( {"dow": this.getDOW(this.time4), "date": this.getMyDate(this.time4), times: []});
    this.appointments.push( {"dow": this.getDOW(this.time5), "date": this.getMyDate(this.time5), times: [14, 15.5, 16.5, 17, 17.5]});
    this.appointments.push( {"dow": this.getDOW(this.time6), "date": this.getMyDate(this.time6), times: [14, 15.5, 16.5, 17, 17.5]});
    this.appointments.push( {"dow": this.getDOW(this.time7), "date": this.getMyDate(this.time7), times: [14, 15.5, 16.5, 17, 17.5]});
  }

  ngAfterViewInit() {
    let element = document.getElementById(this.topTime);
    if(element){
      element.scrollIntoView();
    }
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

  numToTime(num:any):String{
    let time="";
    let ap = "am";
    if(num>12){
      ap="pm";
      num -= 12;
    }
    if(num%1 == 0){
      time = num + ":00";
    }
    else{
      time = Math.floor(num) + ":30";
    }
    return time+ap;
  }

  setTopTime(id:number){
    let num = Math.floor(id) - 1;
    if(num < 0){
      num = 0;
    }
    this.topTime = "time" + num;
  }

  selectBtn(appt:any, time:any):void{
    this.selectedAppt=appt;
    this.selectedTime = time;
  }
  
  isSelected(appt:any, time:any):boolean{
    return (time== this.selectedTime) && (appt == this.selectedAppt);
  }

  rightTime(id:any, time:any):boolean{
    return id == time;
  }

  nextPage():void{
    this.router.navigate(["confirm"]);
  }
}
