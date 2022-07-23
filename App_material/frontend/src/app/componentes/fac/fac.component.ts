import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MostrarService } from 'src/app/servicios/mostrar.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-fac',
  templateUrl: './fac.component.html',
  styleUrls: ['./fac.component.css']
})
export class FacComponent implements OnInit {

  deportes:any

  //variables pa el contador
  _second = 1000;
  _minute = this._second * 60;
  _hour = this._minute * 60;
  _day = this._hour * 24;
  end: any;
  now: any;
  day: any;
  hours: any;
  minutes: any;
  seconds: any;
  source = timer(0, 1000);
  clock: any;
  //-------------------------------------------





  constructor(private _mostrar: MostrarService, private _router: Router) { }

  ngOnInit(): void {
    this._mostrar.mostrarDeportes()
      .subscribe(
        res=>{
          this.deportes=res
        },
        error=>{console.log(error)}
      );
      //para contador Abdel
      this.clock = this.source.subscribe(t => {
        this.now = new Date();
        this.end = new Date('01/01/' + (this.now.getFullYear() + 1) +' 00:00');//aki se cambia la fecha
        this.showDate();
      });


  }
  //contador regresivo
  showDate(){
    let distance = this.end - this.now;
    this.day = Math.floor(distance / this._day);
    this.hours = Math.floor((distance % this._day) / this._hour);
    this.minutes = Math.floor((distance % this._hour) / this._minute);
    this.seconds = Math.floor((distance % this._minute) / this._second);
  }




  DarID(e: any): string{
     if(e.includes('futbol')){
       return 'futbol'
     }
     if(e.includes('baloncesto')){
      return 'baloncesto'
    }
    ////////////////////////////////////////////////////
    if(e.includes('baseball')){
      return 'baseball'
    }
    if(e.includes('volleyball')){
      return 'volleyball'
    }
    if(e.includes('playa')){
      return 'volley'
    }
    if(e.includes('mesa')){
      return 'tenis'
    }
    if(e.includes('G.M.A')){
      return 'gimnasia'
    }
    if(e.includes('frontenis')){
      return 'frontenis'
    }
    if(e.includes('judo')){
      return 'judo'
    }
    if(e.includes('dominio')){
      return 'dominio'
    }
    if(e.includes('soga')){
      return 'soga'
    }
    if(e.includes('carrera or')){
      return 'orientacion'
    }

     return e;
  }

  VerEquipo(e: any){
    this._mostrar.setEquipo(e);
    this._router.navigate(['/plantilla'])

  }
  InscribirseEquipo(e: any){
    this._mostrar.setEquipo(e);
    this._router.navigate(['/registrar'])

  }

  VerSolicitudes(e: any){
    this._mostrar.setEquipiSolicitud(e);
    this._router.navigate(['/solicitudes'])

  }


}
