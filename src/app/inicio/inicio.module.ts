import { ModalPerfilPageModule } from './../modal-perfil/modal-perfil.module';
import { ModalPerfilPage } from './../modal-perfil/modal-perfil.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';
import { Perfil } from '../Class/Perfil';

@NgModule({
  entryComponents: [
    ModalPerfilPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule,
    ModalPerfilPageModule
  ],
  providers: [Perfil],
  declarations: [InicioPage]
})
export class InicioPageModule {}
