import { Component, OnInit } from '@angular/core';
import {DataApiService} from '../../../../servicios/data-api.service';
import { categoriasInterface } from './categoriasInterface';
@Component({
  selector: 'app-categorias-filtro',
  templateUrl: './categorias-filtro.component.html',
  styleUrls: ['./categorias-filtro.component.css']
})
export class CategoriasFiltroComponent implements OnInit {
  
  public categorias : categoriasInterface []  ; 
  public cantidadCategoria: number;
  
  constructor(public apiService: DataApiService ) { }

  ngOnInit() {
    this.apiService.getAllCategorias()
    .subscribe(data=> {
      this.categorias=data ;
      this.cantidadCategoria= data.length;
    })

  }

}
