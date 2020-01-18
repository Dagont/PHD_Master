import { ModalValoracionPageModule } from './../modal-valoracion/modal-valoracion.module';
import { ModalValoracionPage } from './../modal-valoracion/modal-valoracion.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValoracionPageRoutingModule } from './valoracion-routing.module';

import { ValoracionPage } from './valoracion.page';

@NgModule({
  entryComponents: [
    ModalValoracionPage
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ValoracionPageRoutingModule,
    ModalValoracionPageModule
  ],
  declarations: [ValoracionPage]
})
export class ValoracionPageModule {}
