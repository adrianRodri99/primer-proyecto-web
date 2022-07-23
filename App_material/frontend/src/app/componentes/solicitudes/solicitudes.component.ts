import { Component, OnInit, ViewChild } from '@angular/core';


import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MostrarService } from 'src/app/servicios/mostrar.service';
import { subscribeOn } from 'rxjs';



@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {

  mostrarTabla: boolean = false;

  dataTabla= new  MatTableDataSource<any>([]);

  datos: any=1;

  columnas: string[]= ['grupo', 'name','tipo de solicitud', 'confirmar solicitud']

  deporte='volleyball'

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _mostrar: MostrarService, private _snackBar: MatSnackBar, private _router: Router) { }

  ngOnInit(): void {
    this.deporte= this._mostrar.getEquipiSolicitud()
   this.CargarDatos()

  }

  llenarTabla(){

    this.mostrarTabla=true;
    this.dataTabla.data=this.datos;
  }
  BuscarPor(e: Event){
    const busquedaValue = (e.target as HTMLInputElement).value;
    this.dataTabla.filter = busquedaValue.trim().toLowerCase();
   }

  CargarDatos(){
    this.deporte= this._mostrar.getEquipiSolicitud()
    this._mostrar.getTablaSolicitude(this.deporte)
    .subscribe(
      res=>{
        this.datos=res;
        this.llenarTabla()
      },
      error=>{
        const e= error.error.substring(23, error.error.length-2)

        this._snackBar.open(e, '',{
          duration: 8000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
      }
    )
    setTimeout(()=>{
      this.dataTabla.paginator=this.paginator;
      this.dataTabla.sort=this.sort;
    })
  }

  ConfirmarSolicitud(e: any){
    const s={
      deporte: e.deporte,
      confirmar_solicitud: true
    }
    this._mostrar.confirmarSolicitud(s, e.id)
      .subscribe(
        res=>{
          this._snackBar.open('solicitud confirmada', '',{
            duration: 8000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          })

        },
        error=>{
          const e= error.error.message

          this._snackBar.open(e, '',{
            duration: 8000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          })
        }
      )

    this.CargarDatos()
    this.CargarDatos()
    this.CargarDatos()
  }


  DenegarSolicitud(e: any){
    const s={
      deporte: e.deporte,
      confirmar_solicitud: false
    }

    this._mostrar.confirmarSolicitud(s, e.id)
    .subscribe(
      res=>{
        this._snackBar.open('solicitud denegada', '',{
          duration: 8000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
      },
      error=>{
        const e= error.error.message

        this._snackBar.open(e, '',{
          duration: 8000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
      }
    )

    this.CargarDatos()
    this.CargarDatos()
    this.CargarDatos()
  }




}
