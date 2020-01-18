import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalEstimacionIngestaPage } from './modal-estimacion-ingesta.page';

const routes: Routes = [
  {
    path: '',
    component: ModalEstimacionIngestaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalEstimacionIngestaPageRoutingModule {}
