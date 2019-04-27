import { Injectable } from '@angular/core';
import {Usuario} from '../../Modelo/Usuario';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlGetByEmail:string = "http://apirestdelivery.herokuapp.com/api/v1/usuariocliente/searchByEmail/";
  private urlPut:string = "http://apirestdelivery.herokuapp.com/api/v1/usuariocliente/";
  private cliente:Usuario;

  constructor(private http:HttpClient) {

  }

  putUsuario(usuario: Usuario){
    return this.http.put(this.urlPut+usuario.id, usuario);
  }

  getUsuario(email:string){
    return this.http.get<Usuario>(this.urlGetByEmail+""+email);
  }

}
