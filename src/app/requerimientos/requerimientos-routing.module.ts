import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequerimientosPage } from './requerimientos.page';

const routes: Routes = [
  {
    path: '',
    component: RequerimientosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequerimientosPageRoutingModule {}
