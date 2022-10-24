import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userRolesFormat'
})
export class UserRolesFormatPipe implements PipeTransform {

  transform(value: { [key: string]: string }): string {
    return Object.values(value).join(', ');
  }

}
