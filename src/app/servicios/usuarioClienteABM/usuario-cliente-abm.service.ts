import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {usuarioClienteInterface} from '../../componentes/usuarioAdministrador/usuarios-pagina/usuarioClienteInterface';



@Injectable({
  providedIn: 'root'
})
export class UsuarioClienteABMService {

  private _urlUsuarios =  'http://apirestdelivery.herokuapp.com/api/v1/usuariocliente/';

  constructor(public httpClientApi: HttpClient) { }

  getAllUsuarios(): Observable <usuarioClienteInterface []> {
    return this.httpClientApi.get <usuarioClienteInterface []> (this._urlUsuarios);
  }
}
