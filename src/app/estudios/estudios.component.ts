import { Component, OnInit } from '@angular/core';
import Estudio from '../interfaces/estudios.interface';
import { EstudiosService } from '../services/estudios.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Auth } from '@angular/fire/auth';
@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css']
})
export class EstudiosComponent implements OnInit {

  misEstudios:Estudio[] = [];
  estudiosDisponibles:any[]=[];
  aux:Estudio;
  constructor(
    public miServicio:EstudiosService,
    private firebaseService:FirebaseService, 
    private router:Router, 
    public auth:Auth) { }

  ngOnInit(): void {

    setTimeout(() => {
      
        this.firebaseService.getPlazas("1")
        .then(response => {
          response.forEach((plaza) => {
            // this.plazasDisponibles.push(plaza.data());
            console.log(plaza.data());
            this.estudiosDisponibles.push(plaza.data());
            console.log(this.estudiosDisponibles)
          });
          this.obtenerEstudios();

        })
        .catch(error => console.log(error));

      }, 200);
     
  }

   obtenerEstudios(){

    for (let index = 0; index < this.estudiosDisponibles.length; index++) {
      this.estudiosDisponibles[index]=this.estudiosDisponibles[index].idEstudio;
    }
    for (let index = 0; index < this.estudiosDisponibles.length; index++) {
      this.aux = this.miServicio.getEstudios(this.estudiosDisponibles[index]);
      this.misEstudios.push(this.aux);

    }
    console.log(this.misEstudios)

  }

  /* Hay un método generateFake() para devolver una "matriz falsa" de los recuentos especificados. */
  generateFake(count: number): Array<number> {
    const indexes : any[] = [];
    for (let i = 0; i < count; i++) {
      indexes.push(i);
    }
    return indexes;
  }
  
}
