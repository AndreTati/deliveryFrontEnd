import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {productosInteface} from '../componentes/catalogo/lista-productos/item-productos/productosInterface';
import { Observable } from 'rxjs';
import {categoriasInterface} from '../componentes/catalogo/filtro/categorias-filtro/categoriasInterface';


import {articuloCategoriaInterface} from '../componentes/usuarioAdministrador/articulocategoria/articuloCategoriaInterface';
import {platoCategoriaInterface} from '../componentes/usuarioAdministrador/platocategoria/platoCategoriaInterface';
import {articuloInterface} from '../componentes/usuarioAdministrador/articulo/articuloInterface';
import {Localidad} from '../componentes/usuarios/register/listarLocalidades';
import {Provincia} from '../componentes/usuarios/register/listarLocalidades';
import {Usuario} from "../componentes/usuarios/register/usuarioInterface";
import {articulosVentaInterface} from "../componentes/catalogo/lista-productos/item-productos/articulosVentaInterface";


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
 private _urlHTTPVerbArticuloCategoria = 'http://apirestdelivery.herokuapp.com/api/v1/articulocategoria';
 private _urlAllPlatoCategoria = 'http://apirestdelivery.herokuapp.com/api/v1/platocategoria/';
 private _urllHTTPVerbPlatoCategoria = 'http://apirestdelivery.herokuapp.com/api/v1/platocategoria';
 private _urlAllArticulo = 'http://apirestdelivery.herokuapp.com/api/v1/articulo/';
 private _urlHTTPVerbArticulo = 'http://apirestdelivery.herokuapp.com/api/v1/articulo';
 private _urlUsuarios = 'http://apirestdelivery.herokuapp.com/api/v1/usuariocliente/';
 private _urlAllArticulosVenta= 'http://apirestdelivery.herokuapp.com/api/v1/articulo/esInsumo/false';
 getAllPlatos(): Observable<productosInteface[]> {
    return this.httpClientApi.get<productosInteface[]>(this._urlAllPlatos);
  }
  getAllCategorias(): Observable<categoriasInterface[]> {
    return this.httpClientApi.get<categoriasInterface[]>(this._urlAllCategorias);
  }
// METODOS PARA OBTENER PROVINCIAS Y LOCALIDADES EN EL SELECT DEL FORMULARIO
  getAllProvincias(): Observable<Provincia[]> {
    return this.httpClientApi.get<Provincia[]>(this._urlAllProvincias);
  }
  getAllLocalidades(): Observable<Localidad[]> {
    return this.httpClientApi.get<Localidad[]>(this._urlAllLocalidades);
  }
  getAllArticulosVenta(): Observable<articulosVentaInterface[]> {

   return this.httpClientApi.get<articulosVentaInterface[]>(this._urlAllArticulosVenta);
  }

  // METODO POST PARA REGISTRAR USUARIOS

  setUsuario(usuario: Usuario): Observable<any>{

    return this.httpClientApi.post<Usuario>(this._urlUsuarios, usuario);
  }


  getAllArticulos(): Observable<articuloInterface[]>{
    return this.httpClientApi.get<articuloInterface[]>(this._urlAllArticulo);
  }
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


  // INICIO ACCIONES PARA ARTICULO

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
  
  // FIN ACCIONES  ARTICULO





}
