import { Component, OnInit } from '@angular/core';
import {pedidoInterface} from './pedidoInterface';
import {PedidoService} from '../../servicios/pedido/pedido.service';
import {estadoInterface} from './estadoInterface';

@Component({
  selector: 'app-cocinero',
  templateUrl: './cocinero.component.html',
  styleUrls: ['./cocinero.component.css']
})
export class CocineroComponent implements OnInit {
  mostrarDialogo: boolean;

  // @ts-ignore
  pedido: pedidoInterface = {};

  pedidoSeleccionado: pedidoInterface;
  cantidadPedidos: number;
  pedidos: pedidoInterface[];
  columnas: any[];
  estados: estadoInterface[];
  cantidadEstados: number;
  constructor(public pedidoApiService: PedidoService) {
    this.columnas = [
      { field: 'id', header: 'Numero Comanda' },
      { field: 'fecha', header: 'Fecha' },
      { field: 'horaEstimadaFin', header: 'Hora Estimada Fin' },
      { field: 'detalle', header: 'Detalle' },
      { field: 'estado' , header: 'Estado'}
    ];
  }

  ngOnInit() {
    // @ts-ignore
    this.pedido = {};
    // @ts-ignore
    this.pedido.estado = {};
    this.pedidoApiService.getAllPedidos().subscribe(data => {
      this.pedidos = data;
      this.cantidadPedidos = data.length;

    } , error => {
      alert('Error al cargar pedidos');
    });
    this.getAllEstados();

  }
  getAllEstados() {
    this.pedidoApiService.getAllEstados().subscribe(data => {
      this.estados = data;
      this.cantidadEstados = data.length;
      alert(this.cantidadEstados);
    } , error => {});
  }
  onRowSelect(event) {

    this.pedido = this.cloneCar(event.data);
    this.mostrarDialogo = true;
  }

  cloneCar(c: pedidoInterface): pedidoInterface {
    const pedido = {};
    for (const prop in c) {
      pedido[prop] = c[prop];
    }
    return pedido as pedidoInterface;
  }
  guardar() {
    const pedidos = [...this.pedidos];
    pedidos[this.pedidos.indexOf(this.pedidoSeleccionado)] = this.pedido;
    // SEGUIR AQUI HACER UPDATE

  }


}
