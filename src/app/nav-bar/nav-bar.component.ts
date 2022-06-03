import { Component, Input, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  bandera: boolean = true;
  @Input() NombreUsuario: string;

  constructor(private firebaseService:FirebaseService, private router:Router, public auth:Auth) {}

  ngOnInit(): void {
    this.llamadaBandera();
  }
  // andres@correo.com

  llamadaBandera(){
    //muestra u oculta la opcion de iniciar/cerrar sesion y opciones extra
    if (this.auth.currentUser == null) {
      this.bandera = true;
    } else {
      this.bandera = false;
    }
  }

  onClick() {
    this.firebaseService.logout().then(() => {
      this.llamadaBandera();
      this.router.navigate(['/home']);
    });
  }
}
