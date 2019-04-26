import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../../servicios/auth.service';
import { Router } from '@angular/router';
import { Provincia } from "./listarLocalidades";
import { Localidad } from "./listarLocalidades";
import { DataApiService} from '../../../servicios/data-api.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Domicilio, Usuario} from "./usuarioInterface";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],

})
export class RegisterComponent implements OnInit {
 public registroUsuario: FormGroup;
 public isError = true;
 public msgError:string = '';
 public fkProvinciaAuxiliar:number;
 public sexos:string[] = ['Masculino', 'Femenino'];
public usuario:Usuario;
 // DECLARACION DE LOS ATRIBUTOS DEL USUARIO
  email:'';
  password:'';
  sexo:'';

  public provincias: Provincia[];
public cantidadProvincias: number;
public localidades: Localidad[];
public cantidadLocalidades: number;
  constructor(public router: Router, public authService: AuthService, public apiService: DataApiService, private formBuilder: FormBuilder) {}


  ngOnInit() {

    this.obtenerTodasLasProvincias();
    this.buildForm();

  }
  // Metodo que tiene las validaciones

  private buildForm(){

    this.registroUsuario = this.formBuilder.group({
      nombre:'',
      email:'',
      password:'',
      apellido:'',
      dni:'',
      telefono: null,
      fechaNacimiento:'',
      sexo: '',
      calle:'',
      numero:null,
      piso:null,
      departamento:null,
      provincia:'',
      localidad:'',
      codigopostal:null
    });
  }

  public getError(controlName: string): string {
    let error = '';
    const control = this.registroUsuario.get(controlName);
    if (control.touched && control.errors != null){
      error = JSON.stringify(control.errors);
    }
    return error;
  }
// METODO DE CAMBIO DE RADIO BUTTON

  radioChange(event : any){
    this.sexo = event.target.value;
  }
  // METODO PARA OBTENER LAS PROVINCIAS DEL SELECT PROVINCIAS
  obtenerTodasLasProvincias() {
    this.apiService.getAllProvincias()
      .subscribe(data => { this.provincias = data ;  this.cantidadProvincias = data.length;}

      );
  }

  //METODO PARA OBTENER LAS LOCALIDADES CORRESPONDIENTES A LA PROVINCIA ELEGIDA
 obtenerLocalidades(event : any){

this.fkProvinciaAuxiliar = event.target.value;
console.log(this.fkProvinciaAuxiliar);
   this.apiService.getAllLocalidades()
     .subscribe(data => { this.localidades = data ;  this.cantidadLocalidades = data.length; }

     );
 }

 // METODO PARA REGISTRAR EL FORM EN NUESTRA BASE DE DATOS
  registrarUsuario(usuario: Usuario){
    this.apiService.setUsuario(usuario).subscribe((res)=>{
        console.log('SE INSERTO EL USUARIO CORRECTAMENTE');
        console.log(res);
      },
      err=>{
        console.log(" Error..");
        console.log(err);
      } )
  }

 // Metodo para registrar a los clientes
  registrar(usuario: Usuario) {

    console.log(usuario);
    let auxPassword = usuario.password;
    usuario.password = "*******";
    usuario = this.registroUsuario.value;
console.log(this.registroUsuario.value);
//this.registrarUsuario(usuario);
/*
this.authService.registerUser(this.email, auxPassword)

 .then((res) => {
this.router.navigate(['/componentes/home']);
this.isError = false;
 }).catch (err => {
  this.msgError = err;
  alert(err);
  this.isError = true;

 } );
  }*/
}



//FIN DE CLASE
}
