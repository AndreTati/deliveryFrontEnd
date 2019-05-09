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
  categoria?: any;
  unidadMedida: UnidadMedida;
  imagen?: any;
}
