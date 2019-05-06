import { Component, OnInit } from '@angular/core';
import {articuloInterface, Categoria, Imagen, UnidadMedida} from './articuloInterface';
import {ArticuloService} from '../../../servicios/articulo/articulo.service';
import {ArticuloCategoriaService} from '../../../servicios/articuloCategoria/articulo-categoria.service';
import {articuloCategoriaInterface} from '../articulocategoria/articuloCategoriaInterface';
import {unidadMedidaInterface} from './unidadMedidaInterface';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {

  public articulos: articuloInterface[];
  public cantidadArticulos: number;
  mostrarDialogo: boolean;
  articulo: articuloInterface ;
  public categorias: articuloCategoriaInterface [];
  public totalCategorias: number;
  articuloSeleccionado: articuloInterface;
  articuloNuevo: boolean;
  public unidadMedidas: unidadMedidaInterface[] ;
  public cantidadMedidas: number;

  columnas: any[];
  constructor(public apiService: ArticuloService , public articuloCategoriaApi: ArticuloCategoriaService) {
    this.columnas = [
      { field: 'id', header: 'ID' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'descripcion', header: 'Descripcion' },
      { field: 'precioCompra', header: 'Precio Compra' },
      { field: 'precioVenta' , header : 'Precio Venta'},
      { field: 'stock' , header : 'Stock Actual'},
      { field: 'stockMinimo' , header : 'Stock Minimo'},
      { field: 'stockMaximo' , header : 'Stock Maximo'},
      { field: 'esInsumo' , header : 'Estado Insumo'},
      { field: 'categoria' , fieldTwo: 'nombre' , header : 'Categoria' , sub: true},
      { field: 'unidadMedida', fieldTwo: 'nombre' , header : 'Unidad Medida', sub: true},
      { field: 'imagen' , fieldTwo: 'id', header : 'Imagen' , sub: true}
    ];
  }

  ngOnInit() {
    this.obtenerAllArticulos();
    this.obtenerAllCategorias();
    this.obtenerAllUnidadMedidas()

  }
  obtenerAllArticulos() {
    this.apiService.getAllArticulos().subscribe(data => {
      this.articulos = data;
      this.cantidadArticulos = data.length;
    });
  }
  obtenerAllUnidadMedidas() {
    this.apiService.getAllUnidadMedida().subscribe(data => {
      this.unidadMedidas = data;
      this.cantidadMedidas = data.length;
    } , error => {
      alert('Error al cargar Medidas');

    });
  }
  obtenerAllCategorias() {
    this.articuloCategoriaApi.getAllArticuloCategoria().subscribe(data => {
      this.categorias = data;
      this.totalCategorias = data.length;
    }, error => {
      alert('Error Al cargar categorias');
    });
  }
  mostrarAgregar() {
    this.articuloNuevo = true;
    // @ts-ignore
    this.articulo = {};
     // @ts-ignore
    this.articulo.categoria = {};
    // @ts-ignore
    this.articulo.imagen = {};
    // @ts-ignore
    this.articulo.unidadMedida = {};
    this.mostrarDialogo = true;
  }

  onRowSelect(event) {
    this.articuloNuevo = false;
    this.articulo = this.clonarArticulo(event.data);
    this.mostrarDialogo = true;
  }

  clonarArticulo(evento: articuloInterface): articuloInterface {
    const articulo = {};
    for (const prop in evento) {
      articulo[prop] = evento[prop];
    }
    return articulo as  articuloInterface;
  }


}
