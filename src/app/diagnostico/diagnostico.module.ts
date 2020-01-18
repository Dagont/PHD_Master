import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiagnosticoPageRoutingModule } from './diagnostico-routing.module';

import { DiagnosticoPage } from './diagnostico.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    DiagnosticoPageRoutingModule
  ],
  declarations: [DiagnosticoPage]
})
export class DiagnosticoPageModule {}
