import { Valoracion } from './../Class/Valoracion';
import { Paciente } from './../Class/Paciente';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PacientePageRoutingModule } from './paciente-routing.module';

import { PacientePage } from './paciente.page';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    PacientePageRoutingModule
    
  ],providers: [DatePipe, Paciente, Valoracion],
  declarations: [PacientePage]
})
export class PacientePageModule {}
