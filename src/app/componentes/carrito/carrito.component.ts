import { Component, OnInit } from '@angular/core';
import { Plato } from "../../Modelo/Plato";
import {Categoria} from "../../Modelo/Categoria";
import {Imagen} from "../../Modelo/Imagen";
import {PlatoCarrito} from "../../Modelo/PlatoCarrito";


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {


  public platosEnCarrito: PlatoCarrito[];
  public total: number;
  public carritoMenu: boolean;
public platosEnCarritoAux: Plato[];
  private columnas: any[];

  constructor() {
    this.total = 0;
    this.platosEnCarrito = [
      {
        cantidad:1,
      plato :{
        id: 77,
        nombre: 'PEPE',
        tiempoPreparacion: null,
        detalles: null,
        categoria: null,
        imagen: null
      }
      }

    ];
  }

  ngOnInit() {
    this.columnas = [{field: 'id', header: 'Id'},
      {field: 'nombre', header: 'Nombre'},

    ];
  }

  // AGREGA EL PLATO ELEGIDO AL ARRAY DE CARRITO Y SI YA ESTA SUMA 1 EN CANTIDAD
agregarPlatoaCarrito(platoSelec: Plato){
let platoCarro: PlatoCarrito = {
  cantidad: 1,
  plato: platoSelec
}
if(this.existePlato(platoSelec.id)){

    console.log("SE SUMO UN PLATO IGUAL");
  }else{
    this.platosEnCarrito = [...this.platosEnCarrito, platoCarro];
    this.total = this.total + 20;
  }
    console.log(platoSelec);
    console.log(this.platosEnCarrito);

}

// BUSCO SI ESE PLATO YA EXISTE EN EL CARRITO
existePlato(id: number): boolean {
  for (let plato of this.platosEnCarrito) {
    if (plato.plato.id == id) {
      plato.cantidad = plato.cantidad + 1;
      return true;
    }
  }
  return false;
}

// SUMAR CANTIDAD DEL PLATO
  sumarCantidad(plato: PlatoCarrito){
    console.log('SUMO');
   plato.cantidad++;
   this.total = this.total + 20;
   console.log(this.platosEnCarrito);
  }

// RESTAR CANTIDAD DEL PLATO
  restarCantidad(plato: PlatoCarrito) {
    console.log('RESTO');
    this.total = this.total - 20;
    plato.cantidad--;
    console.log(this.platosEnCarrito);


  }


// FIN DE CLASE
}


