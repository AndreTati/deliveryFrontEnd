import { Component, OnInit } from '@angular/core';

import {HttpClient} from '@angular/common/http';

import {DataApiService} from '../../../../servicios/data-api.service';
import { productosInteface } from './productosInterface';
import {SelectItem} from 'primeng/api';
import {articulosVentaInterface} from './articulosVentaInterface';



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

  constructor( public apiService: DataApiService ) {  }


  ngOnInit() {
    this.obtenerTodosLosPlatos();
    this.obtenerTodosLosArticulosVenta();
  }

  obtenerTodosLosPlatos() {
    this.apiService.getAllPlatos()
      .subscribe(data => { this.platos = data ;  this.cantidadPlatos = data.length;}

      );
  }
  obtenerTodosLosArticulosVenta() {
    this.apiService.getAllArticulosVenta()
      .subscribe(data => { this.articulosVenta = data  ; this.cantidadArticulos = data.length;}

      );
  }



}
