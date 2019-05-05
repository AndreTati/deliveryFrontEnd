import { Component, OnInit } from '@angular/core';
import {articuloInterface, Categoria, Imagen, UnidadMedida} from './articuloInterface';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ArticuloService} from '../../../servicios/articulo/articulo.service';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {

  public articulos : articuloInterface[];
  public cantidadArticulos : number;
  public id: number;
  public nombre: string;
  public descripcion: string;
  public precioCompra: number;
  public stock: number;
  public stockMinimo: number;
  public stockMaximo: number;
  public esInsumo: boolean;
  public precioVenta: number;
  public fk_categoria: number;
  public fk_unidadMedida:number;
  public fk_imagen : number;
  constructor(public apiService: ArticuloService, private modalService: NgbModal) { }

  ngOnInit() {
    this.obtenerAllArticulos();
  }
  obtenerAllArticulos() {
    this.apiService.getAllArticulos().subscribe(data => {
      this.articulos = data;
      this.cantidadArticulos = data.length;
    });

  }
  abrirModal(content) {
    this.modalService.open(content);
  }

}
