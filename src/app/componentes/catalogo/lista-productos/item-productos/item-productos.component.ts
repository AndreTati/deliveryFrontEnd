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


  public platos: Plato[];
  public cantidadPlatos: number;
  public articulosVenta: articulosVentaInterface[];
  public cantidadArticulos: number;

  constructor( private router:Router,public platoService: PlatoService , public apiArticuloVenta: ArticuloService, private carritoComponent: CarritoComponent,private authService: AuthService, private messageService: MessageService) {

  }


  ngOnInit() {
    this.obtenerTodosLosPlatos();
    this.obtenerTodosLosArticulosVenta();
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

mandarPlato(plato: Plato){
    this.authService.isAuth().subscribe(auth => {
    if (auth) {
     this.carritoComponent.agregarPlatoaCarrito(plato);
    } else {

      this.messageService.add({key:'avisoRegistro', severity:'warn',life:4000, summary:'NO ESTAS LOGUEADO/REGISTRADO', detail:'Debes iniciar sesion o registrarte para agregar platos al carrito'});
      this.delay(5000).then(any=>{
        //your task after delay.
        this.router.navigate(['user/login']);

      });






    }
  });



}
// funcion que provoca un delay en la ejecucion
  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired"));
  }

}
