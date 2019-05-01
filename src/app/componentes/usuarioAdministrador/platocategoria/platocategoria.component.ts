import { Component, OnInit } from '@angular/core';
import {DataApiService} from '../../../servicios/data-api.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {platoCategoriaInterface} from './platoCategoriaInterface';
import {MessageService} from "primeng/api";



@Component({
  selector: 'app-platocategoria',
  templateUrl: './platocategoria.component.html',
  styleUrls: ['./platocategoria.component.css']
})
export class PlatocategoriaComponent implements OnInit {

  constructor( private apiService: DataApiService , private  modalSerivce: NgbModal , private  toastMessages: MessageService) { }
  public platoCategoria: platoCategoriaInterface [];
  public columnas: any;
  public cantidadCategorias: number;
  public id: number;
  public nombre: string;
  public porcentajeGanancia: number;
  public platoSeleccionado: platoCategoriaInterface;
  public nuevoPlato: boolean;
  public mostrarDialogo: boolean;
  // @ts-ignore
  public plato: platoCategoriaInterface = {};




  ngOnInit() {
    this.obtenerAllPlatoCategoria();
    this.columnas = [{field: 'id', header: 'Id'},
                     {field: 'nombre', header: 'Nombre'},
                     {field: 'porcentajeGanancia'   , header: 'Pocentaje de ganancia' }
    ];


  }
 obtenerAllPlatoCategoria() {
    this.apiService.getAllPlatoCategoria().subscribe( data => {
      this.platoCategoria = data;
      this.cantidadCategorias = data.length;
    });
 }
  showDialogToAdd() {
    this.nuevoPlato = true;
    this.plato = {} as platoCategoriaInterface;
    this.mostrarDialogo = true;
    this.platoSeleccionado = null;
  }
  filaSeleccionada(event) {

    this.nuevoPlato = false;
    // @ts-ignore
    this.plato = this.clonarArticulo(event.data);
    this.mostrarDialogo = true;
  }
  clonarArticulo( clonante: platoCategoriaInterface): PlatocategoriaComponent {
    const  plato = {};
    for (const atributos in clonante) {
     plato[atributos] = clonante[atributos];
    }
    return plato as PlatocategoriaComponent;
  }


  eliminar() {
    const idIndexado = this.platoCategoria.indexOf(this.platoSeleccionado);
    const idEliminar = (this.platoCategoria[idIndexado].id);

    if (confirm('Seguro de eliminar a : ' + this.platoCategoria[idIndexado ].nombre + ' | ' + this.platoCategoria[idIndexado].id)) {
      this.apiService.deletePlatoCategoria(idEliminar).subscribe(
           data => {

           this.mostrarToast('success' , 'Eliminado el ID :' , idEliminar.toString());
           this.mostrarDialogo = false;
           this.platoCategoria = this.platoCategoria.filter((val, i) => i !== idIndexado);
           }  ,
          error => {
             this.mostrarToast('error' , 'Error al eliminar , motivo : ' , error.message);
             this.mostrarDialogo = false;
           });
    }


  }

  guardar() {
    const platoCategoria = [...this.platoCategoria];
    if (!this.nuevoPlato) {

     platoCategoria[this.platoCategoria.indexOf(this.platoSeleccionado)] = this.plato;
     if (confirm('Desde updatear a : ' + platoCategoria[this.platoCategoria.indexOf(this.platoSeleccionado)].nombre)) {
        this.apiService.updatePlatoCategoria(platoCategoria[this.platoCategoria.indexOf(this.platoSeleccionado)]
          , platoCategoria[this.platoCategoria.indexOf(this.platoSeleccionado)].id).subscribe(
          data => {
            this.mostrarToast('success' , 'Actualizar ', 'Categoria actualizada correctamente');
            this.plato = null;
            this.mostrarDialogo = false;
          },
          error => {
            this.mostrarToast('error' , 'Error , No se pudo actualizar : ', error.message);
            this.plato = null;
            this.mostrarDialogo = false;
          }
        );






      }
    } else {

      if (confirm('Desea agregar esta nueva categoria de Platos?' + this.plato.nombre)) {
        this.apiService.postPlatoCategoria(this.plato).subscribe(
          data => {
            this.mostrarToast('success' , 'Categoria agregada' , 'Se agrego correctamente su nueva categoria');
            this.plato = null;
            this.mostrarDialogo = false;
          },
          error => {
            this.mostrarToast('error' , 'Error al agregar , motivo : ' , error.message);
            this.plato = null;
            this.mostrarDialogo = false;
          }
        );
      }
    }
  }
  mostrarToast( tipoToast: string , sumario: string, detalle: string ) {
    this.toastMessages.add({key: 'toastPlatoCategoria', severity: tipoToast , summary: sumario, detail: detalle});
  }
}
