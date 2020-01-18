import { PacienteService } from "./../services/paciente.service";
import { ModalController } from "@ionic/angular";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-modal-listado-pacientes",
  templateUrl: "./modal-listado-pacientes.page.html",
  styleUrls: ["./modal-listado-pacientes.page.scss"]
})
export class ModalListadoPacientesPage implements OnInit {
  @Input() paciente: PacienteService;

  flagViaOral: boolean = false;
  flagNutricionEntera: boolean = false;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  ionViewDidEnter() {
    if (this.paciente.metodoEstimacionIngesta == "Via Oral") {
      this.flagViaOral = true;
      this.flagNutricionEntera = false;
    } else if (this.paciente.metodoEstimacionIngesta == "Nutricion Entera") {
      this.flagViaOral = false;
      this.flagNutricionEntera = true;
    }
  }
  salir() {
    this.modalCtrl.dismiss();
  }

  editar() {}
}
