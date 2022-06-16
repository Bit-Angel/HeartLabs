import { Component, OnInit } from '@angular/core';
import { ChartDataset, Color, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { EstudiosService } from '../services/estudios.service';
import { FirebaseService } from '../services/firebase.service';
import User from '../interfaces/user.interface';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {

  barChartData: ChartDataset[] = [
    { data: [12, 72, 78, 75, 17, 75], label: 'Estudios con Doctor.' },
    { data: [85, 12, 28, 75, 17, 75], label: 'Estudios sin Doctor' },
  ];

  barChartLabels: BaseChartDirective["labels"] = ['January', 'February', 'March', 'April', 'May', 'June'];

  barChartOptions = { responsive: true};
  barChartColors: Color[] = [];
  barChartLegend = true;
  barChartPluggins = [];
  barChartType: ChartType = 'bar';


  refresh(){

    this.barChartData = [
      { data: [Math.random() * (100 - 0) + 0,
        Math.random() * (100 - 0) + 0,
        Math.random() * (100 - 0) + 0,
        Math.random() * (100 - 0) + 0,
        Math.random() * (100 - 0) + 0,
        Math.random() * (100 - 0) + 0,
      ], label: 'Estudios con Doctor' },
      { data: [Math.random() * (100 - 0) + 0, 
        Math.random() * (100 - 0) + 0, 
        Math.random() * (100 - 0) + 0, 
        Math.random() * (100 - 0) + 0, 
        Math.random() * (100 - 0) + 0,
        Math.random() * (100 - 0) + 0
      ], label: 'Estudios sin Doctor' },
    ];
  }

  email:any="";
  phone:any="";
  usuarioActual:User|any={ //Esta variable guarda todos los datos que estan en la base de datos del usuario que se conecta
    name:"",  
    lastName:"",
    email:"",
    password:"",
    phone:"",
    birthday:""
  };
  citas:any[]=[];
  
  constructor(public miServicio:EstudiosService,private firebaseService:FirebaseService, private router:Router, public auth:Auth) { }

  ngOnInit(): void {
    this.email=this.auth.currentUser?.email; //Obtener el correo del usuario actual, con el cual podemos obtener el resto de datos
    this.firebaseService.getUser(this.email)
    .then(response => {
      response.forEach((doc) => {
        this.usuarioActual = doc.data();
        this.obtenerCitas();
      });
    })
    .catch(error => console.log(error));

    console.log(this.auth.currentUser?.phoneNumber);
    this.phone = this.auth.currentUser?.phoneNumber;
    this.firebaseService.getUserPhone(this.phone)
    .then(response => {
      response.forEach((doc) => {
        this.usuarioActual = doc.data();
        console.log(this.usuarioActual)
        this.obtenerCitas();
      });
    })
    .catch(error => console.log(error));


  }

  obtenerCitas(){
    console.log(this.usuarioActual.email);
    this.firebaseService.getCitas(this.usuarioActual.email)
    .then(response => {
      response.forEach((cita) => {
        this.citas.push(cita.data())
        console.log(this.citas);
      });
    })
    .catch(error => console.log(error));
  }

}
