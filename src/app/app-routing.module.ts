import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MascotasComponent } from './mascotas/mascotas.component';
import { HistoriaClinicaComponent } from './historia-clinica/historia-clinica.component';
import { ColaboradorComponent } from './colaborador/colaborador.component';
import { DetallesHistoriaClinicaComponent } from './detalles-historia-clinica/detalles-historia-clinica.component';
const routes: Routes = [
  {
    path: 'usuarios', component: UsuariosComponent,

  },
  { path: 'mascotas', component: MascotasComponent },
  { path: 'historias', component: HistoriaClinicaComponent },
  { path: 'colaborador', component: ColaboradorComponent },
  { path: 'detalles', component: DetallesHistoriaClinicaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {



}
