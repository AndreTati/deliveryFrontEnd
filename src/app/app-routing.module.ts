import {NgModule, OnInit} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import {CocineroComponent} from './componentes/cocinero/cocinero.component';
import {PlatoComponent} from './componentes/usuarioAdministrador/plato/plato.component';
import {UsuariosPaginaComponent} from './componentes/usuarioAdministrador/usuarios-pagina/usuarios-pagina.component';
import {ComidasMasPedidasComponent} from './componentes/usuarioAdministrador/comidas-mas-pedidas/comidas-mas-pedidas.component';
import {GraficoStockComponent} from './componentes/usuarioAdministrador/grafico-stock/grafico-stock.component';
import {ClientesRegistradosComponent} from './componentes/usuarioAdministrador/clientes-registrados/clientes-registrados.component';
import {PedidosPorPeriodoComponent} from './componentes/usuarioAdministrador/pedidos-por-periodo/pedidos-por-periodo.component';
import {PedidosPorClienteComponent} from './componentes/usuarioAdministrador/pedidos-por-cliente/pedidos-por-cliente.component';
import {FacturaComponent} from "./componentes/perfil/pedidos/factura/factura.component";
import {RolCocineroGuard} from "./guards/rol-cocinero-guard.service";
import {ComprobantesComponent} from './componentes/usuarioAdministrador/comprobantes/comprobantes.component';
import {RecaudacionesPorPeriodoComponent} from "./componentes/usuarioAdministrador/recaudaciones-por-periodo/recaudaciones-por-periodo.component";


const routes: Routes = [
  // '' es home vacio SON DIRECCIONES DEL CLIENTE,Hay que HACER SEGURAS LAS RUTAS QUE SON SOLO PARA AUTENTIFICADOS
  // CON LOS GUARDS

  {path: 'componentes/home', component : ListaProductosComponent },
  {path : 'usuarioAdministrador/articuloCategoria' , component : ArticulocategoriaComponent , canActivate : [AuthGuardPageGuard, RolAdminGuard]},
  {path : 'usuarioAdministrador/recaudaciones' , component : RecaudacionesPorPeriodoComponent , canActivate : [AuthGuardPageGuard]},
  {path : 'usuarioAdministrador/estadisticasComidas' , component : ComidasMasPedidasComponent, canActivate : [AuthGuardPageGuard, RolAdminGuard] },
  {path : 'usuarioAdministrador/estadisticasStock' , component : GraficoStockComponent , canActivate : [AuthGuardPageGuard, RolAdminGuard]},
  {path : 'usuarioAdministrador/estadisticasUsuarios' , component : ClientesRegistradosComponent, canActivate: [AuthGuardPageGuard, RolAdminGuard] },
  {path : 'usuarioAdministrador/estadisticasPedidosPeriodo' , component : PedidosPorPeriodoComponent, canActivate: [AuthGuardPageGuard, RolAdminGuard] },
  {path : 'usuarioAdministrador/estadisticasPedidosUsuario' , component : PedidosPorClienteComponent },
  {path : 'usuarioAdministrador/usuarioCliente' , component : UsuariosPaginaComponent , canActivate: [AuthGuardPageGuard, RolAdminGuard]},
  {path : 'cocina' , component : CocineroComponent , canActivate : [AuthGuardPageGuard, RolCocineroGuard]},
  {path: '', component : ListaProductosComponent },
  {path: 'usuarioAdministrador/platoCategoria', component: PlatocategoriaComponent, canActivate: [AuthGuardPageGuard,  RolAdminGuard]},
  {path: 'usuarioAdministrador/plato', component: PlatoComponent, canActivate: [AuthGuardPageGuard,  RolAdminGuard]},
  {path: 'usuarioAdministrador/articulo', component : ArticuloComponent , canActivate: [AuthGuardPageGuard,  RolAdminGuard]},
  {path : 'user/login', component : LoginComponent},
  {path: 'user/register', component: RegisterComponent},
  {path : 'user/perfil', component: PerfilComponent , canActivate: [AuthGuardPageGuard]},
  {path : 'user/perfil/pedidos', component: PedidosComponent , canActivate: [AuthGuardPageGuard]},
  {path: 'catalogo/lista', component: ListaProductosComponent},
  {path: 'factura/:id', component: FacturaComponent},
  {path: 'usuarioAdministrador/comprobantes', component: ComprobantesComponent},
  {path: 'usuarioAdministrador/comprobantes/:id', component: FacturaComponent},
  {path: '**', component: Page404Component}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
