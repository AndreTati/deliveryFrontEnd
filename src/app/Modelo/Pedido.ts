import {Estado} from "./Estado";
import {Detalle} from "./Detalle";
import {Usuario} from "./Usuario";

export interface Pedido {
  id: number;
  fecha: string;
  montoDescuento: number;
  total: number;
  usuarioCliente?: Usuario;
  horaEstimadaFin: string;
  tipoEnvio: string;
  estado: Estado;
  detalle: Detalle[];
}
