import {Plato} from "../componentes/cocinero/pedidoInterface";
import {Articulo} from "./Articulo";

export interface Detalle {
  id: number;
  cantidad: number;
  plato?: Plato;
  articulo?: Articulo;
}
