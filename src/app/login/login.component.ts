import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
} from '@firebase/firestore';
import { collectionData, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  x: any;
  formulario: UntypedFormGroup;

  constructor(
    private loginService: FirebaseService,
    private router: Router,
    private db: Firestore
  ) {
    this.formulario = new UntypedFormGroup({
      email: new UntypedFormControl(),
      password: new UntypedFormControl(),
    });
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    //Si es un usuario se va a su respectivo main
    this.loginService
      .getUser(this.formulario.value.email)
      .then((response) => {
        response.forEach((doc) => {
          this.x = doc.data();
          this.loginUser();
        });
      })
      .catch((error) => console.log(error));
    //Si es un doctor se va a su respectivo main
    this.loginService
      .getDoc(this.formulario.value.email)
      .then((response) => {
        response.forEach((doc) => {
          this.x = doc.data();
          this.loginDoc();
        });
      })
      .catch((error) => console.log(error));

    //Si es un usuario Root
    this.loginService
      .getRoot(this.formulario.value.email)
      .then((response) => {
        response.forEach((root) => {
          this.x = root.data();
          this.router.navigate(['/mainRoot']);
        });
      })
      .catch((error) => console.log(error));
  }

  async loginUser() {
    this.loginService
      .login(this.formulario.value)
      .then((response) => {
        localStorage.setItem('TipoUsuario', 'Usuario');
        this.router.navigate(['/mainUser']);
      })
      .catch((error) => console.log(error));
  }
  async loginDoc() {
    this.loginService
      .login(this.formulario.value)
      .then((response) => {
        localStorage.setItem('TipoUsuario', 'Doctor');
        this.router.navigate(['/mainDoc']);
      })
      .catch((error) => console.log(error));
  }
}
