import { Paciente } from "./../Class/Paciente";
import { DataService } from "./../services/data.service";
import { FormBuilder, Form, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { PacienteService } from "../services/paciente.service";

@Component({
  selector: "app-diagnostico",
  templateUrl: "./diagnostico.page.html",
  styleUrls: ["./diagnostico.page.scss"]
})
export class DiagnosticoPage implements OnInit {
  // Banderas para definir los inputs segun el metodo escogido por el ususario

  flagGlim: boolean = false;
  flagGlimDesnutricion: boolean = false;
  flagTamizaje: boolean = false;
  flagTamizajeMNA: boolean = false;
  flagTamizajeMST: boolean = false;
  flagTamizajeMSTPerdidaPeso: boolean = false;

  // tipo de diagnostico seleccionado -> diagnostico glim o tamizaje
  input_tipoDiagnostico: string = "Tamizaje";

  // Tamizaje

  input_tamizajePerdidaApetito: string = "ha comido mucho menos";
  input_tamizajePerdidaPeso: string = ">3Kg";
  input_tamizajeMovilidad: string = "de la cama a la silla";
  input_tamizajeEnfermedadAgudaEstresPsicologico: string = "Si";
  input_tamizajeProblemasNeuropsicologicos: string =
    "Demencia o depresión grave";
  input_tamizajeIMC: string = "< 19";
  input_tamizajePerimetroPantorilla: string = "< 31cm";

  // diagnostico glim, criterios fenotípicos

  input_glimPerdidaPeso: string = "> 5% en los últimos seis meses";
  input_glimIMC: string = "< 20% si menor a 70 años";
  input_glimReduccionMuscular: string = "No";

  // diagnostico glim, criterios etiológicos

  input_glimReduccionIngesta: string = "< 50% del requerimiento por una semana";
  input_glimInflamacion: string = "No";

  // diagnostico glim, si hay desnutrición:

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private paciente: PacienteService
  ) {}

  idAux: number;
  ngOnInit() {
    this.idAux = this.paciente.getId();
  }

  diagnosticoForm = this.formBuilder.group({
    input_tipoDiagnostico: ["", Validators.required],
    tamizaje: this.formBuilder.group({
      tipoTamizaje: [""],
      MNA: this.formBuilder.group({
        input_tamizajePerdidaApetito: [""],
        input_tamizajePerdidaPeso: [""],
        input_tamizajeMovilidad: [""],
        input_tamizajeEnfermedadAgudaEstresPsicologico: [""],
        input_tamizajeProblemasNeuropsicologicos: [""],
        input_tamizajeIMC: [""],
        input_tamizajePerimetroPantorilla: [""],
        resultado: [{ value: "", disabled: true }]
      }),
      MST: this.formBuilder.group({
        input_tamizajePerdidaPeso: [""],
        input_tamizajeCantidadPerdidaPeso: [""], // este depende del de arriba
        input_tamizajeDisminucionApetito: [""],
        resultado: [{ value: "", disabled: true }]
      })
    }),
    glim: this.formBuilder.group({
      criteriosFenotipicos: this.formBuilder.group({
        input_glimPerdidaPeso: [""],
        input_glimIMC: [""],
        input_glimReduccionMuscular: [""]
      }),
      criteriosEtiologicos: this.formBuilder.group({
        input_glimReduccionIngesta: [""],
        input_glimInflamacion: [""]
      }),
      resultado: [{ value: "", disabled: true }],
      desnutricion: this.formBuilder.group({
        input_perdidaPeso: [""],
        input_imc: [""],
        input_reduccionMasaMuscular: [""],
        resultado: [{ value: "", disabled: true }]
      })
    })
  });

  errorMessages = {
    tipoDiagnostico: [{ type: "required", message: "Obligatorio" }],
    perdidaApetito: [{ type: "required", message: "Selecciona" }],

    perdidaPeso: [{ type: "required", message: "Selecciona" }],
    cantidadPerdidaPeso: [{ type: "required", message: "Selecciona" }],
    disminucionApetito: [{ type: "required", message: "Selecciona" }],
    movilidad: [{ type: "required", message: "Selecciona" }],
    enfermedadAguda: [{ type: "required", message: "Selecciona" }],
    problemasNeuropsicologicos: [{ type: "required", message: "Selecciona" }],
    IMC: [{ type: "required", message: "Selecciona" }],
    perimetroPantorilla: [{ type: "required", message: "Selecciona" }],

    reduccionMuscular: [{ type: "required", message: "Selecciona" }],
    reduccionIngesta: [{ type: "required", message: "Selecciona" }],
    inflamacion: [{ type: "required", message: "Selecciona" }]
  };

  definirMetodoTipoDiagnostico() {
    if (this.diagnosticoForm.get("input_tipoDiagnostico").value == "Tamizaje") {
      this.diagnosticoForm
        .get("tamizaje.tipoTamizaje")
        .setValidators([Validators.required]);
      this.diagnosticoForm
        .get("tamizaje.tipoTamizaje")
        .updateValueAndValidity();

      this.diagnosticoForm
        .get("glim.criteriosFenotipicos.input_glimPerdidaPeso")
        .setValidators([]);
      this.diagnosticoForm
        .get("glim.criteriosFenotipicos.input_glimPerdidaPeso")
        .updateValueAndValidity();
      this.diagnosticoForm
        .get("glim.criteriosFenotipicos.input_glimIMC")
        .setValidators([]);
      this.diagnosticoForm
        .get("glim.criteriosFenotipicos.input_glimIMC")
        .updateValueAndValidity();
      this.diagnosticoForm
        .get("glim.criteriosFenotipicos.input_glimReduccionMuscular")
        .setValidators([]);
      this.diagnosticoForm
        .get("glim.criteriosFenotipicos.input_glimReduccionMuscular")
        .updateValueAndValidity();
      this.diagnosticoForm
        .get("glim.criteriosEtiologicos.input_glimReduccionIngesta")
        .setValidators([]);
      this.diagnosticoForm
        .get("glim.criteriosEtiologicos.input_glimReduccionIngesta")
        .updateValueAndValidity();
      this.diagnosticoForm
        .get("glim.criteriosEtiologicos.input_glimInflamacion")
        .setValidators([]);
      this.diagnosticoForm
        .get("glim.criteriosEtiologicos.input_glimInflamacion")
        .updateValueAndValidity();

      this.flagTamizaje = true;
      this.flagGlim = false;
    } else if (
      this.diagnosticoForm.get("input_tipoDiagnostico").value == "Glim"
    ) {
      this.diagnosticoForm.get("tamizaje.tipoTamizaje").setValidators([]);
      this.diagnosticoForm
        .get("tamizaje.tipoTamizaje")
        .updateValueAndValidity();

      this.diagnosticoForm
        .get("glim.criteriosFenotipicos.input_glimPerdidaPeso")
        .setValidators([Validators.required]);
      this.diagnosticoForm
        .get("glim.criteriosFenotipicos.input_glimPerdidaPeso")
        .updateValueAndValidity();
      this.diagnosticoForm
        .get("glim.criteriosFenotipicos.input_glimIMC")
        .setValidators([Validators.required]);
      this.diagnosticoForm
        .get("glim.criteriosFenotipicos.input_glimIMC")
        .updateValueAndValidity();
      this.diagnosticoForm
        .get("glim.criteriosFenotipicos.input_glimReduccionMuscular")
        .setValidators([Validators.required]);
      this.diagnosticoForm
        .get("glim.criteriosFenotipicos.input_glimReduccionMuscular")
        .updateValueAndValidity();
      this.diagnosticoForm
        .get("glim.criteriosEtiologicos.input_glimReduccionIngesta")
        .setValidators([Validators.required]);
      this.diagnosticoForm
        .get("glim.criteriosEtiologicos.input_glimReduccionIngesta")
        .updateValueAndValidity();
      this.diagnosticoForm
        .get("glim.criteriosEtiologicos.input_glimInflamacion")
        .setValidators([Validators.required]);
      this.diagnosticoForm
        .get("glim.criteriosEtiologicos.input_glimInflamacion")
        .updateValueAndValidity();

      this.flagTamizaje = false;
      this.flagGlim = true;

      console.log(this.flagTamizaje);
      console.log(this.flagGlim);
    }
  }

  definirMetodoTamizaje() {
    if (this.diagnosticoForm.get("tamizaje.tipoTamizaje").value == "MNA") {
      this.diagnosticoForm
        .get("tamizaje.MST.input_tamizajePerdidaPeso")
        .setValidators([]);
      this.diagnosticoForm
        .get("tamizaje.MST.input_tamizajePerdidaPeso")
        .updateValueAndValidity();
      this.diagnosticoForm
        .get("tamizaje.MST.input_tamizajeCantidadPerdidaPeso")
        .setValidators([]);
      this.diagnosticoForm
        .get("tamizaje.MST.input_tamizajeCantidadPerdidaPeso")
        .updateValueAndValidity();
      this.diagnosticoForm
        .get("tamizaje.MST.input_tamizajeDisminucionApetito")
        .setValidators([]);
      this.diagnosticoForm
        .get("tamizaje.MST.input_tamizajeDisminucionApetito")
        .updateValueAndValidity();

      this.diagnosticoForm
        .get("tamizaje.MNA.input_tamizajePerdidaApetito")
        .setValidators([Validators.required]);
      this.diagnosticoForm
        .get("tamizaje.MNA.input_tamizajePerdidaApetito")
        .updateValueAndValidity();

      this.diagnosticoForm
        .get("tamizaje.MNA.input_tamizajePerdidaPeso")
        .setValidators([Validators.required]);
      this.diagnosticoForm
        .get("tamizaje.MNA.input_tamizajePerdidaPeso")
        .updateValueAndValidity();

      this.diagnosticoForm
        .get("tamizaje.MNA.input_tamizajeMovilidad")
        .setValidators([Validators.required]);
      this.diagnosticoForm
        .get("tamizaje.MNA.input_tamizajeMovilidad")
        .updateValueAndValidity();

      this.diagnosticoForm
        .get("tamizaje.MNA.input_tamizajeEnfermedadAgudaEstresPsicologico")
        .setValidators([Validators.required]);
      this.diagnosticoForm
        .get("tamizaje.MNA.input_tamizajeEnfermedadAgudaEstresPsicologico")
        .updateValueAndValidity();

      this.diagnosticoForm
        .get("tamizaje.MNA.input_tamizajeProblemasNeuropsicologicos")
        .setValidators([Validators.required]);
      this.diagnosticoForm
        .get("tamizaje.MNA.input_tamizajeProblemasNeuropsicologicos")
        .updateValueAndValidity();

      this.diagnosticoForm
        .get("tamizaje.MNA.input_tamizajeIMC")
        .setValidators([Validators.required]);
      this.diagnosticoForm
        .get("tamizaje.MNA.input_tamizajeIMC")
        .updateValueAndValidity();

      this.diagnosticoForm
        .get("tamizaje.MNA.input_tamizajePerimetroPantorilla")
        .setValidators([Validators.required]);
      this.diagnosticoForm
        .get("tamizaje.MNA.input_tamizajePerimetroPantorilla")
        .updateValueAndValidity();

      this.flagTamizajeMST = false;
      this.flagTamizajeMNA = true;
    } else if (
      this.diagnosticoForm.get("tamizaje.tipoTamizaje").value == "MST"
    ) {
      this.diagnosticoForm
        .get("tamizaje.MNA.input_tamizajePerdidaApetito")
        .setValidators([]);
      this.diagnosticoForm
        .get("tamizaje.MNA.input_tamizajePerdidaApetito")
        .updateValueAndValidity();

      this.diagnosticoForm
        .get("tamizaje.MNA.input_tamizajePerdidaPeso")
        .setValidators([]);
      this.diagnosticoForm
        .get("tamizaje.MNA.input_tamizajePerdidaPeso")
        .updateValueAndValidity();

      this.diagnosticoForm
        .get("tamizaje.MNA.input_tamizajeMovilidad")
        .setValidators([]);
      this.diagnosticoForm
        .get("tamizaje.MNA.input_tamizajeMovilidad")
        .updateValueAndValidity();

      this.diagnosticoForm
        .get("tamizaje.MNA.input_tamizajeEnfermedadAgudaEstresPsicologico")
        .setValidators([]);
      this.diagnosticoForm
        .get("tamizaje.MNA.input_tamizajeEnfermedadAgudaEstresPsicologico")
        .updateValueAndValidity();

      this.diagnosticoForm
        .get("tamizaje.MNA.input_tamizajeProblemasNeuropsicologicos")
        .setValidators([]);
      this.diagnosticoForm
        .get("tamizaje.MNA.input_tamizajeProblemasNeuropsicologicos")
        .updateValueAndValidity();

      this.diagnosticoForm
        .get("tamizaje.MNA.input_tamizajeIMC")
        .setValidators([]);
      this.diagnosticoForm
        .get("tamizaje.MNA.input_tamizajeIMC")
        .updateValueAndValidity();

      this.diagnosticoForm
        .get("tamizaje.MNA.input_tamizajePerimetroPantorilla")
        .setValidators([]);
      this.diagnosticoForm
        .get("tamizaje.MNA.input_tamizajePerimetroPantorilla")
        .updateValueAndValidity();

      this.diagnosticoForm
        .get("tamizaje.MST.input_tamizajePerdidaPeso")
        .setValidators([Validators.required]);
      this.diagnosticoForm
        .get("tamizaje.MST.input_tamizajePerdidaPeso")
        .updateValueAndValidity();

      this.diagnosticoForm
        .get("tamizaje.MST.input_tamizajeCantidadPerdidaPeso")
        .setValidators([]);
      this.diagnosticoForm
        .get("tamizaje.MST.input_tamizajeCantidadPerdidaPeso")
        .updateValueAndValidity();

      this.diagnosticoForm
        .get("tamizaje.MST.input_tamizajeDisminucionApetito")
        .setValidators([Validators.required]);
      this.diagnosticoForm
        .get("tamizaje.MST.input_tamizajeDisminucionApetito")
        .updateValueAndValidity();

      this.flagTamizajeMST = true;
      this.flagTamizajeMNA = false;
    }
  }

  calcularDesnutricion() {
    this.idAux = this.paciente.getId();

    this.dataService.getPaciente(this.idAux).then(auxPaciente => {
      if (this.diagnosticoForm.valid) {
        let auxTotal: number = 0;
        if (
          this.diagnosticoForm.get("input_tipoDiagnostico").value == "Tamizaje"
        ) {
          auxPaciente.metodoDiagnostico = "Tamizaje";
          if (
            this.diagnosticoForm.get("tamizaje.tipoTamizaje").value == "MNA"
          ) {
            auxPaciente.metodoTamizaje = "MNA";

            auxTotal += Number(
              this.diagnosticoForm.get(
                "tamizaje.MNA.input_tamizajePerdidaApetito"
              ).value
            );
            auxTotal += Number(
              this.diagnosticoForm.get("tamizaje.MNA.input_tamizajePerdidaPeso")
                .value
            );
            auxTotal += Number(
              this.diagnosticoForm.get("tamizaje.MNA.input_tamizajeMovilidad")
                .value
            );
            auxTotal += Number(
              this.diagnosticoForm.get(
                "tamizaje.MNA.input_tamizajeEnfermedadAgudaEstresPsicologico"
              ).value
            );
            auxTotal += Number(
              this.diagnosticoForm.get(
                "tamizaje.MNA.input_tamizajeProblemasNeuropsicologicos"
              ).value
            );
            auxTotal += Number(
              this.diagnosticoForm.get("tamizaje.MNA.input_tamizajeIMC").value
            );
            auxTotal += Number(
              this.diagnosticoForm.get(
                "tamizaje.MNA.input_tamizajePerimetroPantorilla"
              ).value
            );

            auxTotal += Number(
              this.diagnosticoForm.get(
                "tamizaje.MNA.input_tamizajePerdidaApetito"
              ).value
            );
            auxTotal += Number(
              this.diagnosticoForm.get("tamizaje.MNA.input_tamizajePerdidaPeso")
                .value
            );
            auxTotal += Number(
              this.diagnosticoForm.get("tamizaje.MNA.input_tamizajeMovilidad")
                .value
            );
            auxTotal += Number(
              this.diagnosticoForm.get(
                "tamizaje.MNA.input_tamizajeEnfermedadAgudaEstresPsicologico"
              ).value
            );
            auxTotal += Number(
              this.diagnosticoForm.get(
                "tamizaje.MNA.input_tamizajeProblemasNeuropsicologicos"
              ).value
            );
            auxTotal += Number(
              this.diagnosticoForm.get("tamizaje.MNA.input_tamizajeIMC").value
            );
            auxTotal += Number(
              this.diagnosticoForm.get(
                "tamizaje.MNA.input_tamizajePerimetroPantorilla"
              ).value
            );

            if (auxTotal > 11) {
              auxPaciente.diagnostico = "Normal";
              this.diagnosticoForm
                .get("tamizaje.MNA.resultado")
                .setValue("Normal");
            } else if (auxTotal > 7) {
              auxPaciente.diagnostico = "Riesgo";
              this.diagnosticoForm
                .get("tamizaje.MNA.resultado")
                .setValue("Riesgo");
            } else if (auxTotal >= 0) {
              auxPaciente.diagnostico = "Desnutricion";
              this.diagnosticoForm
                .get("tamizaje.MNA.resultado")
                .setValue("Desnutricion");
            }

            // fin
          } else if (
            this.diagnosticoForm.get("tamizaje.tipoTamizaje").value == "MST"
          ) {
            auxPaciente.metodoTamizaje = "MST";
            auxTotal += Number(
              this.diagnosticoForm.get("tamizaje.MST.input_tamizajePerdidaPeso")
                .value
            );
            // si el paciente tiene perdida de peso, se le suma la cantidad de perdida de peso
            if (
              this.diagnosticoForm.get("tamizaje.MST.input_tamizajePerdidaPeso")
                .value == "2"
            ) {
              auxTotal += Number(
                this.diagnosticoForm.get(
                  "tamizaje.MST.input_tamizajePerdidaPeso"
                ).value
              );
            }
            auxTotal += Number(
              this.diagnosticoForm.get(
                "tamizaje.MST.input_tamizajeDisminucionApetito"
              ).value
            );

            if (auxTotal > 3) {
              auxPaciente.diagnostico = "Riesgo Alto";
              this.diagnosticoForm
                .get("tamizaje.MST.resultado")
                .setValue("Riesgo Alto");
            } else if (auxTotal > 1) {
              auxPaciente.diagnostico="Riesgo Medio";
              this.diagnosticoForm
                .get("tamizaje.MST.resultado")
                .setValue("Riesgo Medio");
            } else if (auxTotal >= 0) {
              auxPaciente.diagnostico = "Sin riesgo";
              this.diagnosticoForm
                .get("tamizaje.MST.resultado")
                .setValue("Sin riesgo");
            }
            // fin
          }
        } else if (
          this.diagnosticoForm.get("input_tipoDiagnostico").value == "Glim"
        ) {
          auxPaciente.metodoDiagnostico = "Glim";

          let auxTotalFenotipico: number = 0;
          let auxTotalEtiologico: number = 0;

          auxTotalFenotipico += Number(
            this.diagnosticoForm.get(
              "glim.criteriosFenotipicos.input_glimPerdidaPeso"
            ).value
          );
          auxTotalFenotipico += Number(
            this.diagnosticoForm.get("glim.criteriosFenotipicos.input_glimIMC")
              .value
          );
          auxTotalFenotipico += Number(
            this.diagnosticoForm.get(
              "glim.criteriosFenotipicos.input_glimReduccionMuscular"
            ).value
          );

          auxTotalEtiologico += Number(
            this.diagnosticoForm.get(
              "glim.criteriosEtiologicos.input_glimReduccionIngesta"
            ).value
          );
          auxTotalEtiologico += Number(
            this.diagnosticoForm.get(
              "glim.criteriosEtiologicos.input_glimInflamacion"
            ).value
          );

          if (auxTotalEtiologico > 0 && auxTotalFenotipico > 0) {
            auxPaciente.diagnostico = "Desnutricion";
            this.flagGlimDesnutricion = true;
            this.diagnosticoForm.get("glim.resultado").setValue("Desnutricion");
          } else {
            auxPaciente.diagnostico = "Sin Desnutricion";
            this.flagGlimDesnutricion = false;
            this.diagnosticoForm
              .get("glim.resultado")
              .setValue("Sin Desnutricion");
          }
        }
      }
    });
  }

  // metodo glim cuando el resultado es desnutricion
  // se calcula la severidad de la desnutricion

  calcularSeveridadDesnutricion() {
    this.idAux = this.paciente.getId();

    this.dataService.getPaciente(this.idAux).then(auxPaciente => {
      if (this.diagnosticoForm.valid) {
        let auxTotal: number = 0;

        auxTotal += Number(
          this.diagnosticoForm.get("glim.desnutricion.input_perdidaPeso")
        );
        auxTotal += Number(
          this.diagnosticoForm.get("glim.desnutricion.input_imc")
        );
        auxTotal += Number(
          this.diagnosticoForm.get(
            "glim.desnutricion.input_reduccionMasaMuscular"
          )
        );

        if (auxTotal > 0) {
          auxPaciente.severidadDesnutricion = "Severa";
          this.diagnosticoForm
            .get("glim.desnutricion.resultado")
            .setValue("Severa");
        } else if (auxTotal == 0) {
          auxPaciente.severidadDesnutricion = "Moderada";
          this.diagnosticoForm
            .get("glim.desnutricion.resultado")
            .setValue("Moderada");
        }

        this.dataService.updatePaciente(auxPaciente);
      }
    });
  }

  definirEntradaMSTPeso() {
    if (
      this.diagnosticoForm.get("tamizaje.MST.input_tamizajePerdidaPeso")
        .value == "0"
    ) {
      this.diagnosticoForm
        .get("tamizaje.MST.input_tamizajeCantidadPerdidaPeso")
        .setValidators([Validators.required]);
      this.diagnosticoForm
        .get("tamizaje.MST.input_tamizajeCantidadPerdidaPeso")
        .updateValueAndValidity();

      this.flagTamizajeMSTPerdidaPeso = true;
    } else if (
      this.diagnosticoForm.get("tamizaje.MST.input_tamizajePerdidaPeso")
        .value == "2"
    ) {
      this.diagnosticoForm
        .get("tamizaje.MST.input_tamizajeCantidadPerdidaPeso")
        .setValidators([]);
      this.diagnosticoForm
        .get("tamizaje.MST.input_tamizajeCantidadPerdidaPeso")
        .updateValueAndValidity();

      this.flagTamizajeMSTPerdidaPeso = false;
    }
    this.calcularDesnutricion();
  }

  imprimir() {
    console.log(this.input_tamizajePerdidaPeso);
  }
  // se suma los puntajes del cuestionario para verificar el nivel de desnutricion
  interpretacionResultadosTamizaje() {}

  // si hay desnutrición, se imprime el cuadro con los resultados// puede ir arriba
  nivelDesnutricion() {}

  getTipoDiagnostico() {
    return this.diagnosticoForm.get("input_tipoDiagnostico");
  }

  getTamizajePerdidaApetito() {
    return this.diagnosticoForm.get(
      "tamizaje.MNA.input_tamizajePerdidaApetito"
    );
  }

  getTamizajePerdidaPeso() {
    return this.diagnosticoForm.get("tamizaje.MNA.input_tamizajePerdidaPeso");
  }

  getTamizajeMovilidad() {
    return this.diagnosticoForm.get("tamizaje.MNA.input_tamizajeMovilidad");
  }

  getTamizajeEnfermedadAgudaEstresPsicologico() {
    return this.diagnosticoForm.get(
      "tamizaje.MNA.input_tamizajeEnfermedadAgudaEstresPsicologico"
    );
  }

  getTamizajeProblemasNeuropsicologicos() {
    return this.diagnosticoForm.get(
      "tamizaje.MNA.input_tamizajeProblemasNeuropsicologicos"
    );
  }

  getTamizajeIMC() {
    return this.diagnosticoForm.get("tamizaje.MNA.input_tamizajeIMC");
  }

  getTamizajePerimetroPantorilla() {
    return this.diagnosticoForm.get(
      "tamizaje.MNA.input_tamizajePerimetroPantorilla"
    );
  }

  getGlimPerdidaPeso() {
    return this.diagnosticoForm.get(
      "glim.criteriosFenotipicos.input_glimPerdidaPeso"
    );
  }

  getGlimIMC() {
    return this.diagnosticoForm.get("glim.criteriosFenotipicos.input_glimIMC");
  }

  getGlimReduccionMuscular() {
    return this.diagnosticoForm.get(
      "glim.criteriosFenotipicos.input_glimReduccionMuscular"
    );
  }

  getGlimReduccionIngesta() {
    return this.diagnosticoForm.get(
      "glim.criteriosEtiologicos.input_glimReduccionIngesta"
    );
  }

  getGlimInflamacion() {
    return this.diagnosticoForm.get(
      "glim.criteriosEtiologicos.input_glimInflamacion"
    );
  }

  getTamizajeMSTPerdidaPeso() {
    return this.diagnosticoForm.get("tamizaje.MST.input_tamizajePerdidaPeso");
  }

  getTamizajeMSTCantidadPerdidaPeso() {
    return this.diagnosticoForm.get(
      "tamizaje.MST.input_tamizajeCantidadPerdidaPeso"
    );
  }

  getTamizajeMSTDisminucionApetito() {
    return this.diagnosticoForm.get(
      "tamizaje.MST.input_tamizajeDisminucionApetito"
    );
  }
}
