import { DataService } from './../services/data.service';
import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: "app-modal-valoracion",
  templateUrl: "./modal-valoracion.page.html",
  styleUrls: ["./modal-valoracion.page.scss"]
})
export class ModalValoracionPage implements OnInit {
  
  constructor(private modalCtrl: ModalController, public paciente: PacienteService, private dataService: DataService) {}

  ngOnInit() {}

  ionViewDidEnter(){
   this.dataService.getPaciente(this.paciente.getId()).then((auxPaciente)=>{
     this.paciente = auxPaciente;
   });
  }
  salir() {
    this.modalCtrl.dismiss();
  }
}
