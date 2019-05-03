import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../servicios/auth.service';
import {UsuarioService} from '../../../servicios/usuario/usuario.service';
import {Usuario} from '../../../Modelo/Usuario';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styles: []
})
export class PedidosComponent implements OnInit {

  private email:string;
  private cliente:Usuario;

  constructor(private usuarioService:UsuarioService, private att:AuthService) {
    this.att.isAuth().subscribe((data)=>{
      this.email = data.email;
      this.getUsuario(this.email);
    })
  }

  ngOnInit() {

  }

  getUsuario(email:string){
    this.usuarioService.getUsuario(email).subscribe((data) => {
      this.cliente = data;
    })
  }

}
