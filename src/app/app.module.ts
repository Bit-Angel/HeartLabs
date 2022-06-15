import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { UserRegisterComponent } from './user-register/user-register.component';
import { DocRegisterComponent } from './doc-register/doc-register.component';
import { LoginComponent } from './login/login.component';
import { MainUserComponent } from './main-user/main-user.component';
import { MainDocComponent } from './main-doc/main-doc.component';
import { HomeComponent } from './home/home.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { PhoneComponent } from './phone/phone.component';
import { MainRootComponent } from './main-root/main-root.component';
import { EstudiosComponent } from './estudios/estudios.component';
import { UnEstudioComponent } from './un-estudio/un-estudio.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { ConocenosComponent } from './conocenos/conocenos.component';
import { ListaCitasComponent } from './lista-citas/lista-citas.component';
import { AccesibilidadComponent } from './accesibilidad/accesibilidad.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FooterComponent } from './footer/footer.component';
import { BarraLateralRootComponent } from './barra-lateral-root/barra-lateral-root.component';
import { DesarrolladoresComponent } from './desarrolladores/desarrolladores.component';
import { RootDocsComponent } from './root-docs/root-docs.component';
import { RootUsersComponent } from './root-users/root-users.component';
import { GraficasComponent } from './graficas/graficas.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    UserRegisterComponent,
    DocRegisterComponent,
    LoginComponent,
    MainUserComponent,
    MainDocComponent,
    HomeComponent,
    PhoneComponent,
    MainRootComponent,
    EstudiosComponent,
    UnEstudioComponent,
    NavBarComponent,
    PreguntasComponent,
    ConocenosComponent,
    ListaCitasComponent,
    AccesibilidadComponent,
    FooterComponent,
    BarraLateralRootComponent,
    DesarrolladoresComponent,
    RootDocsComponent,
    RootUsersComponent,
    GraficasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSkeletonLoaderModule,
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCPd2D-O7mbfA8B2x7n60X9rsXx3B2J0Bs'
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
