import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'UserPipe', pure: false })
export class UserPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    const searchText = new RegExp(args, 'ig');

    if (value && value.length > 0) {
      return value.filter((user) => {
        if (!args) {
          return true;
        }
        if (user) {
          return this.getFullName(user).search(searchText) !== -1;
        }
        return false;
      });
    }

    return value;
  }

  getFullName(data){
    return (data.name || '') + (data.lastName || '')
  }
}