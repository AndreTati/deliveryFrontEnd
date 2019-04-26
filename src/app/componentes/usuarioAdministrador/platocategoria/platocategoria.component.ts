import { Component, OnInit } from '@angular/core';
import {DataApiService} from '../../../servicios/data-api.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {platoCategoriaInterface} from './platoCategoriaInterface';



@Component({
  selector: 'app-platocategoria',
  templateUrl: './platocategoria.component.html',
  styleUrls: ['./platocategoria.component.css']
})
export class PlatocategoriaComponent implements OnInit {

  constructor( public apiService: DataApiService , public  modalSerivce: NgbModal) { }
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
      this.apiService.deletePlatoCategoria(idEliminar).subscribe( (res) => {
        this.mostrarDialogo = false;
        alert('Eliminado Correctamente');
      });
    } else {
      alert('Entendido. No se eliminara nada');
    }

    this.platoCategoria = this.platoCategoria.filter((val, i) => i !== idIndexado);


  }

  guardar() {
    const platoCategoria = [...this.platoCategoria];
    if (!this.nuevoPlato) {

     platoCategoria[this.platoCategoria.indexOf(this.platoSeleccionado)] = this.plato;
     if (confirm('Desde updatear a : ' + platoCategoria[this.platoCategoria.indexOf(this.platoSeleccionado)].nombre)) {
        this.apiService.updatePlatoCategoria(platoCategoria[this.platoCategoria.indexOf(this.platoSeleccionado)]
          , platoCategoria[this.platoCategoria.indexOf(this.platoSeleccionado)].id).subscribe( (res) => {
          this.plato = null;
          this.mostrarDialogo = false;
        });

      }
    } else {

      if (confirm('Desea agregar esta nueva categoria de Platos?' + this.plato.nombre)) {
        this.apiService.postPlatoCategoria(this.plato).subscribe( (res) => {
          alert('Plato Agregado');
          this.plato = null;
          this.mostrarDialogo = false;
        });
      }
    }
  }
}
