import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {DataApiService} from '../servicios/data-api.service';
import {RolInterface} from './rolInterface';

@Injectable({
  providedIn: 'root'
})
export class RolAdminGuard implements CanActivate  {
  private usuario: RolInterface;
  constructor(private afsAuth: AngularFireAuth , private router: Router , private apiService: DataApiService) {

    this.apiService.getPermisos(this.afsAuth.auth.currentUser.email).subscribe( res => {
      this.usuario = res;
      console.log(this.usuario.rol);
    });
  }

  canActivate() {
      if (this.usuario.rol === 'Administrador') {
       return true;

     } else {
       this.router.navigate(['/catalogo/lista']);
       return false;
    }
  }
}
