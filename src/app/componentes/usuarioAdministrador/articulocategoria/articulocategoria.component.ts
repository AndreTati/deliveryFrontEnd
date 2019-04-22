import { Component, OnInit } from '@angular/core';
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
  public  cantidadArticulos: number;
  public  id: number ;
  public  nombre: string ;
  public  descripcion: string ;


  constructor( public  apiSerivce: DataApiService, private modalService: NgbModal) { }

  ngOnInit() {
    this.obtenerAllArticulos();
  }

  obtenerAllArticulos() {
    this.apiSerivce.getAllArticuloCategoria().subscribe(data => {
      this.articuloCategoria = data;
      this.cantidadArticulos = data.length;
    });
  }
  abrirModal(content) {
    this.modalService.open(content);
  }




}
