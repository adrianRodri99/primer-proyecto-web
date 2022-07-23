import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class MostrarService {

  private _eventSpecialURL="http://localhost:3000/api/tablaPlantilla";

  private _deporteslURL="http://localhost:3000/api/deportes";

  private _solicitudeslURL="http://localhost:3000/api/tablaSolicitudes/";

  private _updateSolicitudURL="http://localhost:3000/api/solicitud/";


  public editar: boolean= false

  private deportista: any

  private teamSolicitud: any = null



  constructor(private http: HttpClient) { }


 //peticiones http al back
  getMostrarTabla(){
    return this.http.get(this._eventSpecialURL)
  }

  deleteDeportista(id: number, d: any){
    return this.http.delete("http://localhost:3000/api/deportista/"+id+'/'+ d)

  }

  UpdateDeportista(e: any, id: number){
    return this.http.put("http://localhost:3000/api/deportista/"+id, e)

  }

  mostrarDeportes(){
    return this.http.get(this._deporteslURL);
  }

  getTablaSolicitude(dep:any){
    return this.http.get(this._solicitudeslURL+dep)
  }


  confirmarSolicitud(e: any, id: number){
    console.log(e)
    return this.http.put("http://localhost:3000/api/solicitud/"+id, e )
  }


  // conexion entre componentes
  SetActualizacion(e: any){
    this.editar=true
    this.deportista= e

  }

  GetActualizacion(){
    if(this.editar){
      this.editar=false
      return this.deportista
    }
  }

  private equipo: any
  public porTeam = false

  setEquipo(e: any){
    this.equipo= e
    this.porTeam= true
  }

  getEquipo(){
    this.porTeam=false
    return this.equipo
  }


  setEquipiSolicitud(e: string){
    this.teamSolicitud= e;
  }


  getEquipiSolicitud(){
    if(this.teamSolicitud != null){
      return this.teamSolicitud
    }

  }




}
