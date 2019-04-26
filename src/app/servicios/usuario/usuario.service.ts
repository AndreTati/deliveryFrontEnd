import { Injectable } from '@angular/core';
import {Usuario} from '../../Modelo/Usuario';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url:string = "http://apirestdelivery.herokuapp.com/api/v1/usuariocliente/searchByEmail/";
  private cliente:Usuario;

  constructor(private http:HttpClient) {

  }

  getUsuario(email:string){
    return this.http.get<Usuario>(this.url+""+email);
  }

}
