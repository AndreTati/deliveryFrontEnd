import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {DataApiService} from '../../servicios/data-api.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(private authService: AuthService, private afsAuth: AngularFireAuth, private apiSerivce: DataApiService) {
    this.getCurrentUser();
    this.getRol();
  }
  public app_name = 'A GOOD TASTE';
  public isLogged = false;
  public emailLogeado: string;
  public esAdmin = false;
  public esCocinero = false;


  ngOnInit() {
    this.getCurrentUser();

  }

  async getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log('Usuario Logeado');
        this.emailLogeado = auth.email;
        this.isLogged = true;
        this.getRol();
      } else {
        console.log('Usuario no logeado');
        this.isLogged = false;
      }
    });
  }
   getRol() {
    this.apiSerivce.getPermisos(this.emailLogeado).subscribe(data => {

      switch (data.rol.toString()) {
        case 'Administrador': {
          this.esAdmin = true;
          break; }
        case 'Cocinero': {
          this.esCocinero = true;
          break; }
        default:
          break;

      }
      } , error => {console.log('ERROR', error.message); }); }

  onLogout() {
    this.afsAuth.auth.signOut();
  }

}
