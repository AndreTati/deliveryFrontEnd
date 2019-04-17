

export interface Categoria {
    id: number;
    nombre: string;
    porcentajeGanancia: number;
}

export interface Imagen {
    id: number;
    url: string;
}

export interface productosInteface {
    id: number;
    nombre: string;
    tiempoPreparacion: string;
    detalles: any[];
    categoria: Categoria;
    imagen: Imagen;
}