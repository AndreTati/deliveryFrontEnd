import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componentes/home/home.component';
import { ModalComponent } from './componentes/modal/modal.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { LoginComponent } from './componentes/usuarios/login/login.component';
import { RegisterComponent } from './componentes/usuarios/register/register.component';
import { Page404Component } from './componentes/usuarios/page404/page404.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth} from '@angular/fire/auth';
import { FiltroComponent } from './componentes/catalogo/filtro/filtro.component';
import { ListaProductosComponent } from './componentes/catalogo/lista-productos/lista-productos.component';
import { ItemProductosComponent } from './componentes/catalogo/lista-productos/item-productos/item-productos.component';
import {HttpClientModule} from '@angular/common/http';
import { CategoriasFiltroComponent } from './componentes/catalogo/filtro/categorias-filtro/categorias-filtro.component';
import {DataViewModule} from "primeng/dataview";
import {PanelModule} from "primeng/panel";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DropdownModule} from "primeng/primeng";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModalComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    Page404Component,
    FiltroComponent,
    ListaProductosComponent,
    ItemProductosComponent,
    CategoriasFiltroComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    HttpClientModule,
    DataViewModule,
    PanelModule,
    BrowserAnimationsModule,
    DropdownModule,
    NgbModule

  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
