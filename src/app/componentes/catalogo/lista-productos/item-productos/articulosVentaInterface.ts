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

export interface Imagen {
  id: number;
  url: string;
}

export interface articulosVentaInterface {
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
  imagen: Imagen;
}
