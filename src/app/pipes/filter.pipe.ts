import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs';
import { Tblstud } from '../shared/tblstud.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, searchText: string) {
    if (value.length === 0 || searchText === '') {
      return value;
    }

    const resultArray = [];
    // console.log(searchText);
    for (let item of value) {
      if (item['name'].toLowerCase().includes(searchText.toLowerCase())) {
        resultArray.push(item);
      }
      if (item['gender'].toLowerCase().includes(searchText.toLowerCase())) {
        resultArray.push(item);
      }
      if (item['rno'].toLowerCase().includes(searchText.toLowerCase())) {
        resultArray.push(item);
      }
    }
    if (resultArray.length === 0) {
      return [-1] ;
    }
    return resultArray;
  }
}
