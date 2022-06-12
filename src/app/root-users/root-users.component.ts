import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import User from '../interfaces/user.interface';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-root-users',
  templateUrl: './root-users.component.html',
  styleUrls: ['./root-users.component.css'],
})
export class RootUsersComponent implements OnInit {
  id: any;
  ListaDeUsuarios: User[];
  form: FormGroup;
  loading = false;

  constructor(private firebaseService: FirebaseService) {
    this.form = new FormGroup({
      name: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      phone: new FormControl(),
      birthday: new FormControl(),
      sex: new FormControl(),
    });
  }//constructor

  ngOnInit(): void {
    setTimeout(() => {
      this.firebaseService.getAllUsers().subscribe((usuarios) => {
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


  onSubmit(ID:any) {

    const UsuarioActualizado: any = {
      name: this.form.value.name,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      phone: this.form.value.phone,
      birthday: this.form.value.birthday,
      sex: this.form.value.sex
    };

    this.firebaseService.updateUsuario(ID, UsuarioActualizado).then(() =>{
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
