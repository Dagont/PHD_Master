import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalValoracionPageRoutingModule } from './modal-valoracion-routing.module';

import { ModalValoracionPage } from './modal-valoracion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalValoracionPageRoutingModule
  ],
  declarations: [ModalValoracionPage]
})
export class ModalValoracionPageModule {}
