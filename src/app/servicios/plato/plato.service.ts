import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {productosInteface} from '../../componentes/catalogo/lista-productos/item-productos/productosInterface';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {

  constructor(public httpClientApi: HttpClient) { }
  private _urlAllPlatos = 'http://apirestdelivery.herokuapp.com/api/v1/plato/';
  getAllPlatos(): Observable<productosInteface[]> {
    return this.httpClientApi.get<productosInteface[]>(this._urlAllPlatos);
  }
}
