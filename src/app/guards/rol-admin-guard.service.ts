import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {DataApiService} from '../servicios/data-api.service';
import {RolInterface} from './rolInterface';
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";

@Injectable({
  providedIn: 'root'
})
export class RolAdminGuard implements CanActivate  {
  private usuario: RolInterface;
  private estado: boolean;

  constructor(private afsAuth: AngularFireAuth , private router: Router , private apiService: DataApiService) {
    // @ts-ignore
    this.usuario = {};
  }
    canActivate(): boolean {
    this.getRol();
    return this.estado;
  }
    getRol()    {
     this.apiService.getPermisos(this.afsAuth.auth.currentUser.email).subscribe( res => {
      this.usuario = res;
      console.log(this.usuario.rol);
      this.verificar();
    });
      }
  verificar()  {
    if (this.usuario.rol === 'Administrador') {
      console.log('Eres Administrador');
      this.estado = true;
      } else {
      console.log('No tienes permisos para entrar aqui')
      this.router.navigate(['/catalogo/lista']);
      this.estado = false;
     }
  }
}
