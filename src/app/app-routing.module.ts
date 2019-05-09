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
import {PedidosComponent} from './componentes/perfil/pedidos/pedidos.component';
import {AuthGuardPageGuard} from './guards/auth-guard-page.guard';
import {RolAdminGuard} from './guards/rol-admin-guard.service';
import {CocineroComponent} from "./componentes/cocinero/cocinero.component";


const routes: Routes = [
  // '' es home vacio SON DIRECCIONES DEL CLIENTE,Hay que HACER SEGURAS LAS RUTAS QUE SON SOLO PARA AUTENTIFICADOS
  // CON LOS GUARDS
  
  {path: 'componentes/home', component : ListaProductosComponent },
  {path : 'usuarioAdministrador/articuloCategoria' , component : ArticulocategoriaComponent , canActivate: [AuthGuardPageGuard, RolAdminGuard]},
  {path : 'cocina' , component : CocineroComponent , canActivate : [AuthGuardPageGuard]},
  {path: '', component : ListaProductosComponent },
  {path: 'usuarioAdministrador/platoCategoria', component: PlatocategoriaComponent, canActivate: [AuthGuardPageGuard,  RolAdminGuard]},
  {path: 'usuarioAdministrador/articulo', component : ArticuloComponent , canActivate: [AuthGuardPageGuard,  RolAdminGuard]},
  {path : 'user/login', component : LoginComponent},
  {path: 'user/register', component: RegisterComponent},
  {path : 'user/perfil', component: PerfilComponent , canActivate: [AuthGuardPageGuard]},
  {path : 'user/perfil/pedidos', component: PedidosComponent , canActivate: [AuthGuardPageGuard]},
  {path: 'catalogo/lista', component: ListaProductosComponent},
  {path: '**', component: Page404Component}
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
