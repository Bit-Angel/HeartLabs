import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Doc from '../interfaces/doc.interface';
import { FirebaseService } from '../services/firebase.service';
@Component({
  selector: 'app-doc-register',
  templateUrl: './doc-register.component.html',
  styleUrls: ['./doc-register.component.css']
})
export class DocRegisterComponent implements OnInit {
  formulario: FormGroup;
  doctor:Doc;

  constructor(private regiserDoc: FirebaseService, private router: Router) { 
    this.formulario = new FormGroup ({
      name: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      phone: new FormControl(),
      cedule: new FormControl(),
      }) ;
  }

  ngOnInit(): void {
  }
  onSubmit(){
    //Añadimos usuario a la base de datos
    console.log(this.formulario.value);
    this.formulario.value.phone = `+${this.formulario.value.phone}`;

    this.doctor = this.formulario.value;
    console.log(this.doctor);
    // this.doctor.typeOfAnalisys = ["1","5"];
    // this.doctor.patients = ["angel@g.com","pepe@k.com"];
    this.regiserDoc.addDocDB(this.doctor)
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
    //Registramos el usuario en Firebase auth para que pueda hacer login
      this.regiserDoc.addRegister(this.doctor.email,this.doctor.password)
      .then(response => {
        console.log(response);
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));

  }

}
