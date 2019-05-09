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
  categoria: Categoria;
  unidadMedida: UnidadMedida;
  imagen?: any;
}

export interface Detalle {
  id: number;
  cantidad: number;
  articulo: Articulo;
}

export interface Categoria2 {
  id: number;
  nombre: string;
  porcentajeGanancia: number;
}

export interface Imagen {
  id: number;
  url: string;
}

export interface platoInterface {
  id: number;
  nombre: string;
  tiempoPreparacion: string;
  detalles: Detalle[];
  categoria: Categoria2;
  imagen: Imagen;
}
