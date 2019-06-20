import { Component, OnInit } from '@angular/core';
import {UsuarioClienteABMService} from '../../../servicios/usuarioClienteABM/usuario-cliente-abm.service';
import {usuarioClienteInterface} from '../usuarios-pagina/usuarioClienteInterface';
import {PedidoService} from '../../../servicios/pedido/pedido.service';

import {Pedido} from '../../../Modelo/Pedido';
import {pedidoInterface} from "../../cocinero/pedidoInterface";


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
  public pedidosFiltrados: Pedido[];
  public data: any [];
  public datosObtenido: any [];
  public totalPedidos = 0;
  public cargo: boolean ;
  public fecha: string;
  public userSeleccionado: string;
  private colorArray: any[];
  private fechaFiltro: Date;
  private columnas: any;
  private cols2: any;
  // @ts-ignore
  pedidoDetalle: Pedido = {};
  private display = false;

  constructor( private usuariosApiSerivce: UsuarioClienteABMService , private pedidoApiSerivce: PedidoService) {
    this.usuarios = [];
    this.datosEstadisticos = [];
    this.label = [];
    this.data = [];
    this.datosObtenido = [];
    this.columnas = [
      { field: 'id', header: 'Numero Comanda' },
      { field: 'fecha', header: 'Fecha' },
      { field: 'horaEstimadaFin', header: 'Hora Estimada Fin' },
      { field: 'detalle', header: 'Detalle' }
    ];
    this.cols2 = [
      { field: 'cantidad', header: 'Cantidad' }
    ];
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
    this.pedidosFiltrados = [];
    this.label.push('Pedidos');
    this.colorArray.push(this.getRandomColor());
    for (const pedido of this.pedidosUsuario) {
      let arrayString  = pedido.fecha.split('/');
      let fechaFixeada = (arrayString[1] + '/' + arrayString[0] + '/' + arrayString[2]);
      const fechaPedido = new Date(fechaFixeada);
      if ( fechaPedido > this.fechaFiltro) {
        this.pedidosFiltrados.push(pedido);
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

  mostrarDetalle(id: number ) {
    this.display = true;
    // @ts-ignore
    this.pedidoDetalle = {};
    this.getOne(id);
  }

  getOne(id: number ) {
    for (let pedidoInterno of this.pedidosUsuario) {
      if (pedidoInterno.id == id) {
        this.pedidoDetalle = pedidoInterno;
        break;
      }
    }
  }

}
