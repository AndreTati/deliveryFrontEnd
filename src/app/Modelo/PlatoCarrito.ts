import {Plato} from "./Plato";
import {Articulo} from "./Articulo";

export interface PlatoCarrito{
  id: number;
  plato?: any;
  articulo?:any;
  cantidad: number;
  esArticulo: boolean;
}
