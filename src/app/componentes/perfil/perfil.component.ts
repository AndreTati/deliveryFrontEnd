import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../Modelo/Usuario';
import {UsuarioService} from '../../servicios/usuario/usuario.service';
import {toDate} from '@angular/common/src/i18n/format_date';
import {Provincia} from '../usuarios/register/listarLocalidades';
import {DataApiService} from '../../servicios/data-api.service';
import {AuthService} from '../../servicios/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  private cliente:Usuario;
  private provincias:Provincia[];
  private provinciaSeleccionada:number;
  private localidades:Provincia[];
  private email:string;

  constructor(private usuarioService:UsuarioService, private dataService:DataApiService, private att:AuthService) {
    this.att.isAuth().subscribe((data)=>{
      this.email = data.email;
      this.getUsuario(this.email);
    })

    this.getProvincia();
    this.getLocalidad();
  }

  ngOnInit() {
  }

  getSexo(event?:any){
    if(event != undefined)
      this.cliente.sexo = event.target.value;
  }

  putUsuario(usuario:Usuario){
    console.log("put");
    this.usuarioService.putUsuario(this.cliente).subscribe((data) => {
    });
  }

  getUsuario(email:string){
    this.usuarioService.getUsuario(email).subscribe((data) => {
      this.cliente = data;
      this.provinciaSeleccionada = data.domicilio.localidad.provincia.id;
      console.log(data.domicilio.localidad.provincia.id);
    })
  }

  getProvincia(){
    this.dataService.getAllProvincias().subscribe((data)=>{
      this.provincias = data;
    })
  }

  getLocalidad(event?: any){
    if(event != undefined){
      this.provinciaSeleccionada = event.target.value;
      console.log(this.provinciaSeleccionada);
    }
    this.dataService.getAllLocalidades().subscribe((data)=>{
      this.localidades = data;
    })
  }

}
