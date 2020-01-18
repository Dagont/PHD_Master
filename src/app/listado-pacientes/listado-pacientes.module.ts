import { ModalListadoPacientesPageModule } from './../modal-listado-pacientes/modal-listado-pacientes.module';
import { ModalListadoPacientesPage } from './../modal-listado-pacientes/modal-listado-pacientes.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoPacientesPageRoutingModule } from './listado-pacientes-routing.module';

import { ListadoPacientesPage } from './listado-pacientes.page';

@NgModule({
  entryComponents:[
    ModalListadoPacientesPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalListadoPacientesPageModule,
    ListadoPacientesPageRoutingModule
  ],
  declarations: [ListadoPacientesPage]
})
export class ListadoPacientesPageModule {}
