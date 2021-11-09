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

  times = ["12am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"];
  tempApptTimes = [9, 9.5, 14, 15.5, 16.5, 17, 17.5];
  appointments:any = [];
  topTime:string = "time8";

  public animation:String = "slide-in";

  constructor(private router: Router, private transferService: ApptTransferService, private cs: CalendarserviceService) { }

  ngOnInit(): void {
    this.cs.getTimes().subscribe(
      (times:any)=>{
        console.log(times);
        let startD = this.transferService.getStartDate();
        let endD = this.transferService.getEndDate();
        let rangeD = this.getDateRange(startD, endD);
        let startT = this.transferService.getStartTime();
        this.setTopTime(startT);
        let endT = this.transferService.getEndTime();
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

    let startT = this.transferService.getStartTime();
    this.setTopTime(startT);

    // for(let i=0; i<rangeD.length; i++){
    //   let dow = this.getDOW(rangeD[i]);
      
    //   if(dow == "Sun" || dow == "Sat"){
    //     console.log(dow  + " " + apptTimes[0].times);
    //     this.appointments.push({"year": rangeD[i].getFullYear(), "dow": dow, "date": this.getMyDate(rangeD[i]), times: this.getTimesInRange(startT, endT, apptTimes[0])});
    //   }
    //   else if(dow == "Mon" || dow == "Wed" || dow == "Fri"){
    //     console.log(dow  + " " + apptTimes[1].times);
    //     this.appointments.push({"year": rangeD[i].getFullYear(), "dow": dow, "date": this.getMyDate(rangeD[i]), times: this.getTimesInRange(startT, endT, apptTimes[1])});
    //   }
    //   else{
    //     console.log(dow  + " " + apptTimes[2].times);
    //     this.appointments.push({"year": rangeD[i].getFullYear(), "dow": dow, "date": this.getMyDate(rangeD[i]), times: this.getTimesInRange(startT, endT, apptTimes[2])});
    //   }
    // }
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
      console.log(current);
        range.push(new Date (current));
        current.setDate(current.getDate() + 1);
    }
    return range;
  }

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
    this.animation = "slide-out";
    setTimeout(() => {this.router.navigate(['confirm']);}, 1000);
  }
}