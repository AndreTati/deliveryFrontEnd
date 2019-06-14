import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ModalComponent } from './componentes/modal/modal.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { LoginComponent } from './componentes/usuarios/login/login.component';
import { RegisterComponent } from './componentes/usuarios/register/register.component';
import { Page404Component } from './componentes/usuarios/page404/page404.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth} from '@angular/fire/auth';

import { ListaProductosComponent } from './componentes/catalogo/lista-productos/lista-productos.component';
import { ItemProductosComponent } from './componentes/catalogo/lista-productos/item-productos/item-productos.component';
import {HttpClientModule} from '@angular/common/http';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {DataViewModule} from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  ButtonModule,
  CardModule,
  ChartModule,
  DialogModule,
  DropdownModule, MessageModule, MessageService, RadioButtonModule,
  SidebarModule,
  TooltipModule
} from 'primeng/primeng';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {TableModule} from 'primeng/table';
import {ArticulocategoriaComponent} from './componentes/usuarioAdministrador/articulocategoria/articulocategoria.component';
import {PlatocategoriaComponent} from './componentes/usuarioAdministrador/platocategoria/platocategoria.component';
import { ArticuloComponent } from './componentes/usuarioAdministrador/articulo/articulo.component';
import {PerfilComponent} from './componentes/perfil/perfil.component';
import {CarritoComponent} from './componentes/carrito/carrito.component';
import {ToastModule} from 'primeng/toast';
import { PedidosComponent } from './componentes/perfil/pedidos/pedidos.component';
import { CocineroComponent } from './componentes/cocinero/cocinero.component';
import { PlatoComponent } from './componentes/usuarioAdministrador/plato/plato.component';
import {UsuariosPaginaComponent} from './componentes/usuarioAdministrador/usuarios-pagina/usuarios-pagina.component';
import { ComidasMasPedidasComponent } from './componentes/usuarioAdministrador/comidas-mas-pedidas/comidas-mas-pedidas.component';
import { GraficoStockComponent } from './componentes/usuarioAdministrador/grafico-stock/grafico-stock.component';
import { ClientesRegistradosComponent } from './componentes/usuarioAdministrador/clientes-registrados/clientes-registrados.component';
import { PedidosPorClienteComponent } from './componentes/usuarioAdministrador/pedidos-por-cliente/pedidos-por-cliente.component';
import { PedidosPorPeriodoComponent } from './componentes/usuarioAdministrador/pedidos-por-periodo/pedidos-por-periodo.component';
import { FacturaComponent } from './componentes/perfil/pedidos/factura/factura.component';
import { ComprobantesComponent } from './componentes/usuarioAdministrador/comprobantes/comprobantes.component';
import { RecaudacionesPorPeriodoComponent } from './componentes/usuarioAdministrador/recaudaciones-por-periodo/recaudaciones-por-periodo.component';


@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    Page404Component,
    ListaProductosComponent,
    ItemProductosComponent,
    ArticulocategoriaComponent,
    PlatocategoriaComponent,
    ArticuloComponent, PerfilComponent, CarritoComponent, PedidosComponent,
    CocineroComponent,
    PlatoComponent,
    PedidosComponent, UsuariosPaginaComponent, ComidasMasPedidasComponent, GraficoStockComponent, ClientesRegistradosComponent, PedidosPorClienteComponent, PedidosPorPeriodoComponent, FacturaComponent, ComprobantesComponent, RecaudacionesPorPeriodoComponent

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
    NgbModule,
    TableModule,
    DialogModule,
    ButtonModule,
    TooltipModule,
    ConfirmDialogModule,
    CardModule,
    ToastModule,
    SidebarModule,
    MessageModule,
    ChartModule,
    RadioButtonModule,

  ],
  providers: [AngularFireAuth, MessageService, CarritoComponent, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
