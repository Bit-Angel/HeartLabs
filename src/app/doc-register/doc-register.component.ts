import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import Doc from '../interfaces/doc.interface';
import { FirebaseService } from '../services/firebase.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-doc-register',
  templateUrl: './doc-register.component.html',
  styleUrls: ['./doc-register.component.css']
})
export class DocRegisterComponent implements OnInit {
  formulario: FormGroup;
  doctor:Doc;
  plazasDisponibles:any[]=[];
  nuevaPlaza:Plaza|any;
  pattern = /[0-9\+\-\ ]/;
  constructor(private regiserDoc: FirebaseService, private router: Router) { 
    this.formulario = new FormGroup ({
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,Validators.minLength(8)]),
      phone: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(12), Validators.maxLength(12)]),
      cedule: new FormControl('', Validators.required),
      plaza: new FormControl('', Validators.required)
      }) ;
  }

  ngOnInit(): void {
    this.regiserDoc.getPlazas("0")
    .then(response => {
      response.forEach((plaza) => {
        // this.plazasDisponibles.push(plaza.data());
        console.log(plaza.data());
        this.plazasDisponibles.push(plaza.data());
        console.log(this.plazasDisponibles)

      });
    })
    .catch(error => console.log(error));
  }
  onSubmit(){
     //verificamos formulario
     if (this.formulario.valid){
      //Añadimos usuario a la base de datos
      console.log(this.formulario.value);
      this.formulario.value.phone = `+${this.formulario.value.phone}`;

      this.doctor = this.formulario.value;
      console.log(this.doctor);
      this.regiserDoc.addDocDB(this.doctor)
        .then(response => {
          console.log(response);
          //si se guardan el doctor en la base de datos alertamos sobre ello
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Doctor añadido correctamente',
            showConfirmButton: false,
            timer: 1500
          })
          window.location.reload();
        })
        .catch(error => {
          console.log(error);
          //error de conexion
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error de conexion con la Base de Datos!'
          })
        });
      //Modificar plaza
      //obtenemos plaza a modificar
      this.regiserDoc.getPlazasByID(this.doctor.plaza)
        .then(response=>{
          response.forEach((plaza) => {
            // this.plazasDisponibles.push(plaza.data());
            console.log(plaza.id);
            this.nuevaPlaza=plaza.data();
            this.nuevaPlaza.plaza = '1'
            this.nuevaPlaza.id = plaza.id;
            this.actualizarPlaza()
          });
        })
        .catch(error => console.log(error));
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algunos Datos son incorrectos!'
        })
      }
  }



  actualizarPlaza(){
    console.log(this.nuevaPlaza)
    this.regiserDoc.updatePlaza(this.nuevaPlaza)
    .then(sus =>{
      this.AgregarDocAuth();
    })
     .catch(error => console.log(error));

  }

  AgregarDocAuth(){
    //Registramos el usuario en Firebase auth para que pueda hacer login
    this.regiserDoc.addRegister(this.doctor.email,this.doctor.password)
    .then(response => {
      console.log(response);
      this.router.navigate(['/login']);
    })
    .catch(error => console.log(error));
  }

}

export interface Plaza {
  id?:string
  idEstudio:string,
  plaza:string
}
