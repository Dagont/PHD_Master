import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalValoracionPage } from './modal-valoracion.page';

const routes: Routes = [
  {
    path: '',
    component: ModalValoracionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalValoracionPageRoutingModule {}
