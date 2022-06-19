import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'DoctorPipe', pure: false })
export class DoctorPipe implements PipeTransform {
  transform(value, args?): Array<any> { 
    const searchDoc = new RegExp(args, 'ig'); //regExp es para buscar

    if (value && value.length > 0) { //value=busqueda, si no hay nada que se regrese igual
      return value.filter((doctor) => {
        if (!args) { //si no se teclea nada se muestra todo
          return true;
        }
        if (doctor) { //si existe se nuestra, si lo que regresa es dif de -1 es que existen coincidencias
          return this.getFullName(doctor).search(searchDoc) !== -1;
        }
        return false;
      });
    }

    return value;
  }

  getFullName(data){ //juntalos strings
    return (data.name || '') + (data.lastName || '')
  }
}