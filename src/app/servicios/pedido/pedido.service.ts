import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {pedidoInterface} from '../../componentes/cocinero/pedidoInterface';
import {estadoInterface} from '../../componentes/cocinero/estadoInterface';
import {Pedido} from "../../Modelo/Pedido";
import {Usuario} from "../../componentes/usuarios/register/usuarioInterface";

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(public httpApiService: HttpClient) { }

  private _urlAllPedidos= 'https://apirestdelivery.herokuapp.com/api/v1/pedido/';
  private _urlAllEstados= 'https://apirestdelivery.herokuapp.com/api/v1/estado/';
  private _urlAllPedidoXId = 'https://apirestdelivery.herokuapp.com/api/v1/pedido/byUser/';

  getAllPedidos(): Observable<pedidoInterface[]> {
    return this.httpApiService.get<pedidoInterface[]>(this._urlAllPedidos);
  }
  getAllEstados(): Observable<estadoInterface[]> {
    return this.httpApiService.get<estadoInterface[]>(this._urlAllEstados);

  }
  updatePedido( objeto: pedidoInterface , id: number): Observable <pedidoInterface>  {
    return this.httpApiService.put<pedidoInterface>( this._urlAllPedidos + '' + id, objeto  , );
  }

  getAllPedidosxId(id:number){
    return this.httpApiService.get<Pedido[]>(this._urlAllPedidoXId+id);
  }

  // METODO POST PARA CONFIRMAR PEDIDOS

  postPedido(pedido: Pedido): Observable<any>{

    return this.httpApiService.post<Usuario>(this._urlAllPedidos, pedido);
  }

}
