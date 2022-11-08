import { NgModule, } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

//Modulos para firestore
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule  } from '@angular/fire/compat/firestore'
import { SETTINGS  } from '@angular/fire/compat/firestore';//Este reemplaza el FirestoreSettingsToken
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FlashMessagesModule } from 'flash-messages-angular';


import { AppComponent } from './app.component';
import { CabeceroComponent } from './componentes/cabecero/cabecero.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { EditarClienteComponent } from './componentes/editar-cliente/editar-cliente.component';
import { LoginComponent } from './componentes/login/login.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { PiePaginaComponent } from './componentes/pie-pagina/pie-pagina.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { ClienteService } from './servicios/cliente.service';

@NgModule({
  declarations: [
    AppComponent,
    CabeceroComponent,
    ClientesComponent,
    ConfiguracionComponent,
    EditarClienteComponent,
    LoginComponent,
    NoEncontradoComponent,
    PiePaginaComponent,
    RegistroComponent,
    TableroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firestore,'control-clientes'),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FlashMessagesModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
