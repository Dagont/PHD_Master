import { DataService } from "./../services/data.service";
import { PacienteService } from "./../services/paciente.service";
import { ModalController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-modal-estimacion-ingesta",
  templateUrl: "./modal-estimacion-ingesta.page.html",
  styleUrls: ["./modal-estimacion-ingesta.page.scss"]
})
export class ModalEstimacionIngestaPage implements OnInit {
  flagViaOral: boolean = false;
  flagNutricionEntera: boolean = false;
  idAux:number;
  constructor(
    private modalCtrl: ModalController,
    public paciente: PacienteService,
    private dataService: DataService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.idAux = this.paciente.getId();
    this.dataService.getPaciente(this.idAux).then((auxPaciente)=>{
      this.paciente = auxPaciente;
      if (auxPaciente.metodoEstimacionIngesta == "Via Oral") {
        this.flagViaOral = true;
        this.flagNutricionEntera = false;
      } else if (
        auxPaciente.metodoEstimacionIngesta == "Nutricion Entera"
      ) {
        this.flagViaOral = false;
        this.flagNutricionEntera = true;
      }
    });

    
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}
