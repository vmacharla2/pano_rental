import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMinrent'
})
export class FilterMinrentPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
