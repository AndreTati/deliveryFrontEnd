import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {productosInteface} from '../componentes/catalogo/lista-productos/item-productos/productosInterface';
import { Observable } from 'rxjs';
import {categoriasInterface} from '../componentes/catalogo/filtro/categorias-filtro/categoriasInterface';
//import {ProvinciasInterface} from '../componentes/usuarios/register/ProvinciasInterface';
//import { LocalidadesInterface} from '../componentes/usuarios/register/LocalidadesInterface';
import {articuloCategoriaInterface} from '../componentes/usuarioAdministrador/articulocategoria/articuloCategoriaInterface';
import {platoCategoriaInterface} from "../componentes/usuarioAdministrador/platocategoria/platoCategoriaInterface";
import {articuloInterface} from "../componentes/usuarioAdministrador/articulo/articuloInterface";

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(public httpClientApi: HttpClient) { }
 private _urlAllPlatos = 'http://apirestdelivery.herokuapp.com/api/v1/plato/';
 private _urlAllCategorias = 'http://apirestdelivery.herokuapp.com/api/v1/platocategoria/';
 private _urlAllProvincias = 'http://apirestdelivery.herokuapp.com/api/v1/provincia/';
 private _urlAllLocalidades = 'http://apirestdelivery.herokuapp.com/api/v1/localidad/';
 private _urlAllArticuloCategoria = 'http://apirestdelivery.herokuapp.com/api/v1/articulocategoria/';
 private _urlAllPlatoCategoria = 'http://apirestdelivery.herokuapp.com/api/v1/platocategoria/';
  private _urlAllArticulo = 'http://apirestdelivery.herokuapp.com/api/v1/articulo/';
 getAllPlatos(): Observable<productosInteface[]> {
    return this.httpClientApi.get<productosInteface[]>(this._urlAllPlatos);
  }
  getAllCategorias(): Observable<categoriasInterface[]> {
    return this.httpClientApi.get<categoriasInterface[]>(this._urlAllCategorias);
  }

  /*getAllProvincias(): Observable<ProvinciasInterface[]> {
    return this.httpClientApi.get<ProvinciasInterface[]>(this._urlAllProvincias);
  }
  getAllLocalidades(): Observable<LocalidadesInterface[]> {
    return this.httpClientApi.get<LocalidadesInterface[]>(this._urlAllLocalidades);
  } */
  getAllArticuloCategoria(): Observable <articuloCategoriaInterface[]> {
    return this.httpClientApi.get<articuloCategoriaInterface[]>(this._urlAllArticuloCategoria);
  }
  getAllPlatoCategoria(): Observable <platoCategoriaInterface[]> {
    return this.httpClientApi.get<platoCategoriaInterface[]>(this._urlAllPlatoCategoria);
  }
  getAllArticulos(): Observable<articuloInterface[]>{
    return this.httpClientApi.get<articuloInterface[]>(this._urlAllArticulo);
  }



}
