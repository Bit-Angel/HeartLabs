import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth } from '@angular/fire/auth';
import Doc from '../interfaces/doc.interface';

@Component({
  selector: 'app-main-root',
  templateUrl: './main-root.component.html',
  styleUrls: ['./main-root.component.css']
})
export class MainRootComponent implements OnInit {

  constructor(private firebaseService:FirebaseService, private router:Router, public auth:Auth) { }

  ngOnInit(): void {
    
  }

  onClick(){
    this.firebaseService.logout()
      .then(() =>{
        this.router.navigate(['/home']);
      })
  }
}
