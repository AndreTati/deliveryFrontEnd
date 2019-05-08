import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Localidad} from '../componentes/usuarios/register/listarLocalidades';
import {Provincia} from '../componentes/usuarios/register/listarLocalidades';
import {Usuario} from '../componentes/usuarios/register/usuarioInterface';
import {articulosVentaInterface} from '../componentes/catalogo/lista-productos/item-productos/articulosVentaInterface';
import {RolInterface} from '../guards/rolInterface';


@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(public httpClientApi: HttpClient) { }


 private _urlAllProvincias = 'http://apirestdelivery.herokuapp.com/api/v1/provincia/';
 private _urlAllLocalidades = 'http://apirestdelivery.herokuapp.com/api/v1/localidad/';

 private _urlUsuarios = 'http://apirestdelivery.herokuapp.com/api/v1/usuariocliente/';

 private _urlRol = 'http://apirestdelivery.herokuapp.com/api/v1/usuario/rolByEmail/';


// METODOS PARA OBTENER PROVINCIAS Y LOCALIDADES EN EL SELECT DEL FORMULARIO
  getAllProvincias(): Observable<Provincia[]> {
    return this.httpClientApi.get<Provincia[]>(this._urlAllProvincias);
  }
  getAllLocalidades(): Observable<Localidad[]> {
    return this.httpClientApi.get<Localidad[]>(this._urlAllLocalidades);
  }


  // METODO POST PARA REGISTRAR USUARIOS

  setUsuario(usuario: Usuario): Observable<any>{

    return this.httpClientApi.post<Usuario>(this._urlUsuarios, usuario);
  }




  // INICIO ACCIONES PARA GUARDS
  getPermisos(email: string): Observable<RolInterface> {
return this.httpClientApi.get<RolInterface>(this._urlRol + email);
  }

  // FIN ACCIONES PARA GUARDS




}
