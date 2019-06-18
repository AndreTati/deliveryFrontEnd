import { Component, OnInit } from '@angular/core';
import {articulosVentaInterface} from './articulosVentaInterface';
import {PlatoService} from '../../../../servicios/plato/plato.service';
import {ArticuloService} from '../../../../servicios/articulo/articulo.service';
import {ActivatedRoute, Router} from "@angular/router";
import { Plato } from "../../../../Modelo/Plato";
import {CarritoComponent} from "../../../carrito/carrito.component";
import {AuthService} from "../../../../servicios/auth.service";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-item-productos',
  templateUrl: './item-productos.component.html',
  styleUrls: ['./item-productos.component.css']
})



export class ItemProductosComponent implements OnInit {

  public informacion: string = "";
  public platos: Plato[];
  public cantidadPlatos: number;
  public articulosVenta: articulosVentaInterface[];
  public cantidadArticulos: number;
logueado : boolean;
  constructor( private router:Router,public platoService: PlatoService , public apiArticuloVenta: ArticuloService, private carritoComponent: CarritoComponent,private authService: AuthService, private messageService: MessageService) {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.logueado = true;

      } else {
        this.logueado = false;
      }
    });
  }


  ngOnInit() {
    this.obtenerTodosLosPlatos();
    this.obtenerTodosLosArticulosVenta();
    this.carritoComponent.getUsuario();
  }

  obtenerInformacion(platos:Plato){
    this.informacion = ""
    for(let i = 0; i < platos.detalles.length; i++){
      let temp = " "
      if(i == platos.detalles.length-2){
        temp = platos.detalles[i].articulo.nombre+' y ';
      }
      else{
        if (i == platos.detalles.length-1){
          temp = platos.detalles[i].articulo.nombre+'. ';
        }
        else{
          temp = platos.detalles[i].articulo.nombre+', ';
        }
      }
      this.informacion += temp
    }
  }

  obtenerTodosLosPlatos() {
    this.platoService.getAllPlatos()
      .subscribe(data => { this.platos = data;this.cantidadPlatos = data.length}
      );

  }

  obtenerTodosLosArticulosVenta() {
    this.apiArticuloVenta.getAllArticulosVenta()
      .subscribe(data => { this.articulosVenta = data  ; this.cantidadArticulos = data.length; }

      );
  }
// FUNCION QUE ENVIA UN OBJETO PLATO AL CARRITO
mandarPlato(plato: any, esArticulo: string){
  if (this.logueado) {
    this.carritoComponent.agregarPlatoaCarrito(plato,esArticulo);
    this.messageService.add({key:'platoAgregado', severity:'info', summary:plato.nombre, detail:'Agregado al carrito'});

  } else {

      alert('AVISO : Debes estar logueado como usuario para agregar al carrito.');
      this.router.navigate(['user/login']);}

  }

// funcion que provoca un delay en la ejecucion
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
  }
limpiarCarrito(){
    this.carritoComponent.limpiarCarrito();
}
mandarPedido(){
    this.carritoComponent.confirmarPedido();
}


}
