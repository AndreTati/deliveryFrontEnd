import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {pedidoInterface} from '../../componentes/cocinero/pedidoInterface';
import {estadoInterface} from '../../componentes/cocinero/estadoInterface';
import {Pedido} from "../../Modelo/Pedido";

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(public httpApiSerivce: HttpClient) { }

  private _urlAllPedidos= 'http://apirestdelivery.herokuapp.com/api/v1/pedido/';
  private _urlAllEstados= 'http://apirestdelivery.herokuapp.com/api/v1/estado/';
  private _urlAllPedidoXId = 'http://apirestdelivery.herokuapp.com/api/v1/pedido/byUser/';

  getAllPedidos(): Observable<pedidoInterface[]> {
    return this.httpApiSerivce.get<pedidoInterface[]>(this._urlAllPedidos);
  }
  getAllEstados(): Observable<estadoInterface[]> {
    return this.httpApiSerivce.get<estadoInterface[]>(this._urlAllEstados);

  }
  updatePedido( objeto: pedidoInterface , id: number): Observable <pedidoInterface>  {
    return this.httpApiSerivce.put<pedidoInterface>( this._urlAllPedidos + '' + id, objeto  , );
  }

  getAllPedidosxId(id:number){
    return this.httpApiSerivce.get<Pedido[]>(this._urlAllPedidoXId+id);
  }

}
