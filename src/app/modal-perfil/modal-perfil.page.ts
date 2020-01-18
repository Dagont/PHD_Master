import { DataService } from './../services/data.service';

import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Perfil } from "../Class/Perfil";

@Component({
  selector: "app-modal-perfil",
  templateUrl: "./modal-perfil.page.html",
  styleUrls: ["./modal-perfil.page.scss"]
})
export class ModalPerfilPage implements OnInit {
  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) {}

  errorMessages = {
    nombre: [
      { type: "required", message: "Ingrese su nombre" },
      { type: "minlength", message: "Mínimo 3 caracteres" },
      { type: "maxlength", message: "Maximo 30 caracteres" }
    ]
  };

  perfilForm = this.formBuilder.group({
    nombre: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
    ]
  });

  ionViewDidEnter(){
    
  }


  ngOnInit() { 
  }

  guardar() {
    
    
    
  }
  cerrar() {
    this.modalCtrl.dismiss();
  }

  getNombre(){
    return this.perfilForm.get("nombre");
  }
}
