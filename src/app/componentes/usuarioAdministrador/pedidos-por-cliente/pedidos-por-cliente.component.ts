import { Component, OnInit } from '@angular/core';
import {UsuarioClienteABMService} from '../../../servicios/usuarioClienteABM/usuario-cliente-abm.service';
import {usuarioClienteInterface} from '../usuarios-pagina/usuarioClienteInterface';
import {PedidoService} from '../../../servicios/pedido/pedido.service';

import {Pedido} from '../../../Modelo/Pedido';


@Component({
  selector: 'app-pedidos-por-cliente',
  templateUrl: './pedidos-por-cliente.component.html',
  styleUrls: ['./pedidos-por-cliente.component.css']
})
export class PedidosPorClienteComponent implements OnInit {
  public usuarios: usuarioClienteInterface[];
  public datosEstadisticos: any ;
  public label: any [];
  public pedidosUsuario: Pedido[];
  public data: any [];
  public datosObtenido: any [];
  public totalPedidos = 0;
  public cargo: boolean ;
  public fecha: string;
  public userSeleccionado: string;
  private colorArray: any[];
  private fechaFiltro: Date;

  constructor( private usuariosApiSerivce: UsuarioClienteABMService , private pedidoApiSerivce: PedidoService) {
    this.usuarios = [];
    this.datosEstadisticos = [];
    this.label = [];
    this.data = [];
    this.datosObtenido = [];
  }

  ngOnInit() {
    this.obtenerAllUsuarios();
  }
  obtenerAllUsuarios() {
    this.usuariosApiSerivce.getAllUsuarios().subscribe(data => {
      this.usuarios = data;
    }, error => {
      alert('Error al cargar usuarios' + error);
    });
  }
  obtenerAllPedidosXid(id: number) {
    this.pedidoApiSerivce.getAllPedidosxId(id).subscribe(
      data => {
        this.pedidosUsuario = data;
        this.implementarFiltro();
        }, error => {
      alert('Error al cargar los pedidos del usuario' + error) ;
    });
  }
  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
  impedanciaEstadisticas(fecha: string , id: number) {
    this.totalPedidos = 0;
    this.pedidosUsuario = [];
    this.label = [];
    this.data = [];
    this.datosEstadisticos = [];
    this.colorArray = [];
    this.fechaFiltro = new Date( fecha );
    this.obtenerAllPedidosXid(id);
  }
  implementarFiltro() {
    this.label.push('Pedidos');
    this.colorArray.push(this.getRandomColor());
    for (const pedido of this.pedidosUsuario) {

      const fechaPedido = new Date(pedido.fecha);
      if ( fechaPedido > this.fechaFiltro) {
        this.totalPedidos += 1 ;
      }
    }
    this.data.push(this.totalPedidos);
    this.implementarDatos();
  }

  implementarDatos() {
    this.cargo = true;
    this.datosEstadisticos = {
      labels: this.label,
      datasets: [
        {
          label: 'Pedidos Del Cliente',
          backgroundColor: this.colorArray ,
          borderColor: this.colorArray,
          data: this.data,
        }
      ]
    };
  }

}
