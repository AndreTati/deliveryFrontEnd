import { Component, OnInit } from '@angular/core';
import {usuarioClienteInterface} from '../usuarios-pagina/usuarioClienteInterface';
import {UsuarioClienteABMService} from '../../../servicios/usuarioClienteABM/usuario-cliente-abm.service';
import {DatePipe} from '@angular/common';
@Component({
  selector: 'app-clientes-registrados',
  templateUrl: './clientes-registrados.component.html',
  styleUrls: ['./clientes-registrados.component.css']
})
export class ClientesRegistradosComponent implements OnInit {
  public datosEstadisticos: any ;
  public datosTraidos: any [];
  public usuarios: usuarioClienteInterface [];
  public labels: any[];
  public datos: any [];
  public colorArray: any [];
  private cargo: boolean;
  public  fechaFiltro: any ;
  private fecha: string;
  public totalUsuarios = 0;
  constructor(private userApiSerice: UsuarioClienteABMService , private datePipe: DatePipe) {
    this.labels = [];
    this.datos = [];
    this.colorArray = [];
    this.datosEstadisticos = [];
    this.datosTraidos = [];
    this.usuarios = [];
    this.fechaFiltro = '';
    this.fecha = '';

  }

  ngOnInit() {
    this.obtenerAllUsuarios();
  }
  obtenerAllUsuarios() {
    this.userApiSerice.getAllUsuarios().subscribe(data => {
    this.usuarios = data ;
    //this.impedanciaEstadisticas('1930/20/11');
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
    this.totalUsuarios = 0;
    this.labels = []; this.datosTraidos = [];
    this.fechaFiltro = new Date( fecha );
    for (const usuario of this.usuarios) {
      let arrayString  = usuario.alta.split('/');
      let fechaFixeada = (arrayString[1] + '/' + arrayString[0] + '/' + arrayString[2]);
      const altaUsuario = new Date(fechaFixeada);
      if ( altaUsuario >= this.fechaFiltro) {
        this.totalUsuarios += 1;
        this.labels.push(usuario.email);
        this.datosTraidos.push(1);
        this.colorArray.push(this.getRandomColor()); }
    }
    this.implementarDatos();
  }
  implementarDatos() {
    this.cargo = true;
    this.datosEstadisticos = {
      labels: this.labels,
      datasets: [
        {
          label: 'Usuarios Registrados en La web',
          backgroundColor: this.colorArray ,
          borderColor: this.colorArray,
          data: this.datosTraidos,
        }
      ]
    };
  }
}
