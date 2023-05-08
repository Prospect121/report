import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterList',
})
export class FilterListPipe implements PipeTransform {
  transform(list: Array<any>, field: string, value: string): any[] {
    if (field === null || list === null) {
      return list;
    } else {
      return list.filter((item) => item[field] === value);
    }
  }
}
