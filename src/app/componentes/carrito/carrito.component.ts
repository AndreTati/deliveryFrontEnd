import { Component, OnInit } from '@angular/core';
import {Plato} from "../cocinero/pedidoInterface";
import {ActivatedRoute} from "@angular/router";
import {PlatoService} from "../../servicios/plato/plato.service";
import {productosInteface} from "../catalogo/lista-productos/item-productos/productosInterface";

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  public plato: productosInteface;
  public platosEnCarrito: productosInteface[];
  public carritoMenu: boolean;

  constructor(private activatedRoute: ActivatedRoute, private platoService: PlatoService) {

  }
  ngOnInit() {
this.activatedRoute.params.subscribe(params=>
{
  console.log(params['id']);
  this.plato = this.platoService.platoXId(params['id']);
  this.platosEnCarrito.push(this.plato);
});
  }






}


