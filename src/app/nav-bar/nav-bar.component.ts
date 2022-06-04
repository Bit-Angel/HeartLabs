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
  nmbre: any;
  tipenmbre: any;
  @Input() NombreUsuario: any;
  @Input() TipoUsuario:string;

  constructor(private firebaseService:FirebaseService, private router:Router, public auth:Auth) {}

  ngOnInit(): void {
    this.llamadaBandera();

    //guardar el nombre y tipo en el local
    localStorage.setItem('NombreUsuario', this.NombreUsuario || '0');
    localStorage.setItem('TipoUsuario', this.TipoUsuario  || '0');
    this.nmbre =  localStorage.getItem('NombreUsuario');
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

  RevisarTipo(){
    alert(localStorage.getItem('TipoUsuario'));
    
    if(localStorage.getItem('TipoUsuario') == '1'){ //tipo usuario
      this.router.navigate(['/mainUser']);
    }
    if(localStorage.getItem('TipoUsuario') == '2'){ //tipo doctor
      this.router.navigate(['/mainDoc']);
    }
    if(localStorage.getItem('TipoUsuario') == '3'){ //tipo root
      this.router.navigate(['/mainRoot']);
    }

  }
}
