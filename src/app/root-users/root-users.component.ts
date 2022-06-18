import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import User from '../interfaces/user.interface';
import { FirebaseService } from '../services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root-users',
  templateUrl: './root-users.component.html',
  styleUrls: ['./root-users.component.css'],
})
export class RootUsersComponent implements OnInit {
  id: any;
  ListaDeUsuarios: User[];
  form: UntypedFormGroup;
  loading = false;

  searchText = ''

  constructor(private firebaseService: FirebaseService) {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(),
      lastName: new UntypedFormControl(),
      email: new UntypedFormControl(),
      password: new UntypedFormControl(),
      phone: new UntypedFormControl(),
      birthday: new UntypedFormControl(),
      sex: new UntypedFormControl(),
    });
  }//constructor

  ngOnInit(): void {
    setTimeout(() => {
      this.firebaseService.getAllUsers('users').subscribe((usuarios) => {
        this.ListaDeUsuarios = usuarios;
      });
      this.loading = true;
    }, 400);
  } //ng

  editarUsuario(unUsuario: User) {
    this.id = unUsuario.id;

    this.form.patchValue({
      name: unUsuario.name,
      lastName: unUsuario.lastName,
      email: unUsuario.email,
      phone: unUsuario.phone,
      birthday: unUsuario.birthday,
      sex: unUsuario.sex,
    });

    
  } //editar

  eliminarUsuario(unUsuario: User) {
    var idAux = unUsuario.id;

    Swal.fire({
      title: 'Estas seguro de eliminar este registro?',
      text: "No podras recuperarlo de nuevo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--c1)',
      cancelButtonColor: 'var(--c6)',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.firebaseService.deleteUsuario(idAux, 'users').then(() =>{
  
        }, error =>{
          console.log(error);
        });

        Swal.fire(
          'Eliminado!',
          'El registro ha sido eliminado',
          'success'
        )
      }
    })

  } //editar

 


  onSubmit(ID:any) {

    const UsuarioActualizado: any = {
      name: this.form.value.name,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      phone: this.form.value.phone,
      birthday: this.form.value.birthday,
      sex: this.form.value.sex
    };


    this.firebaseService.updateUsuario(ID, UsuarioActualizado, 'users').then(() =>{
      // agregar spinner
      this.form.reset();
      this.id = 0;
      // agregar alert de que fue actualizada
    }, error =>{
      console.log(error);
    });

  }//onsubmit

  generateFake(count: number): Array<number> {
    const indexes : any[] = [];
    for (let i = 0; i < count; i++) {
      indexes.push(i);
    }
    return indexes;
  }

} //class
