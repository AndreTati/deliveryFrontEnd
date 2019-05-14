import { Component, OnInit } from '@angular/core';
import {ArticuloService} from '../../../servicios/articulo/articulo.service';
import {articuloInterface} from '../articulo/articuloInterface';



@Component({
  selector: 'app-grafico-stock',
  templateUrl: './grafico-stock.component.html',
  styleUrls: ['./grafico-stock.component.css']
})
export class GraficoStockComponent implements OnInit {
  datosEstadisticos: any ;
  public articulos: articuloInterface[] ;
  public labels: any [];
  public datosNumericos: any [];
  private cargo: boolean;
  public stockMinimo : any [];
  public colorArray: any [];
  private colorArrayStockMinimo: any [];
  constructor( private stockApiSerivce: ArticuloService) {
    this.datosEstadisticos = [];
    this.labels = [];
    this.datosNumericos = [];
    this.colorArray = [];
    this.stockMinimo = [];
    this.colorArrayStockMinimo = [];
  }

  ngOnInit() {
    this.obtenerAllArticulos();
  }

  obtenerAllArticulos() {
    this.stockApiSerivce.getAllArticulos().subscribe(data => {
      this.articulos = data;
      this.impedanciaEstadisticas();
    }, error => {
      alert('Error al cargar los articulos' + error);
    });
  }
  impedanciaEstadisticas() {
    for (const articulo of this.articulos) {
      this.labels.push(articulo.nombre);
      this.datosNumericos.push(articulo.stock);
      this.stockMinimo.push(articulo.stockMinimo);
      this.colorArrayStockMinimo.push(this.getRandomColor());
      this.colorArray.push(this.getRandomColor());
    }
    this.implementarDatosEstadisticos();
  }
  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
  implementarDatosEstadisticos() {
    this.cargo = true;
    this.datosEstadisticos = {
      labels: this.labels,
      datasets: [
        {
          label: 'Stock Actual',
          backgroundColor: this.colorArray ,
          borderColor: this.colorArray,
          data: this.datosNumericos
        },
        {
          label: 'Stock Minimo',
          backgroundColor: this.colorArrayStockMinimo ,
          borderColor: this.colorArray,
          data: this.stockMinimo
        }
         ]
    };
  }

}
