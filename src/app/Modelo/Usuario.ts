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

export interface Usuario {
  id: number;
  email: string;
  dni: string;
  nombre: string;
  apellido: string;
  telefono: number;
  password: string;
  domicilio: Domicilio;
  fechaNacimiento: string;
  sexo: string;
}
