import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {platoCategoriaInterface} from '../../componentes/usuarioAdministrador/platocategoria/platoCategoriaInterface';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PlatoCategoriaService {

  constructor(public httpClientApi: HttpClient) { }

  private _urlAllPlatoCategoria = 'http://apirestdelivery.herokuapp.com/api/v1/platocategoria/';
  private _urllHTTPVerbPlatoCategoria = 'http://apirestdelivery.herokuapp.com/api/v1/platocategoria';


  // AQUI ACCIONSE PARA PLATO CATEGORIA
   getAllPlatoCategoria(): Observable <platoCategoriaInterface[]> {
    return this.httpClientApi.get<platoCategoriaInterface[]>(this._urlAllPlatoCategoria);
  }
  deletePlatoCategoria(id: number): Observable<{}> {
    const url = `${this._urllHTTPVerbPlatoCategoria}/${id}`;
    return this.httpClientApi.delete(url);
  }
  updatePlatoCategoria( objetoPlatoCategoria: platoCategoriaInterface , id: number): Observable<platoCategoriaInterface> {
    const url = `${this._urllHTTPVerbPlatoCategoria}/${id}`;
    return this.httpClientApi.put<platoCategoriaInterface>(url, objetoPlatoCategoria);
  }
  postPlatoCategoria( objetoPlatoCategoria: platoCategoriaInterface ): Observable<platoCategoriaInterface> {
    const url = `${this._urllHTTPVerbPlatoCategoria}/`;
    return this.httpClientApi.post<platoCategoriaInterface>(url, objetoPlatoCategoria);
  }


  // FIN ACCIONES PLATO CATEGORIA
}
