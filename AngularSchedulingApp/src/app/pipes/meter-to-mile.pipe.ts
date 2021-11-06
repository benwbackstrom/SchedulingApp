import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'meterToMile'
})
export class MeterToMilePipe implements PipeTransform {

  transform(value: number): number {
    return value/1609;
  }

}
