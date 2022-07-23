import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loginURL="http://localhost:3000/api/login";

  private _registerURL="http://localhost:3000/api/register";


  private _registerUsersURL="http://localhost:3000/api/registerUsers";

  private _RolCapitan="http://localhost:3000/api/capitanDeporte"

  private _Rol="http://localhost:3000/api/dameRol"

  public rol: any


  constructor(private http: HttpClient) { }

  loginUser(user: any){
    return this.http.post(this._loginURL, user,{responseType: "text"})
  }

  registerDeportista(user: any){
    return this.http.post(this._registerURL, user,{responseType: "text"})
  }

  registerUsers(user: any){
    return this.http.post(this._registerUsersURL, user,{responseType: "text"})

  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  capturarRol(e: any){
    return this.http.post(this._Rol, e, {responseType: "text"} )
  }

}
