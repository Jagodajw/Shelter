import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumGenderPipe',
})
export class EnumGenderPipe implements PipeTransform {
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
