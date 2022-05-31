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
  constructor(public miServicio:EstudiosService,private firebaseService:FirebaseService, private router:Router, public auth:Auth) { }

  ngOnInit(): void {
    this.firebaseService.getPlazas("1")
    .then(response => {
      response.forEach((plaza) => {
        // this.plazasDisponibles.push(plaza.data());
        console.log(plaza.data());
        this.estudiosDisponibles.push(plaza.data());
        console.log(this.estudiosDisponibles)
        this.obtenerEstudios();
      });
    })
    .catch(error => console.log(error));

   
     
  }

  async obtenerEstudios(){
    for (let index = 0; index < this.estudiosDisponibles.length; index++) {
      console.log(this.estudiosDisponibles[index].idEstudio);
      this.aux = this.miServicio.getEstudios(this.estudiosDisponibles[index].idEstudio);
      console.log(this.aux);
      this.misEstudios.push(this.aux);  
      console.log(this.misEstudios);
    }

  }

}
