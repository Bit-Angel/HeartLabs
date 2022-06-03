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
  plazasDisponibles:any[]=[];
  nuevaPlaza:Plaza|any;

  constructor(private regiserDoc: FirebaseService, private router: Router) { 
    this.formulario = new FormGroup ({
      name: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      phone: new FormControl(),
      cedule: new FormControl(),
      plaza: new FormControl()
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
    //Añadimos usuario a la base de datos
    console.log(this.formulario.value);
    this.formulario.value.phone = `+${this.formulario.value.phone}`;

    this.doctor = this.formulario.value;
    console.log(this.doctor);
    this.regiserDoc.addDocDB(this.doctor)
      .then(response => {
        console.log(response);
      })
      .catch(error => console.log(error));
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
