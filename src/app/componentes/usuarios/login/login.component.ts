import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'; // desde documentacion ANGULAR FIREBASE
import { auth } from 'firebase/app'; // DESDE DOCUMENTACION
import {AuthService} from '../../../servicios/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService) {
  }
  public email = '';
  public password = '';
  public isLogged = false ;
  public isError = false;
  public msgError = '';

  ngOnInit() {

  }

  onLogin(): void  {
    this.authService.loginEmailUser(this.email, this.password)
    .then((res) => {
       alert('Bienvenido:' + this.email);
       this.isLogged = true;
       this.isError = false;
       this.router.navigate(['']);

    }).catch(err => {
    this.msgError = err;
    this.isError = true;
    });
  }



}
