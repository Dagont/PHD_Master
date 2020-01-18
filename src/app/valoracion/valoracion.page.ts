import { PacienteService } from "./../services/paciente.service";
import { ModalValoracionPage } from "./../modal-valoracion/modal-valoracion.page";
import { Paciente } from "./../Class/Paciente";
import { DataService } from "./../services/data.service";
import { Component, OnInit } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-valoracion",
  templateUrl: "./valoracion.page.html",
  styleUrls: ["./valoracion.page.scss"]
})
export class ValoracionPage implements OnInit {
  // verifica que metodo utilizar para calcular los datos
  // metodos talla estimada

  flagRodillaMaleolo: boolean = false;
  flagRodillaTalon: boolean = false;

  // metodos peso estimado
  flagRabito: boolean = false;
  flagLorenz: boolean = false;

  // porcentaje perdida de peso

  flagPrimeraValoracion: boolean = true;

  // amputaciones

  flagAmputaciones: boolean = false;

  // input_peso: number;
  // input_talla: number;
  // // Selecciona el metodo para calcular la talla estimada
  // input_metodoTallaEstimada: string = "Rodilla-Talon";
  // // Datos

  // input_alturaRodilla: number;

  // input_longitudRodilla: number;

  //  // selecciona el metodo para calcular el peso estimado
  //  input_metodoPesoEstimado: string = "Rabito";
  //  // valor del peso estimado
  //  input_pesoEstimado: number;

  //  input_perimetroBrazo: number;
  //  input_perimetroAbdomen: number;
  //  input_perimetroPantorilla: number;

  //  input_perimetroAbdominal: number;
  //  input_perimetroCadera: number;

  //--------------------------
  //--------------------------
  //--------------------------
  //--------------------------
  //--------------------------

  // Mensajes de errores, validacion del formulario
  errorMessages = {
    peso: [{ type: "required", message: "Obligatorio" }],
    talla: [{ type: "required", message: "Obligatorio" }],
    metodoTallaEstimada: [{ type: "required", message: "Obligatorio" }],
    alturaRodilla: [{ type: "required", message: "Obligatorio" }],
    longitudRodilla: [{ type: "required", message: "Obligatorio" }],

    metodoPesoEstimado: [{ type: "required", message: "Obligatorio" }],

    perimetroBrazo: [{ type: "required", message: "Obligatorio" }],
    perimetroAbdomen: [{ type: "required", message: "Obligatorio" }],
    perimetroPantorilla: [{ type: "required", message: "Obligatorio" }],

    perimetroAbdominal: [{ type: "required", message: "Obligatorio" }],
    perimetroCadera: [{ type: "required", message: "Obligatorio" }],

    miembrosAmputados: [
      {
        type: "required",
        message: "Selecciona un miembro o desactiva la opción"
      }
    ],

    circunferenciaCarpo: [{ type: "required", message: "Obligatorio" }],

    temporal: [{ type: "required", message: "Obligatorio" }],
    claviculaHombros: [{ type: "required", message: "Obligatorio" }],
    escapula: [{ type: "required", message: "Obligatorio" }],
    mano: [{ type: "required", message: "Obligatorio" }],
    pierna: [{ type: "required", message: "Obligatorio" }],
    pantorilla: [{ type: "required", message: "Obligatorio" }],

    orbital: [{ type: "required", message: "Obligatorio" }],
    toracicaLumbar: [{ type: "required", message: "Obligatorio" }],
    brazoTriceps: [{ type: "required", message: "Obligatorio" }]
  };
  //--------------------------

  // Porcentaje pérdida de peso

  input_pesoAnterior: number;

  // Peso ajustado con amputaciones

  input_miembrosAmputados: string;
  input_tablaPorcentajes: number[]; // pendiente traer datos 07/12

  // Peso ideal por estructura

  input_circunferenciaCarpo: number;
  input_constanteEstructura: number;

  // Evaluación Física

  // Evaluacion Masa Muscular

  input_EMMTemporal: string = "Sin Compromiso";
  input_EMMClaviculaHombros: string = "Sin Compromiso";
  input_EMMEscapula: string = "Sin Compromiso";
  input_EMMMano: string = "Sin Compromiso";
  input_EMMPierna: string = "Sin Compromiso";
  input_EMMPantorilla: string = "Sin Compromiso";

  // Evaluacion Masa Grasa

  input_EMGOrbital: string = "Sin Compromiso";
  input_EMGToracicaLumbar: string = "Sin Compromiso";
  input_EMGBrazoTriceps: string = "Sin Compromiso";

  // Observaciones

  input_observaciones: string;

  // auxiliares momentaneos
  input_edad: number;
  input_genero: string;

  idAux: number;

  constructor(
    private dataService: DataService,
    private paciente: PacienteService,
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.idAux = this.paciente.getId();
  }

  valoracionForm = this.formBuilder.group({
    input_peso: ["", Validators.required],
    input_talla: ["", Validators.required],
    tallaEstimada: this.formBuilder.group({
      input_metodoTallaEstimada: [""],
      rodillaTalon: this.formBuilder.group({
        input_alturaRodilla: ["", Validators.required]
      }),

      rodillaMaleolo: this.formBuilder.group({
        input_longitudRodilla: ["", Validators.required]
      })
    }),
    pesoEstimado: this.formBuilder.group({
      input_metodoPesoEstimado: ["", Validators.required],

      rabito: this.formBuilder.group({
        input_perimetroBrazo: [""],
        input_perimetroAbdomen: [""],
        input_perimetroPantorilla: [""]
      }),

      lorenz: this.formBuilder.group({
        input_perimetroAbdominal: [""],
        input_perimetroCadera: [""]
      })
    }),
    amputaciones: this.formBuilder.group({
      toggle_amputaciones: [""],
      input_miembrosAmputados: [""]
    }),

    pesoIdealEstructura: this.formBuilder.group({
      input_circunferenciaCarpo: ["", Validators.required]
    }),
    examenFisico: this.formBuilder.group({
      evaluacionMuscular: this.formBuilder.group({
        input_EMMTemporal: ["", Validators.required],
        input_EMMClaviculaHombros: ["", Validators.required],
        input_EMMEscapula: ["", Validators.required],
        input_EMMMano: ["", Validators.required],
        input_EMMPierna: ["", Validators.required],
        input_EMMPantorilla: ["", Validators.required]
      }),
      evaluacionGrasa: this.formBuilder.group({
        input_EMGOrbital: ["", Validators.required],
        input_EMGToracicaLumbar: ["", Validators.required],
        input_EMGBrazoTriceps: ["", Validators.required]
      })
    }),
    input_observaciones: [""]
  });

  /**
   * define que items cargaran en la página según la selección del usuario, cambiando el flag especifico de cada uno de ellos (llamado en el ngIf del ion item).
   * La función se llama cuando hay un evento en el selector del metodo.
   * Predeterminado esta seleccionado el metodo rodilla talón.
   */
  definirEntradaMetodoTallaEstimada() {
    if (
      this.valoracionForm.get("tallaEstimada.input_metodoTallaEstimada")
        .value == "Rodilla-Talon"
    ) {
      this.valoracionForm
        .get("tallaEstimada.rodillaMaleolo.input_longitudRodilla")
        .setValidators([]);
      this.valoracionForm
        .get("tallaEstimada.rodillaMaleolo.input_longitudRodilla")
        .updateValueAndValidity();

      this.valoracionForm
        .get("tallaEstimada.rodillaTalon.input_alturaRodilla")
        .setValidators([Validators.required]);
      this.valoracionForm
        .get("tallaEstimada.rodillaTalon.input_alturaRodilla")
        .updateValueAndValidity();

      this.flagRodillaMaleolo = false;
      this.flagRodillaTalon = true;
    } else if (
      this.valoracionForm.get("tallaEstimada.input_metodoTallaEstimada")
        .value == "Rodilla-Maleolo"
    ) {
      this.valoracionForm
        .get("tallaEstimada.rodillaTalon.input_alturaRodilla")
        .setValidators([]);
      this.valoracionForm
        .get("tallaEstimada.rodillaTalon.input_alturaRodilla")
        .updateValueAndValidity();

      this.valoracionForm
        .get("tallaEstimada.rodillaMaleolo.input_longitudRodilla")
        .setValidators([Validators.required]);
      this.valoracionForm
        .get("tallaEstimada.rodillaMaleolo.input_longitudRodilla")
        .updateValueAndValidity();

      this.flagRodillaTalon = false;
      this.flagRodillaMaleolo = true;
    }
  }

  /**
   * define que inputs cargaran en la página según la selección del usuario, cambiando el flag especifico de cada uno de ellos (llamado en el ngIf del ion item).
   * La función se llama cuando hay un evento en el selector del metodo.
   * Predeterminado esta seleccionado el metodo rabito.
   */
  definirEntradaMetodoPesoEstimado() {
    if (
      this.valoracionForm.get("pesoEstimado.input_metodoPesoEstimado").value ==
      "Rabito"
    ) {
      this.idAux = this.paciente.getId();
      this.dataService.getPaciente(this.idAux).then((auxPaciente)=>{
        auxPaciente.metodoPesoEstimado = "Rabito";
        this.dataService.updatePaciente(auxPaciente).then(()=>{
          console.log("guarda metodo peso estimado", auxPaciente.metodoPesoEstimado);
        });
      });
      this.valoracionForm
        .get("pesoEstimado.rabito.input_perimetroBrazo")
        .setValidators([Validators.required]);
      this.valoracionForm
        .get("pesoEstimado.rabito.input_perimetroBrazo")
        .updateValueAndValidity();
      this.valoracionForm
        .get("pesoEstimado.rabito.input_perimetroAbdomen")
        .setValidators([Validators.required]);
      this.valoracionForm
        .get("pesoEstimado.rabito.input_perimetroAbdomen")
        .updateValueAndValidity();
      this.valoracionForm
        .get("pesoEstimado.rabito.input_perimetroPantorilla")
        .setValidators([Validators.required]);
      this.valoracionForm
        .get("pesoEstimado.rabito.input_perimetroPantorilla")
        .updateValueAndValidity();

      this.valoracionForm
        .get("pesoEstimado.lorenz.input_perimetroAbdominal")
        .setValidators([]);
      this.valoracionForm
        .get("pesoEstimado.lorenz.input_perimetroAbdominal")
        .updateValueAndValidity();
      this.valoracionForm
        .get("pesoEstimado.lorenz.input_perimetroCadera")
        .setValidators([]);
      this.valoracionForm
        .get("pesoEstimado.lorenz.input_perimetroCadera")
        .updateValueAndValidity();

      this.flagRabito = true;
      this.flagLorenz = false;
    } else if (
      this.valoracionForm.get("pesoEstimado.input_metodoPesoEstimado").value ==
      "Lorenz"
    ) {
      this.idAux = this.paciente.getId();
      this.dataService.getPaciente(this.idAux).then((auxPaciente)=>{
        auxPaciente.metodoPesoEstimado = "Lorenz";
        this.dataService.updatePaciente(auxPaciente).then(()=>{
          console.log("guarda metodo peso estimado", auxPaciente.metodoPesoEstimado);
        });
      });
      this.valoracionForm
        .get("pesoEstimado.lorenz.input_perimetroAbdominal")
        .setValidators([Validators.required]);
      this.valoracionForm
        .get("pesoEstimado.lorenz.input_perimetroAbdominal")
        .updateValueAndValidity();
      this.valoracionForm
        .get("pesoEstimado.lorenz.input_perimetroCadera")
        .setValidators([Validators.required]);
      this.valoracionForm
        .get("pesoEstimado.lorenz.input_perimetroCadera")
        .updateValueAndValidity();

      this.valoracionForm
        .get("pesoEstimado.rabito.input_perimetroBrazo")
        .setValidators([]);
      this.valoracionForm
        .get("pesoEstimado.rabito.input_perimetroBrazo")
        .updateValueAndValidity();
      this.valoracionForm
        .get("pesoEstimado.rabito.input_perimetroAbdomen")
        .setValidators([]);
      this.valoracionForm
        .get("pesoEstimado.rabito.input_perimetroAbdomen")
        .updateValueAndValidity();
      this.valoracionForm
        .get("pesoEstimado.rabito.input_perimetroPantorilla")
        .setValidators([]);
      this.valoracionForm
        .get("pesoEstimado.rabito.input_perimetroPantorilla")
        .updateValueAndValidity();

      this.flagRabito = false;
      this.flagLorenz = true;
    }
  }

  definirEntradaAmputaciones() {
    this.idAux = this.paciente.getId();
    this.dataService.getPaciente(this.idAux).then(auxPaciente => {
      if (this.valoracionForm.get("amputaciones.toggle_amputaciones").value) {
        auxPaciente.tieneAmputaciones = true;
        auxPaciente.manifiestaAmputaciones = "Si";
        this.flagAmputaciones = true;
        this.valoracionForm
          .get("amputaciones.input_miembrosAmputados")
          .setValidators([Validators.required]);
        this.valoracionForm
          .get("amputaciones.input_miembrosAmputados")
          .updateValueAndValidity();
      } else {
        auxPaciente.tieneAmputaciones = false;
        auxPaciente.manifiestaAmputaciones = "No";
        this.flagAmputaciones = false;
        this.valoracionForm
          .get("amputaciones.input_miembrosAmputados")
          .setValidators([]);
        this.valoracionForm
          .get("amputaciones.input_miembrosAmputados")
          .updateValueAndValidity();
      }
      this.dataService.updatePaciente(auxPaciente).then(() => {
        console.log(
          "termina definir entrada amputaciones:",
          auxPaciente.tieneAmputaciones
        );
      });
    });
  }

  tallaEstimada(entrada: string) {
    this.idAux = this.paciente.getId();

    if (entrada == "alturaRodilla") {
      if (
        this.valoracionForm.get(
          "tallaEstimada.rodillaTalon.input_alturaRodilla"
        ).valid
      ) {
        this.dataService.tallaEstimada(
          this.idAux,
          entrada,
          this.valoracionForm.get(
            "tallaEstimada.rodillaTalon.input_alturaRodilla"
          ).value
        );
      }
    } else if (entrada == "longitudRodilla") {
      if (
        this.valoracionForm.get(
          "tallaEstimada.rodillaMaleolo.input_longitudRodilla"
        ).valid
      ) {
        this.dataService.tallaEstimada(
          this.idAux,
          entrada,
          this.valoracionForm.get(
            "tallaEstimada.rodillaMaleolo.input_longitudRodilla"
          ).value
        );
      }
    }
  }

  pesoEstimado(entrada: string) {
    this.idAux = this.paciente.getId();

    if (entrada == "Rabito") {
      if (
        this.valoracionForm.get("pesoEstimado.rabito.input_perimetroBrazo")
          .valid &&
        this.valoracionForm.get("pesoEstimado.rabito.input_perimetroAbdomen")
          .valid &&
        this.valoracionForm.get("pesoEstimado.rabito.input_perimetroPantorilla")
          .valid
      ) {
        // do it
        this.dataService.pesoEstimado(this.idAux, entrada, [
          this.valoracionForm.get("pesoEstimado.rabito.input_perimetroAbdomen")
            .value,
          this.valoracionForm.get("pesoEstimado.rabito.input_perimetroBrazo")
            .value,
          this.valoracionForm.get(
            "pesoEstimado.rabito.input_perimetroPantorilla"
          ).value
        ]);
      } else {
        // dont do it
      }
    } else if (entrada == "Lorenz") {
      if (
        this.valoracionForm.get("pesoEstimado.lorenz.input_perimetroCadera")
          .valid &&
        this.valoracionForm.get("pesoEstimado.lorenz.input_perimetroAbdominal")
          .valid
      ) {
        // do it
        this.dataService.pesoEstimado(this.idAux, entrada, [
          this.valoracionForm.get("pesoEstimado.lorenz.input_perimetroCadera")
            .value,
          this.valoracionForm.get(
            "pesoEstimado.lorenz.input_perimetroAbdominal"
          ).value
        ]);
      }
    }
  }

  // pesoEstimado() {
  //   if (this.input_metodoPesoEstimado == "Rabito") {
  //     if (this.input_genero == "hombre") {
  //       console.log((0.5759 * this.input_perimetroBrazo) + (0.5263 * this.input_perimetroAbdomen) + (1.2452 * this.input_perimetroPantorilla) - (4.8689 * 1) - 32.9241);
  //     } else if (this.input_genero == "mujer") {
  //       console.log((0.5759 * this.input_perimetroBrazo) + (0.5263 * this.input_perimetroAbdomen) + (1.2452 * this.input_perimetroPantorilla) - (4.8689 * 2) - 32.9241);
  //     }
  //   } else if (this.input_metodoPesoEstimado == "Lorenz") {
  //     if (this.input_genero == "hombre") {
  //       console.log(-137.432 + (this.input_talla * 0.60035) + (this.input_perimetroAbdominal * 0.785) + (this.input_perimetroCadera * 0.392));
  //     } else if (this.input_genero == "mujer") {
  //       console.log((0.5759 * this.input_perimetroBrazo) + (0.5263 * this.input_perimetroAbdomen) + (1.2452 * this.input_perimetroPantorilla) + (this.input_perimetroCadera * 1) - 32.9241);
  //     }
  //   }
  // }

  // porcentajePerdidaPeso() {

  //   console.log(((this.input_pesoAnterior - this.input_pesoEstimado) / this.input_pesoAnterior) * 100)

  // }

  pesoAjustadoAmputaciones() {
    this.dataService.pesoAjustadoAmputaciones(
      this.idAux,
      this.valoracionForm.get("amputaciones.input_miembrosAmputados").value
    );
  }
  // pesoAjustadoAmputaciones() {
  //   // modificar el calculo con la funcion de los porcentajes de los miembros amputados 07/12
  //   console.log(this.input_pesoEstimado - (this.input_pesoEstimado * this.input_tablaPorcentajes[0]) + (this.input_pesoEstimado * this.input_tablaPorcentajes[1]));

  // }

  pesoIdealEstructura() {
    this.idAux = this.paciente.getId();
    if (
      this.valoracionForm.get("pesoIdealEstructura.input_circunferenciaCarpo")
        .valid
    ) {
      this.dataService.pesoIdealEstructura(
        this.idAux,
        this.valoracionForm.get("pesoIdealEstructura.input_circunferenciaCarpo")
          .value
      );
    }
  }
  // pesoIdealEstructura() {
  //   // Traer el dato de la constante estructura 07/12
  //   console.log(this.input_talla / this.input_circunferenciaCarpo);
  //   console.log(Math.pow(this.input_talla, 2) * this.input_constanteEstructura);
  // }
  guardarEstadoTemporal() {
    if (
      this.valoracionForm.get(
        "examenFisico.evaluacionMuscular.input_EMMTemporal"
      ).valid
    ) {
      this.idAux = this.paciente.getId();
      this.dataService.getPaciente(this.idAux).then(auxPaciente => {
        auxPaciente.estadoTemporal = this.valoracionForm.get(
          "examenFisico.evaluacionMuscular.input_EMMTemporal"
        ).value;

        this.dataService.updatePaciente(auxPaciente).then(() => {
          console.log(
            "termina guardar estado temporal:",
            auxPaciente.estadoTemporal
          );
        });
      });
    }
  }

  guardarEstadoClaviculaHombros() {
    if (
      this.valoracionForm.get(
        "examenFisico.evaluacionMuscular.input_EMMClaviculaHombros"
      ).valid
    ) {
      this.idAux = this.paciente.getId();
      this.dataService.getPaciente(this.idAux).then(auxPaciente => {
        auxPaciente.estadoClaviculaHombros = this.valoracionForm.get(
          "examenFisico.evaluacionMuscular.input_EMMClaviculaHombros"
        ).value;
        this.dataService.updatePaciente(auxPaciente).then(() => {
          console.log(
            "termina guardar clavicula",
            auxPaciente.estadoClaviculaHombros
          );
        });
      });
    }
  }

  guardarEstadoEscapula() {
    if (
      this.valoracionForm.get(
        "examenFisico.evaluacionMuscular.input_EMMEscapula"
      ).valid
    ) {
      this.idAux = this.paciente.getId();
      this.dataService.getPaciente(this.idAux).then(auxPaciente => {
        auxPaciente.estadoEscapula = this.valoracionForm.get(
          "examenFisico.evaluacionMuscular.input_EMMEscapula"
        ).value;
        this.dataService.updatePaciente(auxPaciente).then(() => {
          console.log("termina guardar escapula", auxPaciente.estadoEscapula);
        });
      });
    }
  }

  guardarEstadoMano() {
    if (
      this.valoracionForm.get("examenFisico.evaluacionMuscular.input_EMMMano")
        .valid
    ) {
      this.idAux = this.paciente.getId();
      this.dataService.getPaciente(this.idAux).then(auxPaciente => {
        auxPaciente.estadoMano = this.valoracionForm.get(
          "examenFisico.evaluacionMuscular.input_EMMMano"
        ).value;
        this.dataService.updatePaciente(auxPaciente).then(() => {
          console.log("termina guardar mano", auxPaciente.estadoMano);
        });
      });
    }
  }

  guardarEstadoPierna() {
    if (
      this.valoracionForm.get("examenFisico.evaluacionMuscular.input_EMMPierna")
        .valid
    ) {
      this.idAux = this.paciente.getId();
      this.dataService.getPaciente(this.idAux).then(auxPaciente => {
        auxPaciente.estadoPierna = this.valoracionForm.get(
          "examenFisico.evaluacionMuscular.input_EMMPierna"
        ).value;
        this.dataService.updatePaciente(auxPaciente).then(() => {
          console.log("termina guardar pierna", auxPaciente.estadoPierna);
        });
      });
    }
  }

  guardarEstadoPantorilla() {
    if (
      this.valoracionForm.get(
        "examenFisico.evaluacionMuscular.input_EMMPantorilla"
      ).valid
    ) {
      this.idAux = this.paciente.getId();
      this.dataService.getPaciente(this.idAux).then(auxPaciente => {
        auxPaciente.estadoPantorilla = this.valoracionForm.get(
          "examenFisico.evaluacionMuscular.input_EMMPantorilla"
        ).value;
        this.dataService.updatePaciente(auxPaciente).then(() => {
          console.log(
            "termina guardar pantorilla",
            auxPaciente.estadoPantorilla
          );
        });
      });
    }
  }

  guardarEstadoOrbital() {
    if (
      this.valoracionForm.get("examenFisico.evaluacionGrasa.input_EMGOrbital")
        .valid
    ) {
      this.idAux = this.paciente.getId();
      this.dataService.getPaciente(this.idAux).then(auxPaciente => {
        auxPaciente.estadoOrbital = this.valoracionForm.get(
          "examenFisico.evaluacionGrasa.input_EMGOrbital"
        ).value;
        this.dataService.updatePaciente(auxPaciente).then(() => {
          console.log(
            "termina guardar estado orbital",
            auxPaciente.estadoOrbital
          );
        });
      });
    }
  }

  guardarEstadoToracicaLumbar() {
    if (
      this.valoracionForm.get(
        "examenFisico.evaluacionGrasa.input_EMGToracicaLumbar"
      ).valid
    ) {
      this.idAux = this.paciente.getId();

      this.dataService.getPaciente(this.idAux).then(auxPaciente => {
        auxPaciente.estadoToracicaLumbar = this.valoracionForm.get(
          "examenFisico.evaluacionGrasa.input_EMGToracicaLumbar"
        ).value;
        this.dataService.updatePaciente(auxPaciente).then(() => {
          console.log(
            "termina guardar toracico lumbar",
            auxPaciente.estadoToracicaLumbar
          );
        });
      });
    }
  }

  guardarEstadoBrazoTriceps() {
    if (
      this.valoracionForm.get(
        "examenFisico.evaluacionGrasa.input_EMGBrazoTriceps"
      ).valid
    ) {
      this.idAux = this.paciente.getId();

      this.dataService.getPaciente(this.idAux).then(auxPaciente => {
        auxPaciente.estadoBrazo = this.valoracionForm.get(
          "examenFisico.evaluacionGrasa.input_EMGBrazoTriceps"
        ).value;
        this.dataService.updatePaciente(auxPaciente).then(() => {
          console.log("termina guardar brazo", auxPaciente.estadoBrazo);
        });
      });
    }
  }

  getTalla() {
    return this.valoracionForm.get("input_talla");
  }

  getPeso() {
    return this.valoracionForm.get("input_peso");
  }

  getMetodoTallaEstimada() {
    return this.valoracionForm.get("tallaEstimada.input_metodoTallaEstimada");
  }

  getAlturaRodilla() {
    return this.valoracionForm.get(
      "tallaEstimada.rodillaTalon.input_alturaRodilla"
    );
  }

  getLongitudRodilla() {
    return this.valoracionForm.get(
      "tallaEstimada.rodillaMaleolo.input_longitudRodilla"
    );
  }

  getMetodoPesoEstimado() {
    return this.valoracionForm.get("pesoEstimado.input_metodoPesoEstimado");
  }

  getPerimetroBrazo() {
    return this.valoracionForm.get("pesoEstimado.rabito.input_perimetroBrazo");
  }

  getPerimetroAbdomen() {
    return this.valoracionForm.get(
      "pesoEstimado.rabito.input_perimetroAbdomen"
    );
  }

  getPerimetroPantorilla() {
    return this.valoracionForm.get(
      "pesoEstimado.rabito.input_perimetroPantorilla"
    );
  }

  getPerimetroAbdominal() {
    return this.valoracionForm.get(
      "pesoEstimado.lorenz.input_perimetroAbdominal"
    );
  }

  getPerimetroCadera() {
    return this.valoracionForm.get("pesoEstimado.lorenz.input_perimetroCadera");
  }

  getMiembrosAmputados() {
    return this.valoracionForm.get("amputaciones.input_miembrosAmputados");
  }

  getCircunferenciaCarpo() {
    return this.valoracionForm.get(
      "pesoIdealEstructura.input_circunferenciaCarpo"
    );
  }

  getTemporal() {
    return this.valoracionForm.get(
      "examenFisico.evaluacionMuscular.input_EMMTemporal"
    );
  }

  getClaviculaHombros() {
    return this.valoracionForm.get(
      "examenFisico.evaluacionMuscular.input_EMMClaviculaHombros"
    );
  }

  getEscapula() {
    return this.valoracionForm.get(
      "examenFisico.evaluacionMuscular.input_EMMEscapula"
    );
  }

  getMano() {
    return this.valoracionForm.get(
      "examenFisico.evaluacionMuscular.input_EMMMano"
    );
  }

  getPierna() {
    return this.valoracionForm.get(
      "examenFisico.evaluacionMuscular.input_EMMPierna"
    );
  }

  getPantorilla() {
    return this.valoracionForm.get(
      "examenFisico.evaluacionMuscular.input_EMMPantorilla"
    );
  }

  getOrbital() {
    return this.valoracionForm.get(
      "examenFisico.evaluacionGrasa.input_EMGOrbital"
    );
  }

  getToracicaLumbar() {
    return this.valoracionForm.get(
      "examenFisico.evaluacionGrasa.input_EMGToracicaLumbar"
    );
  }

  getBrazoTriceps() {
    return this.valoracionForm.get(
      "examenFisico.evaluacionGrasa.input_EMGBrazoTriceps"
    );
  }

  getObservaciones() {
    return this.valoracionForm.get("input_observaciones");
  }

  setTalla() {
    if (this.valoracionForm.get("input_talla").valid) {
      this.dataService.getPaciente(this.idAux).then(auxPaciente => {
        auxPaciente.talla = Number(
          this.valoracionForm.get("input_talla").value
        );
        if (this.valoracionForm.get("input_peso").valid) {
          auxPaciente.peso = Number(
            this.valoracionForm.get("input_peso").value
          );
          auxPaciente.imc = Number(
            this.valoracionForm.get("input_peso").value /
              Math.pow(Number(this.valoracionForm.get("input_talla").value), 2)
          );
        }
        this.dataService.updatePaciente(auxPaciente);
      });
    }
  }

  something() {
    console.log("actualiza");
  }

  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: ModalValoracionPage,
      cssClass: "estilo-modal"
    });

    await modal.present();
  }

  setPeso() {
    if (this.valoracionForm.get("input_peso").valid) {
      this.dataService.getPaciente(this.idAux).then(auxPaciente => {
        console.log(
          "entra a cambiar peso:",
          Number(this.valoracionForm.get("input_peso").value)
        );
        auxPaciente.peso = Number(this.valoracionForm.get("input_peso").value);

        if (this.valoracionForm.get("input_talla").valid) {
          auxPaciente.talla = Number(
            this.valoracionForm.get("input_talla").value
          );
          auxPaciente.imc = Number(
            this.valoracionForm.get("input_peso").value /
              Math.pow(Number(this.valoracionForm.get("input_talla").value), 2)
          );
          console.log(auxPaciente.imc);
        }
        this.dataService.updatePaciente(auxPaciente).then(() => {
          console.log("termina de guardar");
        });
      });
    }
  }
  // para hacer
  // hacer funcionalidad de tomar talla con la camara
  // añadir observaciones al modal
}
