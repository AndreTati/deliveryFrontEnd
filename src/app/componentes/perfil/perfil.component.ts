import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../Modelo/Usuario';
import {UsuarioService} from '../../servicios/usuario/usuario.service';
import {Provincia} from '../usuarios/register/listarLocalidades';
import {DataApiService} from '../../servicios/data-api.service';
import {AuthService} from '../../servicios/auth.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [],
  providers: [MessageService]
})
export class PerfilComponent implements OnInit {

  private cliente:Usuario;
  private provincias:Provincia[];
  private provinciaSeleccionada:number;
  private localidades:Provincia[];
  private email:string;

  constructor(private usuarioService:UsuarioService, private dataService:DataApiService, private att:AuthService, private messageService:MessageService) {
    this.att.isAuth().subscribe((data)=>{
      this.email = data.email;
      this.getUsuario(this.email);
    })

    this.getProvincia();
    this.getLocalidad();
  }

  ngOnInit() {
  }

  showConfirm() {
    this.messageService.clear();
    this.messageService.add({key: 'confirmacion', sticky: true, severity:'warn', summary:'Desea actualizar su perfil?', detail:'Confirme para proceder'});
  }

  closeAndUpdate(update:boolean) {
    this.messageService.clear('confirmacion');
    if(update==true){
      this.putUsuario();
    }
  }

  getSexo(event?:any){
    if(event != undefined)
      this.cliente.sexo = event.target.value;
  }

  putUsuario(){
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
