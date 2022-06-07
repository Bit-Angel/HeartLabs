import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-lateral-root',
  templateUrl: './barra-lateral-root.component.html',
  styleUrls: ['./barra-lateral-root.component.css']
})
export class BarraLateralRootComponent implements OnInit {

  constructor(private firebaseService:FirebaseService, private router:Router) { }

  ngOnInit(): void {
  }

  onClick(){
    this.firebaseService.logout()
      .then(() =>{
        this.router.navigate(['/home']);
      })
  }

}
