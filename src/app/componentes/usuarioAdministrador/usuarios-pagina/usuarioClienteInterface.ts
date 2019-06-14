export interface Localidad {
  id: number;
  nombre?: any;
  provincia?: any;
}

export interface Domicilio {
  id: number;
  calle: string;
  numero: string;
  piso: number;
  departamento: number;
  latitud: number;
  longitud: number;
  localidad: Localidad;
  cp: string;
}

export interface Imagen {
  id: number;
  url?: any;
}

export interface usuarioClienteInterface {
  id: number;
  email: string;
  dni: string;
  nombre: string;
  apellido: string;
  telefono: number;
  password: string;
  domicilio: Domicilio;
  imagen: Imagen;
  fechaNacimiento: any;
  sexo: string;
  alta: string;
}
