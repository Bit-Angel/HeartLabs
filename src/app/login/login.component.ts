import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { addDoc, collection, deleteDoc, doc, getDoc } from '@firebase/firestore';
import { collectionData, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  x:any;
  formulario: FormGroup;
  controlUnoIN:boolean;
  controlDosIN:boolean;

  constructor(private loginService: FirebaseService, private router: Router,private db:Firestore)  { 
    this.formulario = new FormGroup ({
        email: new FormControl(),
        password: new FormControl(),
      }) ;
      this.controlUnoIN=false;
  }

  ngOnInit(): void {
  }



  cambiarUno(NVar:boolean){
    if(NVar){//primer inp
      if(!this.controlUnoIN || this.formulario.value.email == ""){
          this.controlUnoIN = true;
        }else{
          this.controlUnoIN = false;
      }
    }else{
      if(!this.controlDosIN || this.formulario.value.password == ""){
        this.controlDosIN = true;
      }else{
        this.controlDosIN = false;
    }
    }
  }

  async onSubmit(){
    //Si es un usuario se va a su respectivo main
    this.loginService.getUser(this.formulario.value.email)
      .then(response => {
        response.forEach((doc) => {
          this.x = doc.data();
          console.log(this.x)
          console.log(doc.data());
          this.loginUser();
        });
      })
      .catch(error => console.log(error));
      //Si es un doctor se va a su respectivo main
      this.loginService.getDoc(this.formulario.value.email)
      .then(response => {
        response.forEach((doc) => {
          this.x = doc.data();
          console.log(this.x)
          console.log(doc.data());
          this.loginDoc();
        });
      })
      .catch(error => console.log(error));

      //Si es un usuario Root
      this.loginService.getRoot(this.formulario.value.email)
      .then(response => {
        response.forEach((root) => {
          this.x = root.data();
          console.log(this.x)
          console.log(root.data());
          this.router.navigate(['/mainRoot']);
        });
      })
      .catch(error => console.log(error));
  }

  async loginUser(){
    this.loginService.login(this.formulario.value)
    .then(response => {
      console.log(response);
      this.router.navigate(['/mainUser']);
    })
    .catch(error => console.log(error));
  }
  async loginDoc(){
    this.loginService.login(this.formulario.value)
    .then(response => {
      console.log(response);
      this.router.navigate(['/mainDoc']);
    })
    .catch(error => console.log(error));
  }
}
