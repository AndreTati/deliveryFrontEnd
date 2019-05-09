import { Component, OnInit } from '@angular/core';
import {articuloInterface} from '../articulo/articuloInterface';
import {articuloCategoriaInterface} from '../articulocategoria/articuloCategoriaInterface';
import {unidadMedidaInterface} from '../articulo/unidadMedidaInterface';
import {PlatoService} from '../../../servicios/plato/plato.service';
import {ArticuloService} from '../../../servicios/articulo/articulo.service';
import {MessageService} from 'primeng/api';
import {ArticuloCategoriaService} from '../../../servicios/articuloCategoria/articulo-categoria.service';
import {PlatoCategoriaService} from '../../../servicios/platoCategoria/plato-categoria.service';
import {platoCategoriaInterface} from '../platocategoria/platoCategoriaInterface';
import {platoInterface} from './platoInterface';

@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.css']
})
export class PlatoComponent implements OnInit {
  private columnas: any;
  public platos: platoInterface[];
  public cantidadPlatos: number;
  mostrarDialogo: boolean;
  plato: platoInterface;
  public categorias: articuloCategoriaInterface [];
  public totalCategorias: number;
  platoSeleccionado: platoInterface;
  platoNuevo: boolean;
  public unidadMedidas: unidadMedidaInterface[] ;
  public cantidadMedidas: number;
  public articulos: articuloInterface[] ;
  public cantidadArticulos: number;
  private esEliminar: boolean;
  private cantidadCategoriaPlatos: number;
  public categoriasPlato: platoCategoriaInterface[];


  constructor(public platoApiSerice: PlatoService ,
              public articuloApiSerice: ArticuloService ,
              public articuloCategoriaApi: ArticuloCategoriaService ,
              public platoCategoriaApi: PlatoCategoriaService,
              public toastMessages: MessageService) {
    this.columnas = [
      { field: 'id', header: 'ID' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'tiempoPreparacion', header: 'tiempoPreparacion' },
      { field: 'detalle', header: 'Detalle' },
      { field: 'categoria.nombre' , header : 'Categoria'},
      { field: 'imagen' , header : 'Imagen'},
    ];
  }

  ngOnInit() {
    this.obtenerAllPlatos();
    this.obtenerAllCategoriaPlatos();
    this.obtenerAllArticulos();
    this.obtenerAllCategorias();
    this.obtenerAllUnidadMedidas();
  }

  obtenerAllPlatos() {
    this.platoApiSerice.getAllPlatos().subscribe(data => {
      this.platos = data;
      this.cantidadPlatos = data.length;
    } , error => {
      alert('Error al Cargar Platos');
    });
  }
  obtenerAllCategoriaPlatos() {
    this.platoCategoriaApi.getAllPlatoCategoria().subscribe(data => {
      this.categoriasPlato = data;
      this.cantidadCategoriaPlatos = data.length;
    } , error => {

    });
  }
  obtenerAllArticulos() {
    this.articuloApiSerice.getAllArticulos().subscribe(data => {
      this.articulos = data;
      this.cantidadArticulos = data.length;
    });
  }
  obtenerAllUnidadMedidas() {
    this.articuloApiSerice.getAllUnidadMedida().subscribe(data => {
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
    this.platoNuevo = true;
    // @ts-ignore
    this.plato = {};
    // @ts-ignore
    this.plato.detalles = {};
    // @ts-ignore
    this.plato.categoria = {};
    // @ts-ignore
    this.plato.imagen = {};
    // @ts-ignore
    this.mostrarDialogo = true;
  }

  onRowSelect(event) {
    this.platoNuevo = false;
    // @ts-ignore
    this.plato = this.clonarArticulo(event.data);
    this.mostrarDialogo = true;
  }

  clonarArticulo(evento: platoInterface): platoInterface {
    const plato = {};

    for (const prop in evento) {
      plato[prop] = evento[prop];
    }
    return plato as  platoInterface;
  }
  eliminarConfirm() {
    this.esEliminar = true;
    this.mostrarConfirmar('Esta usted seguro?' , '¿Desea eliminar el registro?');
  }
  guardarConfirm() {
    this.esEliminar = false;
    if (this.platoNuevo) {
      this.mostrarConfirmar('Desa Agregar este nuevo registro?' , 'Para proceder debe confirmar'); } else {
      this.mostrarConfirmar('Desea Actualizar este registro?' , 'Para proceder debe confirmar'); }
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
  eliminar() {
    const idIndexado = this.platos.indexOf(this.platoSeleccionado);
    const idEliminar = (this.platos[idIndexado].id);


    this.platoApiSerice.deletePlato(idEliminar).subscribe(
      data => {
        this.mostrarToast('success' , 'Eliminado con exito ' , idEliminar.toString());
        this.platos = this.platos.filter((val, i) => i !== idIndexado);
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
    const platos = [...this.platos];
    if (!this.platoNuevo) {


      platos[this.platos.indexOf(this.platoSeleccionado)] = this.plato;



      this.platoApiSerice.updatePlato(platos[this.platos.indexOf(this.platoSeleccionado)]
        , platos[this.platos.indexOf(this.platoSeleccionado)].id).subscribe(
        data => {
          this.mostrarToast( 'success' , 'Actualizado con exito' , data.nombre);
          this.plato = null;
          this.mostrarDialogo = false;
          this.clearMessage();
          this.obtenerAllPlatos();  },
        error => {this.mostrarToast('error', 'Error al actualizar' , error.message);
                  this.mostrarDialogo = false;
                  this.clearMessage();
        }
      );

    } else {

      this.platoApiSerice.postPlato(this.plato).subscribe(
        data => {
          this.mostrarToast( 'success' , 'Agregado Correctamente' , data.nombre);
          this.plato = null;
          this.mostrarDialogo = false;
          this.clearMessage();
          this.obtenerAllPlatos(); },
        error => {
          this.clearMessage();
          console.log('Error', error.message);
          this.mostrarToast( 'error' , 'Hubo un error' , error.message);
        }
      );

    }
  }


}
