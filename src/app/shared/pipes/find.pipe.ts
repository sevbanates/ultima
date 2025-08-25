import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'find'
})
export class FindPipe implements PipeTransform {
  transform(items: any[], key: string, value: any): any {
    if (!items || !key || value === undefined || value === null) {
      return null;
    }
    return items.find(item => item[key] === value);
  }
}