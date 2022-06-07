import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Cita from '../interfaces/cita.interface';
import User from '../interfaces/user.interface';
import { EstudiosService } from '../services/estudios.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-lista-citas',
  templateUrl: './lista-citas.component.html',
  styleUrls: ['./lista-citas.component.css']
})
export class ListaCitasComponent implements OnInit {
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
