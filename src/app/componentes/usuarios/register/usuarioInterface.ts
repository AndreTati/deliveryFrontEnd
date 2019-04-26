export interface Domicilio {
  id: number;
  calle?: any;
  numero?: any;
  piso: number;
  departamento: number;
  latitud: number;
  longitud: number;
  localidad?: any;
  cp?: any;
}

export interface Imagen {
  id: number;
  url?: any;
}

export interface Comprobante {
  id: number;
  fecha?: any;
  montoDescuento: number;
  total: number;
}

export interface Usuario {
  id: number;
  email: string;
  dni: string;
  nombre: string;
  apellido: string;
  telefono: number;
  password: string;
  domicilio: Domicilio;
  imagen: Imagen;
  fechaNacimiento: string;
  sexo: string;
  comprobantes: Comprobante[];
}
