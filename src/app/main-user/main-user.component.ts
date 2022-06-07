import { Component, OnInit, Input  } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Auth } from '@angular/fire/auth';
import User from '../interfaces/user.interface';

@Component({
  selector: 'app-main-user',
  templateUrl: './main-user.component.html',
  styleUrls: ['./main-user.component.css']
})
export class MainUserComponent implements OnInit {
  email:any="";
  phone:any="";
  tipoUser:string = '1';
  usuarioActual:User|any={ //Esta variable guarda todos los datos que estan en la base de datos del usuario que se conecta
    name:"",  
    lastName:"",
    email:"",
    password:"",
    phone:"",
    birthday:""
  };

  constructor(private firebaseService:FirebaseService, private router:Router, public auth:Auth) { 
    // localStorage.setItem('NombreUsuario', this.usuarioActual.name || 'Usuario');
    
  }
//Recuperamos los datos del usuario que ingresó, ya sea si ingreso por email o por SMS
//Esos datos se quedan almacenados en usuarioActual
  ngOnInit(): void {
    this.email=this.auth.currentUser?.email; //Obtener el correo del usuario actual, con el cual podemos obtener el resto de datos
    this.firebaseService.getUser(this.email)
    .then(response => {
      response.forEach((doc) => {
        this.usuarioActual = doc.data();
        localStorage.setItem('NombreUsuario', this.usuarioActual.name || 'Usuario');
      });
    })
    .catch(error => console.log(error));

    this.phone = this.auth.currentUser?.phoneNumber;
    this.firebaseService.getUserPhone(this.phone)
    .then(response => {
      response.forEach((doc) => {
        this.usuarioActual = doc.data();
      });
    })
    .catch(error => console.log(error));

    console.log("USUARIOO: " + this.usuarioActual.name);

  }

  
  onClick(){
    this.firebaseService.logout()
      .then(() =>{
        this.router.navigate(['/home']);
      })
  }
}
