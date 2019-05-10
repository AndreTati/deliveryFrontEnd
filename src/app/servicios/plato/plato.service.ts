import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {productosInteface} from '../../componentes/catalogo/lista-productos/item-productos/productosInterface';
import {HttpClient} from '@angular/common/http';
import {platoInterface} from "../../componentes/usuarioAdministrador/plato/platoInterface";

@Injectable({
  providedIn: 'root'
})
export class PlatoService {
  private platos: productosInteface [];

  constructor(public httpClientApi: HttpClient) { }
  private _urlAllPlatos = 'http://apirestdelivery.herokuapp.com/api/v1/plato/';

  getAllPlatos(): Observable<platoInterface[]> {
    return this.httpClientApi.get<platoInterface[]>(this._urlAllPlatos);
  }
  postPlato( plato: platoInterface): Observable<platoInterface> {
    return this.httpClientApi.post<platoInterface>(this._urlAllPlatos , plato);
  }
  updatePlato(plato: platoInterface , id: number) {
    return this.httpClientApi.put<platoInterface>(this._urlAllPlatos + '' + id, plato);
  }
  deletePlato(id: number): Observable <platoInterface> {
    return this.httpClientApi.delete<platoInterface>(this._urlAllPlatos + '' + id)
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
