import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {pedidoInterface} from '../../componentes/cocinero/pedidoInterface';
import {estadoInterface} from '../../componentes/cocinero/estadoInterface';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(public httpApiSerivce: HttpClient) { }

  private _urlAllPedidos= 'http://apirestdelivery.herokuapp.com/api/v1/pedido/';
  private _urlAllEstados= 'http://apirestdelivery.herokuapp.com/api/v1/estado/';

  getAllPedidos(): Observable<pedidoInterface[]> {
    return this.httpApiSerivce.get<pedidoInterface[]>(this._urlAllPedidos);
  }
  getAllEstados(): Observable<estadoInterface[]> {
    return this.httpApiSerivce.get<estadoInterface[]>(this._urlAllEstados);

  }

}
