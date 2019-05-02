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
  public esEliminar: boolean;
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
  eliminarConfirm() {
    this.esEliminar = true;
    this.mostrarConfirmar('Esta usted seguro?' , '¿Desea eliminar el registro?');
  }
  guardarConfirm() {
    this.esEliminar = false;
    if (this.nuevoPlato) {
      this.mostrarConfirmar('Desea Agregar este nuevo registro?' , 'Para proceder debe confirmar'); } else {
      this.mostrarConfirmar('Desea Actualizar este registro?' , 'Para proceder debe confirmar'); }
  }


  eliminar() {
    const idIndexado = this.platoCategoria.indexOf(this.platoSeleccionado);
    const idEliminar = (this.platoCategoria[idIndexado].id);

    this.apiService.deletePlatoCategoria(idEliminar).subscribe(
           data => {

           this.mostrarToast('success' , 'Eliminado el ID :' , idEliminar.toString());
           this.mostrarDialogo = false;
           this.platoCategoria = this.platoCategoria.filter((val, i) => i !== idIndexado);
           this.clearMessage();
           }  ,
          error => {
             this.mostrarToast('error' , 'Error al eliminar , motivo : ' , error.message);
             this.mostrarDialogo = false;
             this.clearMessage();
           });
  }

  guardar() {
    const platoCategoria = [...this.platoCategoria];
    if (!this.nuevoPlato) {

     platoCategoria[this.platoCategoria.indexOf(this.platoSeleccionado)] = this.plato;

     this.apiService.updatePlatoCategoria(platoCategoria[this.platoCategoria.indexOf(this.platoSeleccionado)]
          , platoCategoria[this.platoCategoria.indexOf(this.platoSeleccionado)].id).subscribe(
          data => {
            this.mostrarToast('success' , 'Actualizar ', 'Categoria actualizada correctamente');
            this.plato = null;
            this.mostrarDialogo = false;
            this.clearMessage();
          },
          error => {
            this.mostrarToast('error' , 'Error , No se pudo actualizar : ', error.message);
            this.plato = null;
            this.mostrarDialogo = false;
            this.clearMessage();
          }
        );

    } else {
          this.apiService.postPlatoCategoria(this.plato).subscribe(
          data => {
            this.mostrarToast('success' , 'Categoria agregada' , 'Se agrego correctamente su nueva categoria');
            this.plato = null;
            this.mostrarDialogo = false;
            this.clearMessage();
          },
          error => {
            this.mostrarToast('error' , 'Error al agregar , motivo : ' , error.message);
            this.plato = null;
            this.mostrarDialogo = false;
            this.clearMessage();
          }
        );
    }
  }
  mostrarToast( tipoToast: string , sumario: string, detalle: string ) {
    this.toastMessages.add({key: 'toastPlatoCategoria', severity: tipoToast , summary: sumario, detail: detalle});
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
