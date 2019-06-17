import { Component, OnInit } from '@angular/core';

import {pedidoInterface} from '../../cocinero/pedidoInterface';
import {PedidoService} from '../../../servicios/pedido/pedido.service';
import {datosInterface} from '../comidas-mas-pedidas/datosInterface';

@Component({
  selector: 'app-pedidos-por-periodo',
  templateUrl: './pedidos-por-periodo.component.html',
  styleUrls: ['./pedidos-por-periodo.component.css']
})
export class PedidosPorPeriodoComponent implements OnInit {
  public datosEstadisticos: any ;
  public datosEncontado: datosInterface [];
  public pedidos: pedidoInterface[];
  public labels: any[];
  public datos: any [];
  public colorArray: any [];
  private cargo: boolean;
  public  fechaFiltro: any ;
  private fecha: string;
  public totalPedidos = 0;
  constructor(private pedidosApiSerivice: PedidoService) { }

  ngOnInit() {
    this.labels = [];
    this.datos = [];
    this.colorArray = [];
    this.datosEstadisticos = [];
    this.datosEncontado = [];
    this.pedidos = [];
    this.fechaFiltro = '';
    this.fecha = '';
    this.obtenerAllUsuarios();

  }
  obtenerAllUsuarios( ) {
    this.pedidosApiSerivice.getAllPedidos().subscribe(data => {
        this.pedidos = data ;
        this.impedanciaEstadisticas('1925/20/11');
      }
      , error => {
        alert('Error al cargar usuarios ' + error);
      });
  }
  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
  impedanciaEstadisticas(fecha: string) {
    this.totalPedidos = 0;
    this.labels = [];
    this.datos = [];
    this.datosEncontado = [];
    this.datosEstadisticos = [];
    this.colorArray = [];
    this.fechaFiltro = new Date( fecha );
    for (const pedido of this.pedidos) {
      let arrayString  = pedido.fecha.split('/');
      let fechaFixeada = (arrayString[1] + '/' + arrayString[0] + '/' + arrayString[2]);
      const fechaPedido = new Date(fechaFixeada);
      if ( fechaPedido > this.fechaFiltro) {
        for ( const detalle of pedido.detalle) {
          if ( this.datosEncontado.length > 0) {
          if (this.existePlato(detalle.plato.nombre)) {
             this.totalPedidos += 1;
           } else {
            this.colorArray.push(this.getRandomColor());
            const auxiliar: datosInterface = {nombre: detalle.plato.nombre , cantidad : 1};
            this.datosEncontado.push(auxiliar);
          }

          } else {
            const auxiliar: datosInterface = {nombre: detalle.plato.nombre , cantidad : 1};
            this.colorArray.push(this.getRandomColor());
            this.datosEncontado.push(auxiliar);
          }
        }
        }
        }
    this.copiarArreglo();
  }

    existePlato(nombre: string  ): boolean {
    for (const datoEncontrado of this.datosEncontado) {

      if (  nombre === datoEncontrado.nombre ) {
        datoEncontrado.cantidad += 1;
        return true;

      }
    }
    return false;
   }
   copiarArreglo() {
    for ( const datoEncontrado of this.datosEncontado) {
      this.labels.push(datoEncontrado.nombre);
      this.datos.push(datoEncontrado.cantidad);
    }
    this.implementarDatos();
   }
  implementarDatos() {
    this.cargo = true;
    this.datosEstadisticos = {
      labels: this.labels,
      datasets: [
        {
          label: 'Pedidos en A GOOD TASTE',
          backgroundColor: this.colorArray ,
          borderColor: this.colorArray,
          data: this.datos,
        }
      ]
    };
  }

}
