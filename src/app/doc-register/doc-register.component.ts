import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators  } from '@angular/forms';
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
  formulario: UntypedFormGroup;
  doctor:Doc;
  plazasDisponibles:any[]=[];
  nuevaPlaza:Plaza|any;
  pattern = /[0-9\+\-\ ]/;
  fname = false;
  flastname = false;
  femail=false;
  fpass=false;
  fphone=false;
  fcedula=false;
  fplaza=false;
  constructor(private regiserDoc: FirebaseService, private router: Router) { 
    this.formulario = new UntypedFormGroup ({
      name: new UntypedFormControl('', Validators.required),
      lastName: new UntypedFormControl('', Validators.required),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', [Validators.required,Validators.minLength(8)]),
      phone: new UntypedFormControl('', [ Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(12), Validators.maxLength(12)]),
      cedule: new UntypedFormControl('', Validators.required),
      plaza: new UntypedFormControl('', Validators.required)
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
          setTimeout(() => {
            this.router.navigate(['/rootDocs']); 
          }, 1500); 
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

  focusname(){
    this.fname = true;
  }
  focuslastname(){
    this.flastname = true;
  }
  focusemail(){
    this.femail=true;
  }
  focuspass(){
    this.fpass=true;
  }
  focusphone(){
    this.fphone=true;
  }
  focuscedula(){
    this.fcedula=true;
  }
  focusplaza(){
    this.fplaza=true;
  }

  todo(){
    this.fname = true;
    this.flastname = true;
    this.femail=true;
    this.fpass=true;
    this.fphone=true;
    this.fcedula=true;
    this.fplaza=true;
  }

}

export interface Plaza {
  id?:string
  idEstudio:string,
  plaza:string
}
