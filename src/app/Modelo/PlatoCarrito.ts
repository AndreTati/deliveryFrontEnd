import {Plato} from "./Plato";
import {Articulo} from "./Articulo";

export interface PlatoCarrito{
  id: number;
  plato?: Plato;
  articulo?: Articulo;
  cantidad: number;
}
