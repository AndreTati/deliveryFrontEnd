import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Plato} from "../../Modelo/Plato";

@Injectable({
  providedIn: 'root'
})
export class PlatoService {
  private platos: Plato[];
  private cantidadPlatos: number;

  constructor(public httpClientApi: HttpClient) {

  }
  private _urlAllPlatos = 'https://apirestdelivery.herokuapp.com/api/v1/plato/';

  getAllPlatos(): Observable<Plato[]> {
    return this.httpClientApi.get<Plato[]>(this._urlAllPlatos);
  }
  postPlato( plato: Plato): Observable<Plato> {
    return this.httpClientApi.post<Plato>(this._urlAllPlatos , plato);
  }
  updatePlato(plato: Plato , id: number) {
    return this.httpClientApi.put<Plato>(this._urlAllPlatos + '' + id, plato);
  }
  deletePlato(id: number): Observable <Plato> {
    return this.httpClientApi.delete<Plato>(this._urlAllPlatos + '' + id)
  }



}
