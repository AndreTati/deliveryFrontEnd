import { Injectable } from '@angular/core';
import {  CanActivate, Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {DataApiService} from '../servicios/data-api.service';
import {RolInterface} from './rolInterface';

@Injectable({
  providedIn: 'root'
})
export class RolCocineroGuard implements CanActivate  {
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
  async getRol()    {
    await this.apiService.getPermisos(this.afsAuth.auth.currentUser.email).subscribe( res => {
      this.usuario = res;
      console.log(this.usuario.rol);
      this.verificar();
    });
  }
      verificar()  {
      if (this.usuario.rol === 'Cocinero') {
      console.log('Eres Cocinero');
      this.estado = true;
    } else {
      console.log('No tienes permisos para entrar aqui')
      this.router.navigate(['/catalogo/lista']);
      this.estado = false;
    }
  }
}
