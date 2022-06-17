import { Component, OnInit, Input  } from '@angular/core';
import Estudio from '../interfaces/estudios.interface';
import { EstudiosService } from '../services/estudios.service';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Auth } from '@angular/fire/auth';
import User from '../interfaces/user.interface';
import Doc from '../interfaces/doc.interface';
import Cita from '../interfaces/cita.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-un-estudio',
  templateUrl: './un-estudio.component.html',
  styleUrls: ['./un-estudio.component.css']
})
export class UnEstudioComponent implements OnInit {
  @Input() estudio!: Estudio;
  fechaCita:string;
  formulario:boolean;
  email:any="";
  phone:any="";
  cita:Cita|any={
    nombreestudio:"",
    emailUser:"",
    emailDoc:"",
    idEstudio:"",
    fecha:"",
    price:0,
    resultado:""
  };
  doctor:Doc|any={ //Esta variable guarda todos los datos que estan en la base de datos del doctor que se conecta
    name:"",  
    lastName:"",
    email:"",
    password:"",
    phone:"",
    cedule:""
  };
  usuarioActual:User|any={ //Esta variable guarda todos los datos que estan en la base de datos del usuario que se conecta
    name:"",  
    lastName:"",
    email:"",
    password:"",
    phone:"",
    birthday:""
  };
  constructor(public estudiosService:EstudiosService, public activatedRoute:ActivatedRoute,public auth:Auth,private firebaseService:FirebaseService, private router: Router) {
    this.activatedRoute.params.subscribe ( params => {
      this.estudio=estudiosService.getUnEstudio(params['id']);
    })

   }

  ngOnInit(): void {
    //Obtener datos de usuario Actual
    this.email=this.auth.currentUser?.email; //Obtener el correo del usuario actual, con el cual podemos obtener el resto de datos
    this.firebaseService.getUser(this.email)
    .then(response => {
      response.forEach((doc) => {
        this.usuarioActual = doc.data();
        console.log(this.usuarioActual)
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
    //Obtener datos del doctor que reliza el actual estudio
    console.log(this.estudio.idEstudio);
    this.firebaseService.getDocByEstudio(this.estudio.idEstudio)
      .then(response =>{
        response.forEach((doc) => {
          this.doctor = doc.data();
          console.log(this.doctor)
        });
      })
      .catch(error => console.log(error));

  }

  agendarCita(){
    this.cita.nombreestudio = this.estudio.nombreEstudio;
    this.cita.fecha = this.fechaCita;
    this.cita.emailUser = this.usuarioActual.email;
    this.cita.emailDoc = this.doctor.email;
    this.cita.idEstudio = this.estudio.idEstudio;
    this.cita.price = this.estudio.precio;
    this.cita.resultado = 'En espera';
    console.log(this.cita);
    this.firebaseService.addCitaDB(this.cita)
    .then(response =>{
      Swal.fire('Su cita ha sido agendada correctamente');
      this.router.navigate(['/citas']); 
    })
    .catch(error => console.log(error));
      
  }

}
