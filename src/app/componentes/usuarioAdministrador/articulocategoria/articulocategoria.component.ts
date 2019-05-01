import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {articuloCategoriaInterface} from './articuloCategoriaInterface';
import {DataApiService} from '../../../servicios/data-api.service';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-articulocategoria',
  templateUrl: './articulocategoria.component.html',
  styleUrls: ['./articulocategoria.component.css']
})
export class ArticulocategoriaComponent implements OnInit {

  public  articuloCategoria: articuloCategoriaInterface [];
  private  cantidadArticulos: number;
  public nombre = '';
  public descripcion = '';

  private articuloSeleccionado: articuloCategoriaInterface;
  private columnas: any [];
  private  mostrarDialogo = false;
  private nuevoArticulo: boolean;

  // @ts-ignore
  public articulo: articuloCategoriaInterface = {};


  constructor( public  apiSerivce: DataApiService, private modalService: NgbModal , private  toastMessages: MessageService) { }

  ngOnInit() {
    this.obtenerAllArticulos();
    this.columnas = [{field: 'id', header: 'Id'},
                     {field: 'nombre', header: 'Nombre'},
                     {field: 'descripcion'   , header: 'Descripcion' }
      ];

  }
  obtenerAllArticulos() {
    this.apiSerivce.getAllArticuloCategoria().subscribe(data => {
      this.articuloCategoria = data;
      this.cantidadArticulos = data.length;
    });
  }

  showDialogToAdd() {
    this.nuevoArticulo = true;
    this.articulo = {} as articuloCategoriaInterface;
    this.mostrarDialogo = true;
    this.articuloSeleccionado = null;
  }
  filaSeleccionada(event) {
    this.nuevoArticulo = false;
    // @ts-ignore
    this.articulo = this.clonarArticulo(event.data);
    this.mostrarDialogo = true;
  }
  clonarArticulo( clonante: ArticulocategoriaComponent): ArticulocategoriaComponent {
    const  articulo = {};
    for (const atributos in clonante) {
      articulo[atributos] = clonante[atributos];
    }
    return articulo as ArticulocategoriaComponent;
  }
  eliminar() {
    const idIndexado = this.articuloCategoria.indexOf(this.articuloSeleccionado);
    const idEliminar = (this.articuloCategoria[idIndexado].id);

    if (confirm('Seguro de eliminar a : ' + this.articuloCategoria[idIndexado ].nombre + '' + this.articuloCategoria[idIndexado].id)) {
    this.apiSerivce.deleteArticuloCategoria(idEliminar).subscribe(
      data => {
                this.mostrarToast('success' , 'Eliminado con exito ' , idEliminar.toString())
                this.articuloCategoria = this.articuloCategoria.filter((val, i) => i !== idIndexado);
                this.mostrarDialogo = false;

                },
      error => {
                this.mostrarToast('error' , 'No se pudo eliminar , error : ', error.message);
                this.mostrarDialogo = false; }
       );
    } else {
      this.mostrarToast('info' , 'Entendido' , 'no se eliminara nada');
    }




  }

  guardar() {
    const articuloCategoria = [...this.articuloCategoria];
    if (!this.nuevoArticulo) {

      articuloCategoria[this.articuloCategoria.indexOf(this.articuloSeleccionado)] = this.articulo;
      if (confirm('Desea actualizar a : ' + articuloCategoria[this.articuloCategoria.indexOf(this.articuloSeleccionado)].nombre)) {
        this.apiSerivce.updateArticuloCategoria(articuloCategoria[this.articuloCategoria.indexOf(this.articuloSeleccionado)]
          , articuloCategoria[this.articuloCategoria.indexOf(this.articuloSeleccionado)].id).subscribe(
          data => {
            this.mostrarToast( 'success' , 'Actualizado con exito' , data.nombre);
            this.articulo = null;
            this.mostrarDialogo = false;
            this.obtenerAllArticulos(); },
          error => {this.mostrarToast('error', 'Error al actualizar' , error.message);
                    this.mostrarDialogo = false; }
        );







      }
    } else {

      if (confirm('Desea agregar esta nueva Categoria Articulo?' + this.articulo.nombre)) {
       this.apiSerivce.postArticuloCategoria(this.articulo).subscribe(
         data => {
           this.mostrarToast( 'success' , 'Agregado Correctamente' , data.nombre);
           this.articulo = null;
           this.mostrarDialogo = false;
           this.obtenerAllArticulos(); },
         error => {
           this.mostrarToast( 'error' , 'Hubo un error' , error.message);
               }
       );
         }
    }
  }
  mostrarToast( tipoToast: string , sumario: string, detalle: string ) {
    this.toastMessages.add({key: 'toastArticulo', severity: tipoToast , summary: sumario, detail: detalle});
  }




}
