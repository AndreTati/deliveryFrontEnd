import {Imagen} from "./Imagen";
import {Categoria} from "./Categoria";

export interface Plato {
  id: number;
  nombre: string;
  tiempoPreparacion: string;
  detalles: any[];
  categoria: Categoria;
  imagen: Imagen;
  precio: number;
}
