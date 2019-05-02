import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardPageGuard implements CanActivate  {
  constructor(private afsAuth: AngularFireAuth , private router: Router) {}

  canActivate()  {
  if ( this.afsAuth.auth.currentUser) {
       // SI ESTA LOGEADO RETORNA TRUE
      return true;
    } else {
      this.router.navigate(['user/login']);
      return false;
    }
  }
  /*
  canActivaAdmin()  {
    if ( EN CASO DE SER ADMIN DEVOLVER TRUE) {
     return true;
    } else {
      // EN CASO DE NO SER ADMIN SE LO ENVIA AL HOME
      this.router.navigate(['']);
      return false;
    }
  } */

}
