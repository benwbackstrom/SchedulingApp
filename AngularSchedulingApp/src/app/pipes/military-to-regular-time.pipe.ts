import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'militaryToRegularTime'
})
export class MilitaryToRegularTimePipe implements PipeTransform {

  transform(value: number): string {
    let amOrPm = "AM";

    if (value > 12) {
      amOrPm = "PM";
      return `${value-12} ` + amOrPm;
    } else if (value == 12) {
      amOrPm = "PM";
      return `${value} ` + amOrPm;
    } else {
      return `${value} ` + amOrPm
    }
  }

}
