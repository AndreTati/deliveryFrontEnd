import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../servicios/auth.service';
import {UsuarioService} from '../../../servicios/usuario/usuario.service';
import {Usuario} from '../../../Modelo/Usuario';
import {PedidoService} from "../../../servicios/pedido/pedido.service";
import {pedidoInterface} from "../../cocinero/pedidoInterface";
import {Pedido} from "../../../Modelo/Pedido";

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styles: []
})
export class PedidosComponent implements OnInit {

  private email:string = "";
  private cliente:Usuario = {id:0, nombre: "", apellido: "", fechaNacimiento: "", sexo: "", telefono: 0, email: "", dni: "", password: "", domicilio: {id:0, calle: "", departamento: 0, cp: 0, numero: 0, piso: 0, localidad: {id: 0, provincia:{ id: 0 }}, latitud: 0, longitud: 0}};
  private pedidos:Pedido[];
  private pedido:Pedido = {detalle: null, estado:null, fecha: null, horaEstimadaFin: null, id: null, montoDescuento: null, tipoEnvio: null, total: null};
  cols:any[];
  cols2:any[];
  display: boolean = false;

  constructor(private usuarioService:UsuarioService, private pedidoService:PedidoService, private att:AuthService) {
    this.att.isAuth().subscribe((data)=>{
      this.email = data.email;
      this.getUsuario(this.email);
    })
  }

  ngOnInit() {
    this.cols = [
      { field: 'id', header: 'Nº' },
      { field: 'fecha', header: 'Fecha' },
      { field: 'horaEstimadaFin', header: 'F. Final'},
      { field: 'total', header: 'Total' },
      { field: 'estado', subfield: 'nombre', header: 'Estado' }
    ];
    this.cols2 = [
      { field: 'cantidad', header: 'Cantidad' },
      { header: 'Nombre' }
    ];
  }

  getUsuario(email:string){
    this.usuarioService.getUsuario(email).subscribe((data) => {
      this.cliente = data;
      this.getPedidos(data.id)
    })
  }

  getPedidos(id:number){
    this.pedidoService.getAllPedidosxId(id).subscribe((data) => {
      this.pedidos = data;
      console.log(this.pedidos);
      console.log(this.pedidos.length);
    })
  }

  abrirModal(id:number) {
    this.display = true;
    this.pedido = this.pedidos.find(x => x.id == id);
    console.log(this.pedido)
  }

}
