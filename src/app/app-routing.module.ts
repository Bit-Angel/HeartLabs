import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegisterComponent } from './user-register/user-register.component';
import { DocRegisterComponent } from './doc-register/doc-register.component';
import { LoginComponent } from './login/login.component';
import { MainUserComponent } from './main-user/main-user.component';
import { MainDocComponent } from './main-doc/main-doc.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { HomeComponent } from './home/home.component';
import { PhoneComponent } from './phone/phone.component';
import { MainRootComponent } from './main-root/main-root.component';
import { EstudiosComponent } from './estudios/estudios.component';
import { UnEstudioComponent } from './un-estudio/un-estudio.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { ConocenosComponent } from './conocenos/conocenos.component';
import { ListaCitasComponent } from './lista-citas/lista-citas.component';
import { DesarrolladoresComponent } from './desarrolladores/desarrolladores.component';
import { RootDocsComponent } from './root-docs/root-docs.component';
import { RootUsersComponent } from './root-users/root-users.component';
import { GraficasComponent } from './graficas/graficas.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component:HomeComponent},
  {
    path: 'mainUser',
    component: MainUserComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/registerUser']))
  },
  {
    path: 'mainDoc',
    component: MainDocComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/registerDoc']))
  },
  {
    path: 'mainRoot',
    component: MainRootComponent
  },
  { path: 'registerUser', component: UserRegisterComponent },
  { path: 'registerDoc', component: DocRegisterComponent},
  { path: 'login', component: LoginComponent },
  { path: 'loginPhone', component: PhoneComponent },
  { path: 'estudios', component: EstudiosComponent },
  { path: 'estudios/:id', component: UnEstudioComponent},
  { path: 'preguntas', component: PreguntasComponent},
  { path: 'conocenos', component: ConocenosComponent},
  { path: 'citas', component: ListaCitasComponent},
  { path: 'desarrolladores', component: DesarrolladoresComponent},
  { path: 'rootDocs', component: RootDocsComponent},
  { path: 'rootUsers', component: RootUsersComponent},
  { path: 'graficas', component: GraficasComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
