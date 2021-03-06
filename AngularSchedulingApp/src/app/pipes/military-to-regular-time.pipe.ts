import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'militaryToRegularTime'
})
export class MilitaryToRegularTimePipe implements PipeTransform {

  transform(value: number): string {
    let time="";
    let ap = "AM";
    
    if(value == undefined || value == NaN){
      return "";
    }
    // accounts for 12:01PM - 12:59PM
    if (value > 12 && value < 13) {
      ap="PM";

    } else if(value > 12) {
      ap="PM";
      value -= 12;
    }
    if (value == 12) {
      ap = "PM";
    }
    if (value == 0) {
      value = 12;
    }
    if (value % 1 == 0) {
      time = value + ":00";
    }
    else {
      time = Math.floor(value) + ":30";
    }
    return `${time} ${ap}`;
  }

}
