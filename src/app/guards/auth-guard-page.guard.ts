import { Injectable } from '@angular/core';
import {  CanActivate, Router} from '@angular/router';

import {AuthService} from '../servicios/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';



@Injectable({
  providedIn: 'root'
})
export class AuthGuardPageGuard implements CanActivate  {
  private status: boolean ;

  constructor(private authService: AngularFireAuth , private router: Router) {
   }
  canActivate(): boolean {
    console.log(this.authService.auth.currentUser)
     if (this.authService.auth.currentUser) {
       console.log('Authorizado , Logeado')
       return true;
       } else {
       console.log('No estas Autorizado ,Debes logear')
       this.router.navigate(['user/login'])
       return false;
     }
  }



}
