import { LowerCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/servicios/auth.service';
import { MostrarService } from 'src/app/servicios/mostrar.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  elements:any[]=['Masculino', 'Femenino']

  formulario: FormGroup

  editar : boolean

  mostrarTeam= false

  public d: any

  dep: any

  constructor(private fb: FormBuilder, private _auth: AuthService, private _router: Router, private _snackBar: MatSnackBar, private _mostrar: MostrarService ) {
    this.editar=_mostrar.editar
    this.mostrarTeam=_mostrar.porTeam
    if(this.editar){
      this.d= _mostrar.GetActualizacion()

      this.formulario=this.fb.group({
        usuario: [this.d.name, Validators.required],
        deporte: [this.d.deporte, Validators.required],
        password: [this.d.password, Validators.required],
        grupo: [this.d.grupo, Validators.required],
        sexo: [this.d.sexo, Validators.required],
      })

    }else if (!this.mostrarTeam){
      this.formulario=this.fb.group({
        usuario: ['', Validators.required],
        deporte: ['', Validators.required],
        password: ['', Validators.required],
        grupo: ['', Validators.required],
        sexo: ['', Validators.required],
      })
    }else {
      console.log('1')
      this.dep=_mostrar.getEquipo()
      this.formulario=this.fb.group({
        usuario: ['', Validators.required],
        deporte: [this.dep.deporte, Validators.required],
        password: ['', Validators.required],
        grupo: ['', Validators.required],
        sexo: [this.dep.sexo, Validators.required],
      })
      this.formulario.get('deporte')?.disable()
      this.formulario.get('sexo')?.disable()

    }


  }

  ngOnInit(): void {
  }

  RegistrarDeportista(){
    if(this.mostrarTeam){
      const deportista: any = {
        name: this.formulario.value.usuario,
        deporte: this.dep.deporte,
        password: this.formulario.value.password,
        grupo: this.formulario.value.grupo,
        sexo: this.dep.sexo
      }
      this._auth.registerDeportista(deportista)
        .subscribe(
          res=>{

            localStorage.setItem('token',res)
            this._router.navigate(['/plantilla'])
            this._snackBar.open('deportista añadido', '',{
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            })
          },
          error=> {

            const e= error.error.substring(23, error.error.length-2)

            this.formulario.reset();
            this._snackBar.open(e, '',{
              duration: 8000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            })
          }
        )
    }else
    if(!this.editar){
      const deportista: any = {
        name: this.formulario.value.usuario,
        deporte: this.formulario.value.deporte,
        password: this.formulario.value.password,
        grupo: this.formulario.value.grupo,
        sexo: this.formulario.value.sexo
      }

      this._auth.registerDeportista(deportista)
        .subscribe(
          res=>{

            localStorage.setItem('token',res)
            this._router.navigate(['/plantilla'])
            this._snackBar.open('deportista añadido', '',{
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            })
          },
          error=> {
            const e= error.error.substring(23, error.error.length-2)

            this.formulario.reset();
            this._snackBar.open(e, '',{
              duration: 8000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            })
          }
        )
    }else{
      const deportista: any = {
        name: this.formulario.value.usuario,
        deporte: this.formulario.value.deporte,
        password: this.formulario.value.password,
        grupo: this.formulario.value.grupo,
        sexo: this.formulario.value.sexo.toString(),
      }

      this._mostrar.UpdateDeportista(deportista, this.d.id)
        .subscribe(
          res=>{

            this._router.navigate(['/plantilla'])
            this._snackBar.open('deportista actualizado', '',{
              duration: 1500,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            })
          },
          error=> {
            this.ValueUpdate();
            this._snackBar.open('no se puede añadir al deportita primero registrarte en los usuarios', '',{
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            })
          }
        )

    }


  }

  ValueUpdate(){
    this.d= this._mostrar.GetActualizacion()

      this.formulario=this.fb.group({
        usuario: [this.d.name, Validators.required],
        deporte: [this.d.deporte, Validators.required],
        password: [this.d.password, Validators.required],
        grupo: [this.d.grupo, Validators.required],
        sexo: [this.d.sexo, Validators.required],
      })
  }


}
