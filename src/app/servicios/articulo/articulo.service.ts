import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {articuloInterface} from '../../componentes/usuarioAdministrador/articulo/articuloInterface';
import {articulosVentaInterface} from '../../componentes/catalogo/lista-productos/item-productos/articulosVentaInterface';
import {unidadMedidaInterface} from '../../componentes/usuarioAdministrador/articulo/unidadMedidaInterface';


@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  constructor(private httpClientApi: HttpClient) { }

  private _urlAllUnidadMedida= 'https://apirestdelivery.herokuapp.com/api/v1/unidadmedida/';
  private _urlAllArticulo = 'https://apirestdelivery.herokuapp.com/api/v1/articulo/';
  private _urlHTTPVerbArticulo = 'https://apirestdelivery.herokuapp.com/api/v1/articulo';
  private _urlAllArticulosVenta= 'https://apirestdelivery.herokuapp.com/api/v1/articulo/esInsumo/false';

   getAllUnidadMedida(): Observable<unidadMedidaInterface[]> {
    return this.httpClientApi.get<unidadMedidaInterface[]>(this._urlAllUnidadMedida);
  }

  getAllArticulosVenta(): Observable<articulosVentaInterface[]> {

    return this.httpClientApi.get<articulosVentaInterface[]>(this._urlAllArticulosVenta);
  }
  getAllArticulos(): Observable<articuloInterface[]>{
    return this.httpClientApi.get<articuloInterface[]>(this._urlAllArticulo);
  }

  deleteArticulo(id: number): Observable<{}> {
    const url = `${this._urlHTTPVerbArticulo}/${id}`;
    return this.httpClientApi.delete(url);
  }
  updateArticulo( objetoArticulo: articuloInterface , id: number): Observable<articuloInterface> {
    const url = `${this._urlHTTPVerbArticulo}/${id}`;
    return this.httpClientApi.put<articuloInterface>(url, objetoArticulo);
  }
  postArticulo( objetoArticulo: articuloInterface ): Observable<articuloInterface> {
    const url = `${this._urlHTTPVerbArticulo}/`;
    return this.httpClientApi.post<articuloInterface>(url, objetoArticulo);
  }


}
