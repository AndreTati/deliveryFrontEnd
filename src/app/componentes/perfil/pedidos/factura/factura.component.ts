import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../../../Modelo/Usuario";
import {AuthService} from "../../../../servicios/auth.service";
import {UsuarioService} from "../../../../servicios/usuario/usuario.service";
import {Pedido} from "../../../../Modelo/Pedido";
import {PedidoService} from "../../../../servicios/pedido/pedido.service";
import {ActivatedRoute} from "@angular/router";
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styles: []
})
export class FacturaComponent implements OnInit {

  private cliente:Usuario = {id:0, nombre: "", apellido: "", fechaNacimiento: "", sexo: "", telefono: 0, email: "", dni: "", password: "", domicilio: {id:0, calle: "", departamento: 0, cp: 0, numero: 0, piso: 0, localidad: {id: 0, provincia:{ id: 0 }}, latitud: 0, longitud: 0}};
  private pedido:Pedido = {detalle: [], fecha: "", horaEstimadaFin: "", id: 0, montoDescuento: 0, tipoEnvio: "", total: 0, usuarioCliente: null, estado: null}
  cols:any[];

  constructor(private att:AuthService, private usuarioService:UsuarioService, private pedidoService: PedidoService, private act:ActivatedRoute) {
    this.att.isAuth().subscribe((data)=>{
      this.getUsuario(data.email);
    })
    this.act.params.subscribe((data)=>{
      this.getPedido(data.id)
    })
  }

  ngOnInit() {
    this.cols = [
      { field: 'cantidad', header: 'Cantidad' },
      { header: 'Nombre' }
    ];
  }

  getUsuario(email:string){
    this.usuarioService.getUsuario(email).subscribe((data) => {
      this.cliente = data;
    })
  }

  getPedido(id:number){
    this.pedidoService.getPedido(id).subscribe((data)=>{
      this.pedido = data;
    })
  }

  public captureScreen()
  {
    var data = document.getElementById('toPDF');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('factura_'+this.pedido.id+'_'+this.pedido.fecha+'.pdf'); // Generated PDF
    });
  }

}
