import { Component, OnInit } from '@angular/core';
import { ChartDataset, Color, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { EstudiosService } from '../services/estudios.service';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import Estudio from '../interfaces/estudios.interface';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {

  estudiosCon: any = "";
  estudiosSin: any = "";
  misEstudios:Estudio[] = [];
  misEstudiosS:Estudio[] = [];
  estudiosDisponibles:any[]=[];
  estudiosNoDisponibles:any[]=[];
  aux:Estudio;

  /* Variables para Chart  */
  barChartData: ChartDataset[] = [
    { data: [this.misEstudios.length], label: 'Estudios con Doctor.' },
    { data: [this.estudiosSin], label: 'Estudios sin Doctor' },
  ];

  barChartLabels: BaseChartDirective["labels"] = ['Estudios'];

  barChartOptions = { responsive: true};
  barChartColors: Color[] = [];
  barChartLegend = true;
  barChartPluggins = [];
  barChartType: ChartType = 'bar';

  constructor(
    public miServicio:EstudiosService,
    private firebaseService:FirebaseService, 
    private router:Router, 
    public auth:Auth) { }

  ngOnInit(): void {
    this.firebaseService.getPlazas("1").then(response => { response.forEach((plaza) => {
      this.estudiosDisponibles.push(plaza.data());
    });
  }).catch(error => console.log(error));
    
    this.firebaseService.getPlazas("0").then(response => { response.forEach((plaza) => {
    this.estudiosNoDisponibles.push(plaza.data());
  });
  }).catch(error => console.log(error));

  /* this.getData(); */
}
    
/* window.onLoad = function{
  getData();
} */

  getData(){

    /* Disponibles */
    for (let index = 0; index < this.estudiosDisponibles.length; index++) {
      this.estudiosDisponibles[index]=this.estudiosDisponibles[index].idEstudio;
    }
    for (let index = 0; index < this.estudiosDisponibles.length; index++) {
      this.aux = this.miServicio.getEstudios(this.estudiosDisponibles[index]);
      this.misEstudios.push(this.aux);
      this.estudiosCon++;
    }
    console.log(this.misEstudios)
    console.log("tam: "+this.misEstudios.length)

    /* No disponibles */
    for (let index = 0; index < this.estudiosNoDisponibles.length; index++) {
      this.estudiosNoDisponibles[index]=this.estudiosNoDisponibles[index].idEstudio;
    }
    for (let index = 0; index < this.estudiosNoDisponibles.length; index++) {
      this.aux = this.miServicio.getEstudios(this.estudiosNoDisponibles[index]);
      this.misEstudiosS.push(this.aux);
      this.estudiosSin++;
    }
    console.log(this.misEstudiosS)

    //Grafica
    this.barChartData = [
      { data: [this.misEstudios.length
      ], label: 'Estudios con Doctor' },
      { data: [this.misEstudiosS.length
      ], label: 'Estudios sin Doctor' },
    ];

  } //getData

}
