import { Component, OnInit } from '@angular/core';
import {usuarioClienteInterface} from './usuarioClienteInterface';
import {UsuarioClienteABMService} from '../../../servicios/usuarioClienteABM/usuario-cliente-abm.service';


@Component({
  selector: 'app-usuarios-pagina',
  templateUrl: './usuarios-pagina.component.html',
  styleUrls: ['./usuarios-pagina.component.css']
})
export class UsuariosPaginaComponent implements OnInit {

  public mostrarDialogo: boolean;
  public usuarios: usuarioClienteInterface[];
  public columnas: any [];


  constructor(public usuarioClienteApi: UsuarioClienteABMService) { }

  ngOnInit() {
    this.columnas = [
      { field: 'id' , header: 'ID'},
      { field: 'email', header: 'Email'},
      { field: 'dni', header: 'D.N.I'},
      { field: 'nombre', header: 'Nombre'},
      { field: 'apellido', header: 'Apellido'},
      { field: 'telefono', header: 'Telefono'},
      { field: 'fechaNacimiento', header: 'Fecha Nacimiento'},
      { field: 'sexo', header: 'Sexo'},
      { field: 'domicilio', subfield : 'calle' , thirdfield: 'numero', header: 'Domicilio'}
    ];
    this.obtenerAllUsuarios();
  }
  obtenerAllUsuarios() {
    this.usuarioClienteApi.getAllUsuarios().subscribe(data => {
      this.usuarios = data;
    } , err => {
      console.log('Error', err);
    });
  }

}
