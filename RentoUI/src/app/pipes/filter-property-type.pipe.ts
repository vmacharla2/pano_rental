import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPropertyType'
})
export class FilterPropertyTypePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
