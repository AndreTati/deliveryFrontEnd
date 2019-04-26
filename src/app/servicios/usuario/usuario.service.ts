import { Injectable } from '@angular/core';
import {Usuario} from '../../Modelo/Usuario';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url:string = "http://apirestdelivery.herokuapp.com/api/v1/usuariocliente/35";
  private cliente:Usuario;

  constructor(private http:HttpClient) {

  }

  getUsuario(){
    return this.http.get<Usuario>(this.url);
  }

}
