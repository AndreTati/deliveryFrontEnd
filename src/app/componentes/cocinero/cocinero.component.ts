import { Component, OnInit } from '@angular/core';
import {pedidoInterface} from './pedidoInterface';
import {PedidoService} from '../../servicios/pedido/pedido.service';
import {estadoInterface} from './estadoInterface';
import {MessageService} from "primeng/api";
import {Observable} from "rxjs";

@Component({
  selector: 'app-cocinero',
  templateUrl: './cocinero.component.html',
  styleUrls: ['./cocinero.component.css']
})
export class CocineroComponent implements OnInit {
  mostrarDialogo: boolean;
  mostrar:boolean = true;

  // @ts-ignore
  pedido: pedidoInterface = {};

  pedidoSeleccionado: pedidoInterface;
  cantidadPedidos: number;
  pedidos: pedidoInterface[];
  columnas: any[];
  estados: estadoInterface[];
  cantidadEstados: number;
  constructor(public pedidoApiService: PedidoService, private  toastMessages: MessageService) {
    this.columnas = [
      { field: 'id', header: 'Numero Comanda' },
      { field: 'fecha', header: 'Fecha' },
      { field: 'horaEstimadaFin', header: 'Hora Estimada Fin' },
      { field: 'detalle', header: 'Detalle' },
      { field: 'estado.nombre' , header: 'Estado'}
    ];
  }

  ngOnInit() {
    // @ts-ignore
    this.pedido = {};
    // @ts-ignore
    this.pedido.estado = {};
    this.getAllPedidos();
    this.peticion();
    this.getAllEstados();

  }
  delay(milisegundos: number) {
    return new Promise( resolve => setTimeout(resolve, milisegundos) );
  }
  async peticion() {
     console.log('Por Realizar peticion')
     await this.delay(30000);
     this.getAllPedidos();
     console.log('Peticion Realizada');
     this.peticion();
  }
  getAllPedidos() {
    this.pedidoApiService.getAllPedidos().subscribe(data => {
      this.pedidos = data;
      this.cantidadPedidos = data.length;

    } , error => {
      alert('Error al cargar pedidos');
    });

  }
  getAllEstados() {
    this.pedidoApiService.getAllEstados().subscribe(data => {
      this.estados = data;
      this.cantidadEstados = data.length;

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

  cambiarEstado(id:number, estado:string){
    console.log(id)
    if(estado == "finalizar"){
      this.updateEstado(id, 42)
    }
    else{
      this.updateEstado(id, 22)
    }
  }

  updateEstado(id:number, estado:number){

    const pedidos = [...this.pedidos];
    pedidos[this.pedidos.indexOf(this.pedidoSeleccionado)] = this.pedido;

    this.pedidoApiService.updateEstado(id, estado, this.pedido).subscribe(
      data => {
        this.mostrarToast( 'success' , 'Actualizado con exito' , data.id.toString());
        this.pedido = null;
        this.mostrarDialogo = false;
        this.clearMessage();
        this.getAllPedidos();  },
      error => {
        this.mostrarToast('error', 'Error al actualizar' , error.message);
        this.mostrarDialogo = false;
        this.clearMessage();
      }
    );

  }

  guardar() {
    const pedidos = [...this.pedidos];
    pedidos[this.pedidos.indexOf(this.pedidoSeleccionado)] = this.pedido;

    this.pedidoApiService.updatePedido(pedidos[this.pedidos.indexOf(this.pedidoSeleccionado)]
      , pedidos[this.pedidos.indexOf(this.pedidoSeleccionado)].id).subscribe(
      data => {
        this.mostrarToast( 'success' , 'Actualizado con exito' , data.id.toString());
        this.pedido = null;
        this.mostrarDialogo = false;
        this.clearMessage();
        this.getAllPedidos();  },
      error => {
        this.mostrarToast('error', 'Error al actualizar' , error.message);
        this.mostrarDialogo = false;
        this.clearMessage();
      }
    );

  }
  guardarConfirm() {
    this.mostrarConfirmar('Desea Actualizar este registro?' , 'Para proceder debe confirmar');
  }
  mostrarToast( tipoToast: string , sumario: string, detalle: string ) {
    this.toastMessages.add({key: 'toastArticulo', severity: tipoToast , summary: sumario, detail: detalle});
  }

  mostrarConfirmar(sumario: string , detalle: string) {
    this.toastMessages.clear();
    this.toastMessages.add({key: 'mensajeConfirmacion', sticky: true, severity: 'warn', summary: sumario,
      detail: detalle});
  }
  onReject() {
    this.toastMessages.clear('mensajeConfirmacion');
  }
  clearMessage() {
    this.toastMessages.clear('mensajeConfirmacion');
  }


}
