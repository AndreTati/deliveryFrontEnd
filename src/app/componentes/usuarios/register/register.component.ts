import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../../servicios/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProvinciasInterface} from './ProvinciasInterface';
import { DataApiService} from '../../../servicios/data-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],

})
export class RegisterComponent implements OnInit {
  public email: string = '';
  public password: string = '';
  public isError: boolean = false;
  public msgError: string = '';
  private ngForm: FormGroup;
  submitted = false;
  public provincias: ProvinciasInterface[];

  constructor(public router: Router, public authService: AuthService, private formBuilder: FormBuilder, public apiService: DataApiService) {

  }


  ngOnInit() {
    this.apiService.getAllProvincias()
      .subscribe(data => {
        this.provincias = data ;
      })



    this.ngForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dni: ['', Validators.required],
      telefono: ['', Validators.required],
      password: ['', Validators.required],
      calle: ['', Validators.required],
      numerocalle: ['', Validators.required],
      numeropiso: ['', Validators.required],
      numerodepto: ['', Validators.required],
      localidad: ['', Validators.required],
      codigopostal: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      sexo: ['', Validators.required],
      mensaje: ['', [Validators.required, Validators.minLength(1)]]
    });
  }
  onAddUser() {
    this.submitted = true;

    if (this.ngForm.invalid) {
      return;
    }
    this.authService.registerUser(this.email, this.password)

 .then((res) => {
this.router.navigate(['/componentes/home']);
this.isError = false;
 }).catch (err => {
  this.msgError = err;
  this.isError = true;

 } );
  }

}
