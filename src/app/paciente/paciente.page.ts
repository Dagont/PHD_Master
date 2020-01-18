import { PacienteService } from "./../services/paciente.service";
import { Valoracion } from "./../Class/Valoracion";
import { Paciente } from "./../Class/Paciente";
import { DataService } from "./../services/data.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AlertController } from "@ionic/angular";

//import { StorageService, Paciente } from './../../services/storage.service';
@Component({
  selector: "app-paciente",
  templateUrl: "./paciente.page.html",
  styleUrls: ["./paciente.page.scss"]
})
export class PacientePage implements OnInit {
  today: string = "";

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    public paciente: PacienteService,
    private alertCtrl: AlertController
  ) {
    this.today = new Date().toISOString();
    this.pacientForm.get("input_fechaValoracion").setValue(this.today);
    console.log(paciente);
  }

  errorMessages = {
    id: [
      { type: "required", message: "Obligatorio" },
      { type: "minlength", message: "Mínimo 3 caracteres" },
      { type: "maxlength", message: "Maximo 10 caracteres" }
    ],
    genero: [{ type: "required", message: "Obligatorio" }],
    fechaNacimiento: [{ type: "required", message: "Obligatorio" }],
    fechaValoracion: [{ type: "required", message: "Obligatorio" }]
  };

  pacientForm = this.formBuilder.group({
    input_id: [
      "",
      [Validators.required, Validators.minLength(3), Validators.maxLength(10)]
    ],
    input_fechaNacimiento: ["", Validators.required],
    input_genero: ["", Validators.required],
    input_fechaValoracion: ["", Validators.required]
  });

  getId() {
    return this.pacientForm.get("input_id");
  }

  getFechaNacimiento() {
    return this.pacientForm.get("input_fechaNacimiento");
  }

  getGenero() {
    return this.pacientForm.get("input_genero");
  }

  ngOnInit() {
    // verifica si tiene pacientes en el registro, no tiene pacientes registrados
  }

  async alertaGuardo() {
    const alerta = await this.alertCtrl.create({
      header: "Mensaje",
      message: "Guardado Exitoso"
    });

    await alerta.present();
  }

  // Guarda los datos del paciente, genera un objeto de la clase Valoracion y se la asigna al paciente
  guardar() {
    this.paciente.setFechaNacimiento(
      this.pacientForm.get("input_fechaNacimiento").value
    );
    this.paciente.setGenero(this.pacientForm.get("input_genero").value);
    this.paciente.setId(this.pacientForm.get("input_id").value);
    this.paciente.setFechaValoracion(
      this.pacientForm.get("input_fechaValoracion").value
    );

    this.dataService.addPaciente(this.paciente).then((item)=>{
      this.dataService.calcularEdad(this.paciente.getId());
      this.alertaGuardo();
    });

  }

  // guarda el id si todo el formulario esta valido
  // para hacer
  // verificar que el id ingresado sea unico dentro del arreglo de pacientes
}
