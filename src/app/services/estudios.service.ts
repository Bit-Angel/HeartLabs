import { Injectable } from '@angular/core';
import Estudio from '../interfaces/estudios.interface';
import { ESTUDIOS } from '../ListaServicios';

@Injectable({
  providedIn: 'root'
})
export class EstudiosService {
  private estudios:Estudio[]= ESTUDIOS;
  constructor() { }

  getEstudio(): Estudio[]{
    return this.estudios;
  }

  getUnEstudio(posicion:number): Estudio{
    return this.estudios[posicion];
  }
  getEstudios(idEstudio){
    var aux=0;
    for (let index = 0; index < this.estudios.length; index++) {
      if(this.estudios[index].idEstudio==idEstudio){
        break;
      } 
      aux++;     
    }
    return this.estudios[aux];
  }
}
