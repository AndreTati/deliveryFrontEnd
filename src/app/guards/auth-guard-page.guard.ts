import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {AngularFireAuth} from '@angular/fire/auth';
import {DataApiService} from "../servicios/data-api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardPageGuard implements CanActivate  {

  constructor(private afsAuth: AngularFireAuth , private router: Router) {}

  canActivate() {
  if ( this.afsAuth.auth.currentUser) {
         return true;
    } else {
      this.router.navigate(['user/login']);
      return false;
    }
  }


}
