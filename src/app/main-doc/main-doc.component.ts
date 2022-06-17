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

  reloj:Date = new Date;
  fecha:Date = new Date;
  frase: string ="";
  constructor(private firebaseService:FirebaseService, private router:Router, public auth:Auth) { 
     setInterval(() => {
    this.reloj = new Date;
  }, 1000);  
  }
//Recuperamos los datos del doctor que ingresó, ya sea si ingreso por email o por SMS
//Esos datos se quedan almacenados en usuarioActual
  ngOnInit(): void {
    this.frase = this.obtenerFrase();

 
    
      
      this.email=this.auth.currentUser?.email; //Obtener el correo del usuario actual, con el cual podemos obtener el resto de datos
      this.firebaseService.getDoc(this.email)
      .then(response => {
        response.forEach((doc) => {
          this.doctorActual = doc.data();
          localStorage.setItem('NombreUsuario', this.doctorActual.name || 'Doctor');
        });
      })
      .catch(error => console.log(error));

      this.phone = this.auth.currentUser?.phoneNumber;
      this.firebaseService.getDocPhone(this.phone)
      .then(response => {
        response.forEach((doc) => {
          localStorage.setItem('NombreUsuario', this.doctorActual.name || 'Doctor');
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

  obtenerFrase(){
    return this.ListaFrases[Math.floor(Math.random() * (10) + 1)];
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
