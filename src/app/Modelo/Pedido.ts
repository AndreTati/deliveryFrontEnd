import {Estado} from "./Estado";
import {Detalle} from "./Detalle";

export interface Pedido {
  id: number;
  fecha: string;
  montoDescuento: number;
  total: number;
  horaEstimadaFin: string;
  tipoEnvio: string;
  estado: Estado;
  detalle: Detalle[];
}
