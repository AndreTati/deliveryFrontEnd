import { Component, OnInit } from '@angular/core';
import { productosInteface } from './productosInterface';
import {articulosVentaInterface} from './articulosVentaInterface';
import {PlatoService} from '../../../../servicios/plato/plato.service';
import {ArticuloService} from '../../../../servicios/articulo/articulo.service';
import {Plato} from "../../../cocinero/pedidoInterface";
import {ActivatedRoute, Router} from "@angular/router";



@Component({
  selector: 'app-item-productos',
  templateUrl: './item-productos.component.html',
  styleUrls: ['./item-productos.component.css']
})



export class ItemProductosComponent implements OnInit {


  public platos: productosInteface [] ;
  public cantidadPlatos: number;
  public articulosVenta: articulosVentaInterface[];
  public cantidadArticulos: number;

  constructor( private router:Router,public apiService: PlatoService , public apiArticuloVenta: ArticuloService) {  }


  ngOnInit() {

    this.obtenerTodosLosPlatos();
    this.obtenerTodosLosArticulosVenta();

  }

  obtenerTodosLosPlatos() {
    this.apiService.getAllPlatos()
      .subscribe(data => { this.platos = data ;  this.cantidadPlatos = data.length; }

      );
  }
  obtenerTodosLosArticulosVenta() {
    this.apiArticuloVenta.getAllArticulosVenta()
      .subscribe(data => { this.articulosVenta = data  ; this.cantidadArticulos = data.length; }

      );
  }

mandarPlato(id: number){
    this.router.navigate(['/carrito', id]);
}



}
