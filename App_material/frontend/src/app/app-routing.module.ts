import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacComponent } from './componentes/fac/fac.component';
import { LoginComponent } from './componentes/login/login.component';
import { PlantillaComponent } from './componentes/plantilla/plantilla.component';
import { RegistrarComponent } from './componentes/registrar/registrar.component';
import { SolicitudesComponent } from './componentes/solicitudes/solicitudes.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch:'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'plantilla',
    component: PlantillaComponent
  },
  {
    path: 'registrar',
    component: RegistrarComponent
  },
  {
    path: 'deportes',
    component: FacComponent
  },
  {
    path: 'solicitudes',
    component: SolicitudesComponent
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch:'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
