import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth, User } from '@angular/fire/auth';
import Doc from '../interfaces/doc.interface';

@Component({
  selector: 'app-main-root',
  templateUrl: './main-root.component.html',
  styleUrls: ['./main-root.component.css']
})
export class MainRootComponent implements OnInit {

  tipoUser:string = '3';
  usuarioActual:User|any={ //Esta variable guarda todos los datos que estan en la base de datos del usuario que se conecta
    name:"",  
    lastName:"",
    email:"",
    password:"",
    phone:"",
    birthday:""
  };

  constructor(private firebaseService:FirebaseService, private router:Router, public auth:Auth) { }

  ngOnInit(): void {
    localStorage.setItem('NombreUsuario', this.usuarioActual.name || 'Root');
    
  }

  onClick(){
    this.firebaseService.logout()
      .then(() =>{
        this.router.navigate(['/home']);
      })
  }
}
