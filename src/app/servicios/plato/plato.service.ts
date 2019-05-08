import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {productosInteface} from '../../componentes/catalogo/lista-productos/item-productos/productosInterface';
import {HttpClient} from '@angular/common/http';
import {Plato} from "../../componentes/cocinero/pedidoInterface";

@Injectable({
  providedIn: 'root'
})
export class PlatoService {

  public platos: productosInteface [] ;

  constructor(public httpClientApi: HttpClient) { }

  private _urlAllPlatos = 'http://apirestdelivery.herokuapp.com/api/v1/plato/';

  getAllPlatos(): Observable<productosInteface[]> {
    return this.httpClientApi.get<productosInteface[]>(this._urlAllPlatos);
  }

  platoXId(id: number): productosInteface {
    for(let plato of this.platos) {

      if (id == plato.id) {
        console.log(plato.id);
        return plato;
      }
    }
  }
}
