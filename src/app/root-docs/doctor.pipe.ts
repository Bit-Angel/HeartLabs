import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'DoctorPipe', pure: false })
export class DoctorPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    const searchDoc = new RegExp(args, 'ig');

    if (value && value.length > 0) {
      return value.filter((doctor) => {
        if (!args) {
          return true;
        }
        if (doctor) {
          return this.getFullName(doctor).search(searchDoc) !== -1;
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