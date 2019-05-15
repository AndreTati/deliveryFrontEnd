import { Component, OnInit } from '@angular/core';
import {PlatoService} from '../../../servicios/plato/plato.service';
import {PedidoService} from '../../../servicios/pedido/pedido.service';
import {platoInterface} from '../plato/platoInterface';
import {pedidoInterface} from '../../cocinero/pedidoInterface';
import {datosInterface} from './datosInterface';

@Component({
  selector: 'app-comidas-mas-pedidas',
  templateUrl: './comidas-mas-pedidas.component.html',
  styleUrls: ['./comidas-mas-pedidas.component.css']
})
export class ComidasMasPedidasComponent implements OnInit {

  public datosEstadisticos: any [];
  public platos: platoInterface [];
  public pedidos: pedidoInterface [];
  public labels: string [];
  public datosNumericos: any [];
  public datosEncontrados: datosInterface [];
  public cargo = false;
  public colorArray : any [];

  constructor(private platosApiService: PlatoService, private pedidosApiSerivice: PedidoService) {
    this.labels =  [];
    this.datosNumericos = [];
    this.datosEncontrados = [];
    this.colorArray = [];
    this.obtenerAllPedidos();



  }

  ngOnInit() {
  }

  obtenerAllPedidos() {
    this.pedidosApiSerivice.getAllPedidos().subscribe(data => {
      this.pedidos = data;
      this.generarDatos();
    }, error => {
      console.log('Error al cargar pedidos', error);
    });
  }
  generarDatos() {
    for (const pedido of this.pedidos) {

      for (const detalle of pedido.detalle) {

        try {

          if (this.datosEncontrados.length > 0) {
             if (this.existePlato(detalle.plato.nombre , detalle.cantidad)) {
               // alert('Se  sumo un existente');
               } else {
               const auxiliar: datosInterface = {nombre: detalle.plato.nombre , cantidad : detalle.cantidad};
             //  alert('Al se inexistente pusheo : ' + detalle.plato.nombre);
               this.datosEncontrados.push(auxiliar);
                }
          } else {
            const auxiliar: datosInterface = {nombre: detalle.plato.nombre , cantidad : detalle.cantidad};
           // alert('Hace el primer push de : ' + detalle.plato.nombre);
            this.datosEncontrados.push(auxiliar);
          }
        } catch (e) {
        }
      }

    }
    this.introducirDatosEstadisticos();
  }
  existePlato(nombre: string , cantidad:number ): boolean {
    for (const datoEncontrado of this.datosEncontrados) {

      if (  nombre === datoEncontrado.nombre ) {
        datoEncontrado.cantidad += cantidad;
        return true;
        // alert(datoEncontrado.nombre + ' : ' + detalle.plato.nombre + 'Es igual');
       // datoEncontrado.cantidad += detalle.cantidad;
      }
    }
    return false;
  }
  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  introducirDatosEstadisticos() {
     for (const dato of this.datosEncontrados) {
      this.labels.push(dato.nombre);
      this.datosNumericos.push(dato.cantidad);
      this.colorArray.push(this.getRandomColor());
    }
     this.cargo = true;
     this.datosEstadisticos = {
      // @ts-ignore
      labels : this.labels,
      datasets: [
        {
          label: 'Comidas',
          backgroundColor: this.colorArray ,
          borderColor: this.colorArray,
          data: this.datosNumericos
        }]
    };
  }
}
