import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPerfilPageRoutingModule } from './modal-perfil-routing.module';

import { ModalPerfilPage } from './modal-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ModalPerfilPageRoutingModule
  ],
  declarations: [ModalPerfilPage]
})
export class ModalPerfilPageModule {}
