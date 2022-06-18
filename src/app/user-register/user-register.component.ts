import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import User from '../interfaces/user.interface';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  formulario: UntypedFormGroup;
  user: User;
  pattern = /[0-9\+\-\ ]/;
  fname = false;
  flastname = false;
  femail=false;
  fpass=false;
  fphone=false;
  ffecha=false;
  fsex= false;
  constructor(private regiserService: FirebaseService, private router: Router )  { 
    this.formulario = new UntypedFormGroup ({
      name: new UntypedFormControl('', Validators.required),
      lastName: new UntypedFormControl('', Validators.required),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', [Validators.required,Validators.minLength(8)]),
      phone: new UntypedFormControl('', [ Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(12), Validators.maxLength(12)]),
      birthday: new UntypedFormControl('', Validators.required),
      sex: new UntypedFormControl('', Validators.required)
      }) ;
  }

  ngOnInit(): void {
  }
  
  onSubmit(){
    //verificamos formulario
    if (this.formulario.valid){
      //Añadimos usuario a la base de datos
      console.log(this.formulario.value);
      this.formulario.value.phone = `+${this.formulario.value.phone}`
      this.user = this.formulario.value;
      console.log(this.user);

      this.regiserService.addUserDB(this.user)
        .then(response => {
          console.log(response);
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'usuario añadido correctamente',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch(error => {
          console.log(error)
          //error de conexion
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error de conexion con la Base de datos!'
          })
        });
        setTimeout(() => {
           //Registramos el usuario en Firebase auth para que pueda hacer login
            this.regiserService.addRegister(this.user.email,this.user.password)
            .then(response => {
              console.log(response);
              this.router.navigate(['/mainUser']);
            })
            .catch(error => console.log(error));
      }, 1500); 
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algunos Datos son incorrectos!'
      })
    }  
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
  focusfecha(){
    this.ffecha=true;
  }
  focussex(){
    this.fsex= true;
  }
  todo(){
    this.fname = true;
    this.flastname = true;
    this.femail=true;
    this.fpass=true;
    this.fphone=true;
    this.ffecha=true;
    this.fsex= true;
  }
}

