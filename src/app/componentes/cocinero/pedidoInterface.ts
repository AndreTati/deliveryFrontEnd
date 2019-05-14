export interface Estado {
  id: number;
  nombre: string;
}
export interface Imagen {
  id: number;
  url: string;
}

export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface UnidadMedida {
  id: number;
  nombre: string;
  abreviatura: string;
}

export interface Articulo {
  id: number;
  nombre: string;
  descripcion: string;
  precioCompra: number;
  stock: number;
  stockMinimo: number;
  stockMaximo: number;
  esInsumo: boolean;
  precioVenta: number;
  estado: Estado;
  unidadMedida: UnidadMedida;
  categoria: Categoria;
}
export interface Plato {
  id: number;
  nombre: string;
  tiempoPreparacion: string;
  detalles: DetallePlato[];
  categoria: Categoria;
  imagen: Imagen;
}
export interface Detalle {
  id: number;
  cantidad: number;
  plato: Plato;
  articulo: Articulo[];
}
export interface DetallePlato {
  id: number;
  cantidad: number;
  articulo: Articulo;
}
export interface pedidoInterface {
  id: number;
  fecha: string;
  montoDescuento: number;
  total: number;
  horaEstimadaFin: string;
  tipoEnvio: string;
  estado: Estado;
  detalle: Detalle[];
}


