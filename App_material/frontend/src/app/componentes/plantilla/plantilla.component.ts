import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Router } from '@angular/router';
import { MostrarService } from 'src/app/servicios/mostrar.service';



/*
 export interface deportista{
  deporte: string,
​​  grupo: number,​​
 // id: number,
​​  name: string,
//​​  password: string
}
*/

@Component({
  selector: 'app-plantilla',
  templateUrl: './plantilla.component.html',
  styleUrls: ['./plantilla.component.css']
})


export class PlantillaComponent implements OnInit {

  datos: any = 1 //asi pq si no me sale un warnning d q la varialble esta vacia

  mostrarTabla=false

  dataTabla = new MatTableDataSource<any>([])

  columnas: string[]= ['grupo', 'name', 'deporte','sexo', 'acciones']

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  mostrarTeam=false



  constructor(private _mostrar: MostrarService,  private _snackBar: MatSnackBar, private _router: Router) { }

  ngOnInit(): void {
    this.mostrarTeam=this._mostrar.porTeam
    this._mostrar.getMostrarTabla()
    .subscribe(
      res=>{ this.datos=res
        this.llenarTabla()
        if(this.mostrarTeam){
          const dep=this._mostrar.getEquipo()
          this.BuscarNombre(dep)
        }



      },
      error=> console.log(error)
    )
    //esto pa paginar (cargar dos veces porque se va)
    setTimeout(()=>{
    this.dataTabla.paginator=this.paginator;
    this.dataTabla.sort=this.sort;
    })
  }

 // no me funciona la paginacion co esto
 /*
  ngAfterViewInit(){
    this.dataTabla.paginator=this.paginator;
    this.dataTabla.sort=this.sort;
    console.log('ya')
  }

 */

  CargarDatos(){

    this._mostrar.getMostrarTabla()
    .subscribe(
      res=>{ this.datos=res

        this.llenarTabla()

      },
      error=> console.log(error))
      setTimeout(()=>{
        this.dataTabla.paginator=this.paginator;
        this.dataTabla.sort=this.sort;
      })
  }

  llenarTabla(){

    this.mostrarTabla=true;
    this.dataTabla.data=this.datos;


  }

 BuscarPor(e: Event){
  const busquedaValue = (e.target as HTMLInputElement).value;
  this.dataTabla.filter = busquedaValue.trim().toLowerCase();
 }


 EliminarDeportista(e: number, a: any){
    console.log(a)
    this._mostrar.deleteDeportista(e, a)
    .subscribe(
      res=>{ console.log(res)

      },
      error=> console.log(error)
    )
    this.CargarDatos(); //llamo varias veces porque no actualiza con una
    this.CargarDatos();
    this._snackBar.open('deportista eliminado de la plantilla', '',{
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
    this.CargarDatos();
    this.CargarDatos();
    this.CargarDatos();
    this.CargarDatos();


  }

  BuscarNombre(name: string){

    document.getElementById('filtro')?.setAttribute('value',name);
    this.dataTabla.filter = name.toLowerCase();

  }
  ActualizarDeportista(deportista: any){

    this._mostrar.SetActualizacion(deportista);
    this._router.navigate(['/registrar'])

  }






}
