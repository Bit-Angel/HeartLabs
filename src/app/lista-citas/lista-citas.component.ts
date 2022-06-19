import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import Cita from '../interfaces/cita.interface';
import User from '../interfaces/user.interface';
import { EstudiosService } from '../services/estudios.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-lista-citas',
  templateUrl: './lista-citas.component.html',
  styleUrls: ['./lista-citas.component.css'],
})
export class ListaCitasComponent implements OnInit {
  email: any = '';
  phone: any = '';
  usuarioActual: any = {
    //Esta variable guarda todos los datos que estan en la base de datos del usuario que se conecta
  };
  boolTipo: boolean = true; //true: user, false: doc;
  idsCitas:string[] = [];
  citas: any[] = [];
  //QR
  title = 'Qr';
  url = '';
  value = this.url;
  level = 'H';
  form: UntypedFormGroup;
  idCitaEditar: any;
  //termino de Qr

  constructor(
    public miServicio: EstudiosService,
    private firebaseService: FirebaseService,
    private router: Router,
    public auth: Auth
  ) {
    this.form = new UntypedFormGroup({
      resultado: new UntypedFormControl(),
    });
  }

  ngOnInit(): void {
    this.email = this.auth.currentUser?.email; //Obtener el correo del usuario actual, con el cual podemos obtener el resto de datos
    if (localStorage.getItem('TipoUsuario') == 'Doctor') {
      this.boolTipo = false;
      this.firebaseService
        .getDoc(this.email)
        .then((response) => {
          response.forEach((doc) => {
            this.usuarioActual = doc.data();
            this.obtenerCitas();
          });
        })
        .catch((error) => console.log(error));

      console.log(this.auth.currentUser?.phoneNumber);
      this.phone = this.auth.currentUser?.phoneNumber;
      this.firebaseService
        .getDocPhone(this.phone)
        .then((response) => {
          response.forEach((doc) => {
            this.usuarioActual = doc.data();
            console.log(this.usuarioActual);
            this.obtenerCitas();
          });
        })
        .catch((error) => console.log(error));
    } else {
      this.boolTipo = true;
      this.firebaseService
        .getUser(this.email)
        .then((response) => {
          response.forEach((doc) => {
            this.usuarioActual = doc.data();
            this.obtenerCitas();
          });
        })
        .catch((error) => console.log(error));

      console.log(this.auth.currentUser?.phoneNumber);
      this.phone = this.auth.currentUser?.phoneNumber;
      this.firebaseService
        .getUserPhone(this.phone)
        .then((response) => {
          response.forEach((doc) => {
            this.usuarioActual = doc.data();
            console.log(this.usuarioActual);
            this.obtenerCitas();
          });
        })
        .catch((error) => console.log(error));
    }
  }

  guardarResults(res: string) {
    Swal.fire({
      icon: 'info',
      title: 'Resultados de su estudio',
      text: res,
    });
  }

  editarResultados(citaModificar: Cita, i:string) {
    this.idCitaEditar = this.idsCitas[i];
    console.log('estoy imprimiendo: ' + this.idCitaEditar);
    this.form.patchValue({
      resultado: citaModificar.resultado,
    });
  }

  onSubmit(ID: any) {
    const resultadoActualizado: any = {
      resultado: this.form.value.resultado,
    };

    this.firebaseService.updateResultado(ID, resultadoActualizado).then(
      () => {
        // agregar spinner
        this.form.reset();
        this.idCitaEditar = 0;

        Swal.fire({
          title: 'Cambios realizados',
          text: 'Resultados Actualizados',
          icon: 'success',
          confirmButtonColor: 'var(--c1)',
          confirmButtonText: 'Ok',
        });
      },
      (error) => {
        console.log(error);
      }
    );
  } //onsubmit

  obtenerCitas() {
    console.log(this.usuarioActual.email);

    if (localStorage.getItem('TipoUsuario') == 'Doctor') {
      this.firebaseService
        .getCitas(this.usuarioActual.email, 'emailDoc')
        .then((response) => {
          response.forEach((cita) => {
            this.idsCitas.push(cita.id);
            this.citas.push(cita.data());
            console.log(this.citas);
            console.log(this.citas[0].id);
          });
        })
        .catch((error) => console.log(error));
    } else {
      this.firebaseService
        .getCitas(this.usuarioActual.email, 'emailUser')
        .then((response) => {
          response.forEach((cita) => {
            this.idsCitas.push(cita.id);
            this.citas.push(cita.data());
            console.log(this.citas);
            console.log(this.citas[0].id);
          });
        })
        .catch((error) => console.log(error));
    }
  }

  agregar_URL(nombre: any, id: any, precio: any, fecha: any) {
    this.url =
      'http://localhost:3000/' +
      id +
      '/' +
      nombre +
      '/' +
      precio +
      '/' +
      fecha +
      '/' +
      this.usuarioActual.name +
      '/' +
      this.usuarioActual.lastName;
    this.value = this.url;
  }

  abriracceso(nombre: any, id: any, precio: any, fecha: any) {
    window.open(
      'http://localhost:3000/' +
        id +
        '/' +
        nombre +
        '/' +
        precio +
        '/' +
        fecha +
        '/' +
        this.usuarioActual.name +
        '/' +
        this.usuarioActual.lastName,
      '_blank'
    );
  }
}
