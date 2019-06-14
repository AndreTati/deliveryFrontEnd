import { Component, OnInit } from '@angular/core';
import {PedidoService} from '../../../servicios/pedido/pedido.service';
import {Pedido} from '../../../Modelo/Pedido';
import {pedidoInterface} from '../../cocinero/pedidoInterface';

@Component({
  selector: 'app-comprobantes',
  templateUrl: './comprobantes.component.html',
  styles: []
})
export class ComprobantesComponent implements OnInit {

  columnas: any[];
  cols2: any[];
  pedidos: Pedido[] = [];
  pedidoSeleccionado: pedidoInterface;
  // @ts-ignore
  pedidoDetalle: Pedido = {};
  display:boolean = false;


  constructor(private servicio: PedidoService) {
    this.columnas = [
      { field: 'fecha', header: 'Fecha' },
      { field: 'horaEstimadaFin', header: 'Hora Estimada Fin' },
      { field: 'detalle', header: 'Detalle' },
      { field: 'estado.nombre' , header: 'Estado'}
    ];

    this.cols2 = [
      { field: 'cantidad', header:'Cantidad' }
    ]

    this.getAll();
  }

  ngOnInit() {

  }

  getAll(){
    this.servicio.getPedidosPosta().subscribe((data)=>{
      this.pedidos = data;
    })
  }

  mostrarDetalle(id: number){
    this.display = true;
    // @ts-ignore
    this.pedidoDetalle = {};
    this.getOne(id)
  }

  getOne(id:number){
    for(let pedidoInterno of this.pedidos){
      if(pedidoInterno.id == id){
        this.pedidoDetalle = pedidoInterno;
        break;
      }
    }
  }

}
