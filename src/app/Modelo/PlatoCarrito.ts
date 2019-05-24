import {Plato} from "./Plato";
import {Articulo} from "./Articulo";

export interface PlatoCarrito{
  id: number;
  plato: any;
  cantidad: number;
  esArticulo: boolean;
}
