import { Component, OnInit } from '@angular/core';
import { WindowService } from '../services/window.service';
import * as firebase from '@angular/fire/auth';
import { Auth, RecaptchaVerifier, signInWithPhoneNumber } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {
  windowRef: any;
  verificationCode: string;
  user: any;
  datos:any;
  auxiliar:boolean;
  phone:string ="";
  usuario:string="";
  loader: boolean;

  constructor(private win:WindowService,private phoneService:FirebaseService,private auth:Auth,private router:Router) {
    this.loader =true;
   }

  ngOnInit(): void {
    this.windowRef = this.win.getwindowRef();
    console.log(this.windowRef);
    this.windowRef.recaptchaVerifier =  new RecaptchaVerifier('recaptcha-container',{'size': 'normal'},this.auth);
    this.windowRef.recaptchaVerifier.render();
    
    
    
  }
  //Con esta funcion primero verficamos que el numero exista en la base de daatos
  //Primero en la de usuarios y despues en la de doctores. 
  //Si existe mostramos el boton para que pueda enviar el codigo
  verificaNumero(){
    console.log( this.phone );
    this.phone = `+${this.phone}`;
    console.log( this.phone );
    this.phoneService.getUserPhone(this.phone)
    .then(response => {
      response.forEach((doc) => {
        this.datos = doc.data();
        console.log(this.datos)
        // console.log(doc.data());
        this.usuario="user";
        this.auxiliar=true;
      });
    })
    .catch(error => console.log(error));
    this.phoneService.getDocPhone(this.phone)
    .then(response => {
      response.forEach((doc) => {
        this.datos = doc.data();
        console.log(this.datos)
        // console.log(doc.data());
        this.usuario="doc";
        this.auxiliar=true;
      });
    })
    .catch(error => console.log(error));
  }
  sendLoginCode(){
    const appVerifier = this.windowRef.recaptchaVerifier;

    firebase.signInWithPhoneNumber(this.auth, this.phone, appVerifier)
            .then(result => {
                this.windowRef.confirmationResult = result;
            })
            .catch( error => console.log(error) );
  }

  verifyLoginCode(){
    this.windowRef.confirmationResult.confirm(this.verificationCode)
    .then( result => {
      this.user = result.user;
      if(this.usuario=="user"){
        this.router.navigate(['/mainUser']);
      }else{
         if(this.usuario=="doc"){
          this.router.navigate(['/mainDoc']);
        }
      }

})
.catch( error => console.log(error, "Incorrect code entered?"));

  }

}
