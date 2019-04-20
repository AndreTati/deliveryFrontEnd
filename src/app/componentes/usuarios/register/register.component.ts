import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../../servicios/auth.service';
import { Router } from '@angular/router';
import { ProvinciasInterface} from './ProvinciasInterface';
import { LocalidadesInterface } from './LocalidadesInterface';
import { DataApiService} from '../../../servicios/data-api.service';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],

})
export class RegisterComponent implements OnInit {
 public formGroup: FormGroup;
 public isError = true;
 public msgError:string = '';
 email:'';
 password:'';
public provincias: ProvinciasInterface[];
public cantidadProvincias: number;
  constructor(public router: Router, public authService: AuthService, public apiService: DataApiService, private formBuilder: FormBuilder) {}


  ngOnInit() {

    this.obtenerTodasLasProvincias();
    this.buildForm();

  }
  // Metodo que tiene las validaciones

  private buildForm(){
    this.formGroup = this.formBuilder.group({
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
    const control = this.formGroup.get(controlName);
    if (control.touched && control.errors != null){
      error = JSON.stringify(control.errors);
    }
    return error;
  }

  // METODO PARA OBTENER LAS PROVINCIAS DEL SELECT PROVINCIAS
  obtenerTodasLasProvincias() {
    this.apiService.getAllProvincias()
      .subscribe(data => { this.provincias = data ;  this.cantidadProvincias = data.length;}

      );
  }

  //METODO PARA OBTENER LAS LOCALIDADES CORRESPONDIENTES A LA PROVINCIA ELEGIDA


  // Metodo para registrar a los clientes
  registrar() {
const usuario = this.formGroup.value;
console.log(usuario);
    this.authService.registerUser(this.email, this.password)

 .then((res) => {
this.router.navigate(['/componentes/home']);
this.isError = false;
 }).catch (err => {
  this.msgError = err;
  alert(err);
  this.isError = true;

 } );
  }
}
