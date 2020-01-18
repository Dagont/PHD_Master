import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalEstimacionIngestaPageRoutingModule } from './modal-estimacion-ingesta-routing.module';

import { ModalEstimacionIngestaPage } from './modal-estimacion-ingesta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalEstimacionIngestaPageRoutingModule
  ],
  declarations: [ModalEstimacionIngestaPage]
})
export class ModalEstimacionIngestaPageModule {}
