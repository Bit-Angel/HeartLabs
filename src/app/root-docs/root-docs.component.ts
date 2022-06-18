import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { FirebaseService, Plaza } from '../services/firebase.service';
import Swal from 'sweetalert2';
import Doc from '../interfaces/doc.interface';


@Component({
  selector: 'app-root-docs',
  templateUrl: './root-docs.component.html',
  styleUrls: ['./root-docs.component.css']
})
export class RootDocsComponent implements OnInit {
  id: any;
  nuevaPlaza:Plaza|any;
  ListaDeUsuarios: Doc[];
  form: UntypedFormGroup;
  loading = false;

  constructor(private firebaseService: FirebaseService) {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(),
      lastName: new UntypedFormControl(),
      email: new UntypedFormControl(),
      phone: new UntypedFormControl(),
      cedule: new UntypedFormControl()
    });
  }//constructor

  ngOnInit(): void {
    setTimeout(() => {
      this.firebaseService.getAllDoctors('doctors').subscribe((usuarios) => {
        this.ListaDeUsuarios = usuarios;
      });
      this.loading = true;
    }, 400);
  } //ng

  editarUsuario(unUsuario: Doc) {
    this.id = unUsuario.id;
    
    this.form.patchValue({
      name: unUsuario.name,
      lastName: unUsuario.lastName,
      email: unUsuario.email,
      phone: unUsuario.phone,
      cedule: unUsuario.cedule
    });

    
  } //editar



  eliminarUsuario(unUsuario: Doc) {
    var idAux = unUsuario.id;
    this.ObtenerPlaza(unUsuario.plaza);

    
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
        this.ObtenerPlaza(unUsuario.plaza);
        this.firebaseService.deleteUsuario(idAux, 'doctors').then(() =>{
          //si se elimina, tambien actualizamos la plaza para que quede disponible para otro
          this.nuevaPlaza.plaza = '0';
          this.firebaseService.updatePlaza(this.nuevaPlaza)
          .then(sus =>{
          })
          .catch(error => console.log(error));
  
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

  } //borrar

 
  ObtenerPlaza(idPlaza:any){
    this.firebaseService.getPlazasByID(idPlaza)
    .then(response =>{
      response.forEach((plaza)=>{
        this.nuevaPlaza = plaza.data();
      });
    }, e =>{
      console.log(e);
    });
  }

  onSubmit(ID:any) {

    const UsuarioActualizado: any = {
      name: this.form.value.name,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      phone: this.form.value.phone,
      cedule: this.form.value.cedule
    };

    console.log(UsuarioActualizado);


    this.firebaseService.updateUsuario(ID, UsuarioActualizado, 'doctors').then(() =>{
      // agregar spinner
      this.form.reset();
      this.id = 0;

      //cerrar modal
      

      Swal.fire({
        title: 'Cambios realizados',
        text: "Usuario Actalizado",
        icon: 'success',
        confirmButtonColor: 'var(--c1)',
        confirmButtonText: 'Ok'
      })
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

}
