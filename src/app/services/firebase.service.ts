import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from '@firebase/firestore';
import { Observable, retry } from 'rxjs';
import User from '../interfaces/user.interface';
import Doc from '../interfaces/doc.interface';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup,GoogleAuthProvider,FacebookAuthProvider,GithubAuthProvider,RecaptchaVerifier} from '@angular/fire/auth'; //Servicio que permite integrar todos los metodos de Authentication

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore:Firestore ,private auth: Auth) { }

  addUserDB(user:User){
    const placeRef = collection(this.firestore, 'users'); //Creamos una colleccion. Funciona para hacer referencia a nuestra tabla
    return addDoc(placeRef,user);  //Retornamos el 'Doc', el cual contiene la insercion de datos. Hace la insercion a firestore
  }
  addDocDB(doctor:Doc){
    const placeRef = collection(this.firestore, 'doctors'); //Creamos una colleccion. Funciona para hacer referencia a nuestra tabla
    return addDoc(placeRef,doctor);  //Retornamos el 'Doc', el cual contiene la insercion de datos. Hace la insercion a firestore
  }

  addRegister(email:any,password:any){
    return createUserWithEmailAndPassword(this.auth,email,password);
  }

  login({email,password}:any){
    return signInWithEmailAndPassword(this.auth,email,password);
  }
  getUser(email:any){
    const placeRef = collection(this.firestore, 'users');
    const q = query(placeRef, where("email","==",email));
    return getDocs(q);
  }
  getDoc(email:any){
    const placeRef = collection(this.firestore, 'doctors');
    const q = query(placeRef, where("email","==",email));
    return getDocs(q);
  }
  getRoot(email:any){
    const placeRef = collection(this.firestore, 'root');
    const q = query(placeRef, where("email","==",email));
    return getDocs(q);
  }
  getUserPhone(phone:any){
    const placeRef = collection(this.firestore, 'users');
    const q = query(placeRef, where("phone","==",phone));
    return getDocs(q);
  }
  getDocPhone(phone:any){
    const placeRef = collection(this.firestore, 'doctors');
    const q = query(placeRef, where("phone","==",phone));
    return getDocs(q);
  }
  logout() {
    return signOut(this.auth);
  }
}



