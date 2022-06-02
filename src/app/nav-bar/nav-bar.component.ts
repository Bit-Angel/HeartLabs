import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';
import User from '../interfaces/user.interface';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  bandera: boolean = true;
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

  constructor(private firebaseService:FirebaseService, private router:Router, public auth:Auth) {}

  ngOnInit(): void {
    this.llamadaBandera();

    this.email=this.auth.currentUser?.email; //Obtener el correo del usuario actual, con el cual podemos obtener el resto de datos
    this.firebaseService.getUser(this.email)
    .then(response => {
      response.forEach((doc) => {
        this.usuarioActual = doc.data();
      });
    })
    .catch(error => console.log(error));

    this.phone = this.auth.currentUser?.phoneNumber;
    this.firebaseService.getUserPhone(this.phone)
    .then(response => {
      response.forEach((doc) => {
        this.usuarioActual = doc.data();
        console.log(this.usuarioActual)
      });
    })
    .catch(error => console.log(error));


  }
  // andres@correo.com

  llamadaBandera(){
    //muestra u oculta la opcion de iniciar/cerrar sesion y opciones extra
    if (this.auth.currentUser == null) {
      this.bandera = true;
    } else {
      this.bandera = false;
    }
  }


  onClick() {
    this.firebaseService.logout().then(() => {
      this.llamadaBandera();
      this.router.navigate(['/home']);
    });
  }
}
