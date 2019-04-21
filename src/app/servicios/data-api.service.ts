import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {productosInteface} from '../componentes/catalogo/lista-productos/item-productos/productosInterface';
import { Observable } from 'rxjs';
import {categoriasInterface} from '../componentes/catalogo/filtro/categorias-filtro/categoriasInterface';
import {ProvinciasInterface} from "../componentes/usuarios/register/ProvinciasInterface";
import { LocalidadesInterface} from "../componentes/usuarios/register/LocalidadesInterface";

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(public httpClientApi: HttpClient) { }
 private _urlAllPlatos : string ="http://apirestdelivery.herokuapp.com/api/v1/plato/";
 private _urlAllCategorias: string ="http://apirestdelivery.herokuapp.com/api/v1/platocategoria/";
 private _urlAllProvincias: string ="http://apirestdelivery.herokuapp.com/api/v1/provincia/";
  private _urlAllLocalidades: string ="http://apirestdelivery.herokuapp.com/api/v1/localidad/";

 getAllPlatos (): Observable<productosInteface[]> {
    return this.httpClientApi.get<productosInteface[]>(this._urlAllPlatos);
  }
  getAllCategorias (): Observable<categoriasInterface[]> {
    return this.httpClientApi.get<categoriasInterface[]>(this._urlAllCategorias);
  }

  getAllProvincias (): Observable<ProvinciasInterface[]> {
    return this.httpClientApi.get<ProvinciasInterface[]>(this._urlAllProvincias);
  }
  getAllLocalidades (): Observable<LocalidadesInterface[]> {
    return this.httpClientApi.get<LocalidadesInterface[]>(this._urlAllLocalidades);
  }
}
