import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {articuloCategoriaInterface} from './articuloCategoriaInterface';
import {DataApiService} from '../../../servicios/data-api.service';


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


  constructor( public  apiSerivce: DataApiService, private modalService: NgbModal) { }

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
    this.apiSerivce.deleteArticuloCategoria(idEliminar).subscribe( (res) => {
      this.mostrarDialogo = false;

    });
    } else {
      alert('Entendido. No se eliminara nada');
    }

    this.articuloCategoria = this.articuloCategoria.filter((val, i) => i !== idIndexado);


  }

  guardar() {
    const articuloCategoria = [...this.articuloCategoria];
    if (!this.nuevoArticulo) {

      articuloCategoria[this.articuloCategoria.indexOf(this.articuloSeleccionado)] = this.articulo;
      if (confirm('Desde updatear a :' + articuloCategoria[this.articuloCategoria.indexOf(this.articuloSeleccionado)].nombre)) {
        this.apiSerivce.updateArticuloCategoria(articuloCategoria[this.articuloCategoria.indexOf(this.articuloSeleccionado)]
          , articuloCategoria[this.articuloCategoria.indexOf(this.articuloSeleccionado)].id).subscribe( (res) => {
          this.articulo = null;
          this.mostrarDialogo = false;
        });

      }
    } else {

      if(confirm('Desea agregar esta nueva Categoria Articulo?' + this.articulo.nombre)) {
       this.apiSerivce.postArticuloCategoria(this.articulo).subscribe( (res) => {
         alert('Articulo Agregado');
         this.articulo = null;
         this.mostrarDialogo = false;
       });
      };
    }
  }




}
