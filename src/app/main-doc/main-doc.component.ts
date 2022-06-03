import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth } from '@angular/fire/auth';
import Doc from '../interfaces/doc.interface';

@Component({
  selector: 'app-main-doc',
  templateUrl: './main-doc.component.html',
  styleUrls: ['./main-doc.component.css']
})
export class MainDocComponent implements OnInit {
  email:any="";
  phone:any="";

  doctorActual:Doc|any={ //Esta variable guarda todos los datos que estan en la base de datos del doctor que se conecta
    name:"",  
    lastName:"",
    email:"",
    password:"",
    phone:"",
    cedule:""
  };
  constructor(private firebaseService:FirebaseService, private router:Router, public auth:Auth) { }
//Recuperamos los datos del doctor que ingresó, ya sea si ingreso por email o por SMS
//Esos datos se quedan almacenados en usuarioActual
  ngOnInit(): void {
      
      this.email=this.auth.currentUser?.email; //Obtener el correo del usuario actual, con el cual podemos obtener el resto de datos
      this.firebaseService.getDoc(this.email)
      .then(response => {
        response.forEach((doc) => {
          this.doctorActual = doc.data();
        });
      })
      .catch(error => console.log(error));

      console.log(this.auth.currentUser?.phoneNumber);
      this.phone = this.auth.currentUser?.phoneNumber;
      this.firebaseService.getDocPhone(this.phone)
      .then(response => {
        response.forEach((doc) => {
          this.doctorActual = doc.data();
        });
      })
      .catch(error => console.log(error));
  }

  onClick(){
    this.firebaseService.logout()
      .then(() =>{
        this.router.navigate(['/home']);
      })
  }

}
