import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {articuloCategoriaInterface} from '../../componentes/usuarioAdministrador/articulocategoria/articuloCategoriaInterface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticuloCategoriaService {

  constructor(public httpClientApi: HttpClient) { }
  private _urlAllArticuloCategoria = 'https://apirestdelivery.herokuapp.com/api/v1/articulocategoria/';
  private _urlHTTPVerbArticuloCategoria = 'https://apirestdelivery.herokuapp.com/api/v1/articulocategoria';

  // ACCIONES PARA ARTICULO CATEGORIA

  getAllArticuloCategoria(): Observable <articuloCategoriaInterface[]> {
    return this.httpClientApi.get<articuloCategoriaInterface[]>(this._urlAllArticuloCategoria);
  }

  deleteArticuloCategoria(id: number): Observable<{}> {
    const url = `${this._urlHTTPVerbArticuloCategoria}/${id}`; // DELETE api/v1/articulocategoria/id
    return this.httpClientApi.delete(url);
  }

  updateArticuloCategoria( objetoArticuloCategoria: articuloCategoriaInterface , id: number): Observable<articuloCategoriaInterface> {
    const url = `${this._urlHTTPVerbArticuloCategoria}/${id}`;

    return this.httpClientApi.put<articuloCategoriaInterface>(url, objetoArticuloCategoria);
  }
  postArticuloCategoria( objetoArticuloCategoria: articuloCategoriaInterface ): Observable<articuloCategoriaInterface> {
    const url = `${this._urlHTTPVerbArticuloCategoria}/`;

    return this.httpClientApi.post<articuloCategoriaInterface>(url, objetoArticuloCategoria);
  }
  // FIN ACCIONES ARTICULO CATEGORIA

}
