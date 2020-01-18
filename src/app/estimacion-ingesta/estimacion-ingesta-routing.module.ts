import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstimacionIngestaPage } from './estimacion-ingesta.page';

const routes: Routes = [
  {
    path: '',
    component: EstimacionIngestaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstimacionIngestaPageRoutingModule {}
