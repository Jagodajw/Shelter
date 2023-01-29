import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumTypePersonPipe',
})
export class TypePersonPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'female':
        return 'gender.female';
      case 'male':
        return 'gender.male';
      default:
        return '-';
    }
  }
}
