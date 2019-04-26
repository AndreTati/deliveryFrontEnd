import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../Modelo/Usuario';
import {UsuarioService} from '../../servicios/usuario/usuario.service';
import {toDate} from '@angular/common/src/i18n/format_date';
import {Provincia} from '../usuarios/register/listarLocalidades';
import {DataApiService} from '../../servicios/data-api.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  private cliente:Usuario;
  private provincias:Provincia[];

  constructor(private usuarioService:UsuarioService, private dataService:DataApiService) {
    this.getUsuario();
    this.getProvincia();
  }

  ngOnInit() {
  }

  getUsuario(){
    this.usuarioService.getUsuario().subscribe((data) => {
      this.cliente = data;
    })
  }

  getProvincia(){
    this.dataService.getAllProvincias().subscribe((data)=>{
      this.provincias = data;
      console.log(data);
    })
  }

}
