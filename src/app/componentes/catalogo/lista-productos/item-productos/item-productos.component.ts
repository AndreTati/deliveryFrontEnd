import { Component, OnInit } from '@angular/core';

import {HttpClient} from "@angular/common/http";

import {DataApiService} from '../../../../servicios/data-api.service';
import { productosInteface } from './productosInterface';



@Component({
  selector: 'app-item-productos',
  templateUrl: './item-productos.component.html',
  styleUrls: ['./item-productos.component.css']
})


  
export class ItemProductosComponent implements OnInit {

  
  public platos : productosInteface [] ;
  public cantidadPlatos: number;
  constructor( public apiService: DataApiService ) {  }
  

   
  
  ngOnInit() {

    this.apiService.getAllPlatos()
    .subscribe(data =>{  
      this.platos = data ;
      this.cantidadPlatos= data.length;
      
      ;}
    );
   
   
  }
  

}
