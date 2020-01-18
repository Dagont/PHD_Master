
import { PacienteService } from "./../services/paciente.service";
import { DataService } from "./../services/data.service";
import { ModalPerfilPage } from "./../modal-perfil/modal-perfil.page";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController, Platform } from "@ionic/angular";
import { Perfil } from "../Class/Perfil";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.page.html",
  styleUrls: ["./inicio.page.scss"]
})
export class InicioPage implements OnInit {
  pacientes: PacienteService[] = [];

  slideOpt = {
    loop: true,
    autoplay: true
  };
  constructor(
    private route: Router,
    private modalCtrl: ModalController,
    private plt: Platform,
    private dataService: DataService
  ) {
    
    // this.plt.ready().then(()=>{
    //   this.loadPacientes();
    //   console.log("entra");
    // });
  }

  loadPacientes() {
    this.dataService.getTodosPacientes().then(auxPacientes => {
      this.pacientes = auxPacientes;
    });
  }

  loadPerfil() {
  }

  ionViewDidEnter() {
    this.loadPacientes();
  }

  ngOnInit() {}

  anadirPaciente() {
    this.route.navigateByUrl("/tabs-page/tabs-page/paciente");
  }

  listadoPacientes() {
    this.route.navigateByUrl("/listado-pacientes");
  }

  // abre el modal del perfil
  async abrirPerfil() {
    const modal = await this.modalCtrl.create({
      component: ModalPerfilPage
    });

    await modal.present();
  }
}

// para hacer
// guardar perfil del nutricionista para que cada vez que se cierre se guarde el nombre i guess
