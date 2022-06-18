import { Component, OnInit } from '@angular/core';
import Estudio from '../interfaces/estudios.interface';
import { EstudiosService } from '../services/estudios.service';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AccessibilityService } from '../services/accessibility.service';
@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css']
})
export class EstudiosComponent implements OnInit {


  secondSize:Observable<number>
  firstSize:Observable<number>
  thirdSize:Observable<number>
  fourthSize:Observable<number>
  fifthSize:Observable<number>

  misEstudios:Estudio[] = [];
  estudiosDisponibles:any[]=[];
  aux:Estudio;
  constructor(
    public miServicio:EstudiosService,
    private firebaseService:FirebaseService, 
    private router:Router, 
    public auth:Auth ,private accessibility:AccessibilityService) {
      this.secondSize = this.accessibility._size
      this.firstSize = this.accessibility._size2
      this.thirdSize = this.accessibility._size3
      this.fourthSize = this.accessibility._size4
      this.fifthSize = this.accessibility._size5
    }

  ngOnInit(): void {

    setTimeout(() => {
      
        this.firebaseService.getPlazas("1")
        .then(response => {
          response.forEach((plaza) => {
            // this.plazasDisponibles.push(plaza.data());
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
