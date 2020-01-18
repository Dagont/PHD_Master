import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalListadoPacientesPageRoutingModule } from './modal-listado-pacientes-routing.module';

import { ModalListadoPacientesPage } from './modal-listado-pacientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalListadoPacientesPageRoutingModule
  ],
  declarations: [ModalListadoPacientesPage]
})
export class ModalListadoPacientesPageModule {}
