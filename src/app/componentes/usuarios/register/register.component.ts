import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../../servicios/auth.service';
import { Router } from '@angular/router';
import { Provincia } from "./listarLocalidades";
import { Localidad } from "./listarLocalidades";
import { DataApiService} from '../../../servicios/data-api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Usuario} from "./usuarioInterface";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[MessageService],
})
export class RegisterComponent implements OnInit {

  public isError = true;
  public msgError:string = '';

  // PARTE DEL FORMULARIO
  public registroUsuario: FormGroup;
  submitted: boolean;
  // DECLARACIONES PARA EL CALENDARIO
  es:any;
  tr:any;
  minDate: Date;
  maxDate: Date;
  invalidDates: Array<Date>
  public mayorDe13:number;
  // DECLARACION DE LOS ATRIBUTOS DEL USUARIO
  email:'';
  password:'';

// ARRAYS para CARGAR SELECT
  public provincias: Provincia[];
  public cantidadProvincias: number;
  public localidades: Localidad[];
  public cantidadLocalidades: number;
  public fkProvinciaAuxiliar:number;

  constructor(public router: Router, public authService: AuthService, public apiService: DataApiService, private formBuilder: FormBuilder, private messageService: MessageService) {}


  ngOnInit() {

    this.obtenerTodasLasProvincias();
    this.buildForm();

  }

  // METODO QUE ARMA EL FORMULARIO CON ESTRUCTURA Y VALIDACIONES
  private buildForm(){

    this.registroUsuario = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      dni: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      telefono: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(7)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      domicilio:this.formBuilder.group({
        calle: new FormControl('', Validators.required),
        numero: new FormControl(null, Validators.compose([Validators.maxLength(5)])),
        piso: new FormControl('', Validators.compose([Validators.maxLength(2)])),
        departamento:new FormControl(null, Validators.compose([Validators.maxLength(3)])),
        localidad:this.formBuilder.group({
          id:new FormControl('', Validators.required)
        }),
        cp:new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(5)]))
      }),

      fechaNacimiento: new FormControl('', Validators.required),
      sexo: new FormControl('', Validators.required)
    });

  }

  // METODO QUE SE EJECUTA CUANDO SE INTENTE REGISTRAR A LA PERSONA PARA VALIDAR EL FORM
  ngOnSubmit(usuario: Usuario){
    this.submitted = true;
    this.messageService.add({severity:'info', summary:'Success', detail:'Form Submitted'});
    this.registrar(usuario);
  }


// MUESTRO CON UN TOAST EL ERROR DE INPUT
  muestraError(summary?: string, detail?: string){
    this.messageService.add({sticky: true, key: 'toast1', severity:'error', summary: summary, detail: detail});


  }


  public getError(controlName: string): string {
    let error = '';
    const control = this.registroUsuario.get(controlName);
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
        return false;
      } )
  }

  // METODO PARA REGISTRAR TANTO EN BD COMO EN FIREBASE
  registrar(usuario: Usuario) {
    let auxPassword = usuario.password;
    usuario.password = "*******";
    usuario = this.registroUsuario.value;
    console.log(this.registroUsuario.value);

    this.authService.registerUser(usuario.email, auxPassword)
      .then((res) => {
        this.registrarUsuario(usuario);
        this.router.navigate(['/componentes/home']);
        this.isError = false;
      }).catch (err => {
      this.msgError = err;
      alert(err);
      this.isError = true;
    })




  }



//FIN DE CLASE
}
