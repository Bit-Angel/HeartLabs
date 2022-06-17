import { Injectable } from '@angular/core';
import { collectionData, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from '@firebase/firestore';
import { Observable, retry } from 'rxjs';
import User from '../interfaces/user.interface';
import Doc from '../interfaces/doc.interface';
import Cita from '../interfaces/cita.interface';
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
  addCitaDB(cita:Cita){
    const placeRef = collection(this.firestore, 'citas'); 
    return addDoc(placeRef,cita);  
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
  getCitas(email:any, tipo:string){
    const placeRef = collection(this.firestore, 'citas');
    const q = query(placeRef, where(tipo,"==",email));
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
  getDocByEstudio(idEstudio:any){
    const placeRef = collection(this.firestore, 'doctors');
    const q = query(placeRef, where("plaza","==",idEstudio));
    return getDocs(q);
  }
  getPlazas(plaza:any){
    const placeRef = collection(this.firestore, 'estudios');
    const q = query(placeRef, where("plaza","==",plaza));
    return getDocs(q);
  }
  getPlazasByID(idEstudio:any){
    const placeRef = collection(this.firestore, 'estudios');
    const q = query(placeRef, where("idEstudio","==",idEstudio));
    return getDocs(q);
  }
  getAllUsers(tipo: string): Observable<User[]>{
    const placeRef = collection(this.firestore, tipo);
    return collectionData (placeRef, {idField: 'id'}) as Observable<User[]>;
  }
  getAllDoctors(tipo: string): Observable<Doc[]>{
    const placeRef = collection(this.firestore, tipo);
    return collectionData (placeRef, {idField: 'id'}) as Observable<Doc[]>;
  }

  updateUsuario(id:string, datos:any, tipo:string): Promise<any>{
    const placeRef = doc(this.firestore, `${tipo}/${id}`);
    return updateDoc(placeRef,datos);
  }

  updateResultado(id:string, datos:any): Promise<any>{
    const placeRef = doc(this.firestore, `citas/${id}`);
    return updateDoc(placeRef,datos);
  }

  deleteUsuario(id:any, tipo:string){
    const placeRef = doc(this.firestore, `${tipo}/${id}`);
    return deleteDoc(placeRef);
  }

  updatePlaza(nuevaPlaza:Plaza){
    const placeDocRef = doc(this.firestore, `estudios/${nuevaPlaza.id}`); 
    return setDoc(placeDocRef,nuevaPlaza);
  }
  logout() {
    return signOut(this.auth);
  }

}

export interface Plaza {
  id?:string
  idEstudio:string,
  plaza:string
}

