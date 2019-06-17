import { Component, OnInit } from '@angular/core';
import {datosInterface} from "../comidas-mas-pedidas/datosInterface";
import {pedidoInterface} from "../../cocinero/pedidoInterface";
import {PedidoService} from "../../../servicios/pedido/pedido.service";

@Component({
  selector: 'app-recaudaciones-por-periodo',
  templateUrl: './recaudaciones-por-periodo.component.html',
  styleUrls: ['./recaudaciones-por-periodo.component.css']
})
export class RecaudacionesPorPeriodoComponent implements OnInit {

  public datosEstadisticos: any ;
  public datosEncontado: datosInterface [];
  public pedidos: pedidoInterface[];
  public labels: any[];
  public datos: any [];
  public colorArray: any [];
  private cargo: boolean;
  public  fechaFiltro: any ;
  private fechaInicio: string;
  private fechaFin: string;
  public totalRecaudado = 0;
  private fechaFiltro2: any;
  private fechaPedido: Date;
  constructor(private pedidosApiSerivice: PedidoService) { }

  ngOnInit() {
    this.labels = [];
    this.datos = [];
    this.colorArray = [];
    this.datosEstadisticos = [];
    this.datosEncontado = [];
    this.pedidos = [];
    this.fechaFiltro = '05/06/1999';
    this.fechaInicio = '';
    this.fechaFin = '';
    this.obtenerAllPedidos();

  }
  obtenerAllPedidos( ) {
    this.pedidosApiSerivice.getAllPedidos().subscribe(data => {
        this.pedidos = data ;
        }
      , error => {
        alert('Error al cargar pedidos ' + error);
      });
  }
  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
  estadisticas(fecha1: string , fecha2: string) {
    this.totalRecaudado = 0;
    this.labels = [];
    this.datos = [];
    this.datosEncontado = [];
    this.datosEstadisticos = [];
    this.colorArray = [];
    this.fechaFiltro = new Date( fecha1 );
    this.fechaFiltro2 = new Date (fecha2);

    for (const pedido of this.pedidos) {

      let arrayString  = pedido.fecha.split('/');
      let fechaFixeada = (arrayString[1] + '/' + arrayString[0] + '/' + arrayString[2]);
      this.fechaPedido = new Date(fechaFixeada);


      if ( (this.fechaPedido >= this.fechaFiltro)  && (this.fechaPedido <= this.fechaFiltro2) ) {
         this.totalRecaudado += pedido.total;
           }
    }
    this.colorArray.push(this.getRandomColor());
    this.labels = ['Dinero Recaudado en el periodo'];

    this.datos = [this.totalRecaudado];
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
