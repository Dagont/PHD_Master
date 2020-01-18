import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoPacientesPage } from './listado-pacientes.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoPacientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoPacientesPageRoutingModule {}
