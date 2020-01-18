import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstimacionIngestaPageRoutingModule } from './estimacion-ingesta-routing.module';

import { EstimacionIngestaPage } from './estimacion-ingesta.page';
import { ModalEstimacionIngestaPageModule } from '../modal-estimacion-ingesta/modal-estimacion-ingesta.module';
import { ModalEstimacionIngestaPage } from '../modal-estimacion-ingesta/modal-estimacion-ingesta.page';

@NgModule({
  entryComponents: [
    ModalEstimacionIngestaPage
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    EstimacionIngestaPageRoutingModule,
    ModalEstimacionIngestaPageModule
  ],
  declarations: [EstimacionIngestaPage]
})
export class EstimacionIngestaPageModule {}
