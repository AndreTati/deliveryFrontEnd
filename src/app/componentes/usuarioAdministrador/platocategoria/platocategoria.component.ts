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
  public cantidadCategorias: number;
  public id: number;
  public nombre: string;
  public porcentajeGanancia: number;



  ngOnInit() {
    this.obtenerAllPlatoCategoria();
  }
 obtenerAllPlatoCategoria() {
    this.apiService.getAllPlatoCategoria().subscribe( data => {
      this.platoCategoria = data;
      this.cantidadCategorias = data.length;
    });
 }
 abrirModal(content) {
    this.modalSerivce.open(content);
 }


}
