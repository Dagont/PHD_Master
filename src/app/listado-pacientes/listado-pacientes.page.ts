import { Router } from '@angular/router';
import { ModalListadoPacientesPage } from './../modal-listado-pacientes/modal-listado-pacientes.page';
import { ModalController, AlertController } from '@ionic/angular';
import { PacienteService } from './../services/paciente.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-listado-pacientes',
  templateUrl: './listado-pacientes.page.html',
  styleUrls: ['./listado-pacientes.page.scss'],
})
export class ListadoPacientesPage implements OnInit {

  pacientes: PacienteService[]=[];

  constructor(private route: Router,private alertCtrl: AlertController,private dataService: DataService, private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  eliminar(paciente:PacienteService){
    this.dataService.deletePaciente(paciente.id).then(()=>{
      this.alertaElimino();
      this.loadData();
    })
  }

  async alertaElimino() {
    const alerta = await this.alertCtrl.create({
      header: "Mensaje",
      message: "Eliminado Exitoso"
    });

    await alerta.present();
  }

  async abrirModal(paciente: PacienteService){
    const modal = await this.modalCtrl.create({
      component: ModalListadoPacientesPage,
      componentProps: {
        paciente: paciente
      }
    });

    await modal.present();
  }

  
  ionViewDidEnter(){
    this.loadData();
  }

  loadData(){
    this.dataService.getTodosPacientes().then((aux:PacienteService[])=>{
      this.pacientes = aux;
    });
  }

}
