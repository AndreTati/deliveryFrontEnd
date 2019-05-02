import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/usuarios/login/login.component';
import { RegisterComponent } from './componentes/usuarios/register/register.component';
import { Page404Component } from './componentes/usuarios/page404/page404.component';
import { ListaProductosComponent} from './componentes/catalogo/lista-productos/lista-productos.component';
import {ArticulocategoriaComponent} from './componentes/usuarioAdministrador/articulocategoria/articulocategoria.component';
import {PlatocategoriaComponent} from './componentes/usuarioAdministrador/platocategoria/platocategoria.component';
import {ArticuloComponent} from './componentes/usuarioAdministrador/articulo/articulo.component';
import {PerfilComponent} from './componentes/perfil/perfil.component';
import {AuthGuardPageGuard} from './guards/auth-guard-page.guard';


const routes: Routes = [
  // '' es home vacio SON DIRECCIONES DEL CLIENTE,Hay que HACER SEGURAS LAS RUTAS QUE SON SOLO PARA AUTENTIFICADOS
  // CON LOS GUARDS

  {path: 'componentes/home', component : ListaProductosComponent },
  {path : 'usuarioAdministrador/articuloCategoria' , component : ArticulocategoriaComponent, canActivate: [AuthGuardPageGuard] },
  {path: '', component : ListaProductosComponent },
  {path: 'usuarioAdministrador/platoCategoria', component: PlatocategoriaComponent, canActivate: [AuthGuardPageGuard]},
  {path: 'usuarioAdministrador/articulo', component : ArticuloComponent , canActivate: [AuthGuardPageGuard]},
  {path : 'user/login', component : LoginComponent},
  {path: 'user/register', component: RegisterComponent},
  {path : 'user/perfil', component: PerfilComponent , canActivate:[AuthGuardPageGuard]},
  {path: 'catalogo/lista', component: ListaProductosComponent},
  {path: '**', component: Page404Component}
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
