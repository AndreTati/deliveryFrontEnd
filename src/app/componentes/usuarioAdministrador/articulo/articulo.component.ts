import { Component, OnInit } from '@angular/core';
import {articuloInterface, Categoria, Imagen, UnidadMedida} from './articuloInterface';
import {ArticuloService} from '../../../servicios/articulo/articulo.service';
import {ArticuloCategoriaService} from '../../../servicios/articuloCategoria/articulo-categoria.service';
import {articuloCategoriaInterface} from '../articulocategoria/articuloCategoriaInterface';
import {unidadMedidaInterface} from './unidadMedidaInterface';

import {MessageService} from 'primeng/api';

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
  private esEliminar: boolean;
  constructor(public apiService: ArticuloService , public articuloCategoriaApi: ArticuloCategoriaService , public toastMessages: MessageService) {
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
    this.obtenerAllUnidadMedidas();

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
  eliminarConfirm() {
    this.esEliminar = true;
    this.mostrarConfirmar('Esta usted seguro?' , '¿Desea eliminar el registro?');
  }
  guardarConfirm() {
    this.esEliminar = false;
    if (this.articuloNuevo) {
      this.mostrarConfirmar('Desa Agregar este nuevo registro?' , 'Para proceder debe confirmar'); } else {
      this.mostrarConfirmar('Desea Actualizar este registro?' , 'Para proceder debe confirmar'); }
  }
  eliminar() {
    const idIndexado = this.articulos.indexOf(this.articuloSeleccionado);
    const idEliminar = (this.articulos[idIndexado].id);


    this.apiService.deleteArticulo(idEliminar).subscribe(
      data => {
        this.mostrarToast('success' , 'Eliminado con exito ' , idEliminar.toString());
        this.articulos = this.articulos.filter((val, i) => i !== idIndexado);
        this.mostrarDialogo = false;
        this.clearMessage();
      },
      error => {
        this.mostrarToast('error' , 'No se pudo eliminar , error : ', error.message);
        this.mostrarDialogo = false;
        this.clearMessage(); }
    );

  }

  guardar() {
    const articulos = [...this.articulos];
    if (!this.articuloNuevo) {


      articulos[this.articulos.indexOf(this.articuloSeleccionado)] = this.articulo;

      this.apiService.updateArticulo(articulos[this.articulos.indexOf(this.articuloSeleccionado)]
        , articulos[this.articulos.indexOf(this.articuloSeleccionado)].id).subscribe(
        data => {
          this.mostrarToast( 'success' , 'Actualizado con exito' , data.nombre);
          this.articulo = null;
          this.mostrarDialogo = false;
          this.clearMessage();
          this.obtenerAllArticulos();  },
        error => {this.mostrarToast('error', 'Error al actualizar' , error.message);
                  this.mostrarDialogo = false;
                  this.clearMessage();
        }
      );

    } else {

      this.apiService.postArticulo(this.articulo).subscribe(
        data => {
          this.mostrarToast( 'success' , 'Agregado Correctamente' , data.nombre);
          this.articulo = null;
          this.mostrarDialogo = false;
          this.clearMessage();
          this.obtenerAllArticulos(); },
        error => {
          this.clearMessage();
          this.mostrarToast( 'error' , 'Hubo un error' , error.message);
        }
      );

    }
  }
  mostrarToast( tipoToast: string , sumario: string, detalle: string ) {
    this.toastMessages.add({key: 'toastArticulo', severity: tipoToast , summary: sumario, detail: detalle});
  }

  mostrarConfirmar(sumario: string , detalle: string) {
    this.toastMessages.clear();
    this.toastMessages.add({key: 'mensajeConfirmacion', sticky: true, severity: 'warn', summary: sumario,
      detail: detalle});
  }
  onReject() {
    this.toastMessages.clear('mensajeConfirmacion');
  }
  clearMessage() {
    this.toastMessages.clear('mensajeConfirmacion');
  }

}
