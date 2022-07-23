import { Component, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';

import { AuthService } from 'src/app/servicios/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginUsersData={ "name": null, "password":null }

  cargando= false;
  login= true;


  constructor(private _auth: AuthService, private _snackBar: MatSnackBar,
    private _router: Router

    )
     {


   }

  ngOnInit(): void {
  }

  LoginUsers(){
    if(this.login){
      this._auth.loginUser(this.loginUsersData)
      .subscribe(
        res=>{
          this.fakeLoading()
          this.DefinirRol()
          localStorage.setItem('token',res)

        },
        error=>{
          this._snackBar.open('usuario o contrasñas invalidos', 'salir',{
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          })
        }
      )
    }
    else{
      this._auth.registerUsers(this.loginUsersData)
      .subscribe(
        res=>{
          console.log(res)
          this.fakeLoading()
          localStorage.setItem('token',res)

        },
        error=>{
          this._snackBar.open(error.message, '',{
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          })
        }
      )
    }

  }


  //no me sale habilitar el boton del ingresar
  PermitirLogin(): void {
    let validar=document.getElementById("input1")?.nodeValue;
    let validar2=document.getElementById("input1")?.nodeValue;

    if(validar==="" || validar2===""){
      document.getElementById('btn')?.removeAttribute('disabled')
    }
  }


  DefinirRol(){

    this._auth.capturarRol(this.loginUsersData.name)
      .subscribe(
        res=>{
          this._auth.rol=res;
          console.log(res)

        },
        error=>{
          console.log(error)
        }
      )


  }


  fakeLoading(){
    this.cargando=true;

    setTimeout(()=>{
      this.cargando=false;
      this._router.navigate(['/plantilla'])
    }, 5000)

  }
  CambiarLogin(){
    this.login=!this.login
  }

}
