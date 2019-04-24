import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  
  constructor(private authService: AuthService, private afsAuth : AngularFireAuth) {  }
  public app_name = 'A GOOD TASTE';
  public isLogged = false;
  public emailLogeado: string;


  
  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log('Usuario Logeado');
        this.emailLogeado = auth.email;
        this.isLogged = true;
      } else {
        console.log('Usuario no logeado');
        this.isLogged = false;
      }
    });
  }
  onLogout() {
    this.afsAuth.auth.signOut();
  }

}
