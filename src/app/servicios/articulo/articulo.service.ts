import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {articuloInterface} from '../../componentes/usuarioAdministrador/articulo/articuloInterface';
import {articulosVentaInterface} from "../../componentes/catalogo/lista-productos/item-productos/articulosVentaInterface";

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  constructor(private httpClientApi: HttpClient) { }


  private _urlAllArticulo = 'http://apirestdelivery.herokuapp.com/api/v1/articulo/';
  private _urlHTTPVerbArticulo = 'http://apirestdelivery.herokuapp.com/api/v1/articulo';
  private _urlAllArticulosVenta= 'http://apirestdelivery.herokuapp.com/api/v1/articulo/esInsumo/false';

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
