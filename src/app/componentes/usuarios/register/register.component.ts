import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../../servicios/auth.service';
import {Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public router: Router , public authService : AuthService) { }
  public email : string = '';
  public password : string = '';
  public  isError : boolean = false;
  public msgError : string = "";

  ngOnInit() {
  }
  onAddUser  ( ) {
 this.authService.registerUser(this.email,this.password)

 .then((res)=>{
this.router.navigate(["/componentes/home"]);
this.isError= false;
 }).catch (err => {
  this.msgError= err;
  this.isError= true;

 } );
  }

}
