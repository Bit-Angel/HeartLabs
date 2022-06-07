import { Component, OnInit } from '@angular/core';
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
  reloj:Date = new Date;
  fecha:Date = new Date;
  frase: string ="";

  constructor(public auth:Auth) { 
    setInterval(() => {
      this.reloj = new Date;
    }, 1000);   
  }

  ngOnInit(): void {
    this.frase = this.obtenerFrase();
    localStorage.setItem('NombreUsuario', this.usuarioActual.name || 'Root');

    
    
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
