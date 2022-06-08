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
    birthday:"",
    sex:""
  };
  reloj:Date = new Date;
  fecha:Date = new Date;
  frase: string ="";

  constructor(private firebaseService:FirebaseService, private router:Router, public auth:Auth) { 
    setInterval(() => {
      this.reloj = new Date;
    }, 1000);    
    
  }
//Recuperamos los datos del usuario que ingresó, ya sea si ingreso por email o por SMS
//Esos datos se quedan almacenados en usuarioActual
  ngOnInit(): void {
    this.frase = this.obtenerFrase();
    
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




  obtenerFrase(){
    return this.ListaFrases[Math.floor(Math.random() * (10 - 0) + 1)];
  }


  ListaFrases: string[] = [
    " Persiste, si todo fuera fácil, cualquiera lo lograría.",
    " Deja de tener miedo a lo que puede salir mal, y emociónate por lo que puede salir bien.",
    " Nunca es demasiado tarde para hacer lo que amas.",
    " No siempre conseguimos lo que queremos, pero tarde o temprano la vida nos concede aquello que merecemos.",
    " Todas las mañanas, levántate con la idea de comerte el mundo.",
    " Tu futuro depende de lo que hagas hoy, no mañana.",
    " Si puedes soñarlo, puedes hacerlo.",
    " No te conformes con lo que necesitas, ¡ve a por lo que te mereces!.",
    " Cuando sientas que vas a rendirte, piensa en por qué empezaste.",
    " Pierde el miedo para que no pierdas oportunidades."
  ];


}
