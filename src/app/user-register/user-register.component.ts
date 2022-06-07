import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import User from '../interfaces/user.interface';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  formulario: FormGroup;
  user: User;
  constructor(private regiserService: FirebaseService, private router: Router )  { 
    this.formulario = new FormGroup ({
      name: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      phone: new FormControl(),
      birthday: new FormControl(),
      sex: new FormControl()
      }) ;
  }

  ngOnInit(): void {
  }

  onSubmit(){
    //Añadimos usuario a la base de datos
    console.log(this.formulario.value);
    this.formulario.value.phone = `+${this.formulario.value.phone}`
    this.user = this.formulario.value;
    console.log(this.user);

    this.regiserService.addUserDB(this.user)
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
    //Registramos el usuario en Firebase auth para que pueda hacer login
      this.regiserService.addRegister(this.user.email,this.user.password)
      .then(response => {
        console.log(response);
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));

  }
}

