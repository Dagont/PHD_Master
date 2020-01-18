import { PacienteService } from "./../services/paciente.service";
import { Paciente } from "./../Class/Paciente";
import { DataService } from "./../services/data.service";
import { FormBuilder, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-requerimientos",
  templateUrl: "./requerimientos.page.html",
  styleUrls: ["./requerimientos.page.scss"]
})
export class RequerimientosPage implements OnInit {
  flagPulgarPeso: boolean = false;
  // seleccion del metodo de requerimiento calorias: pulgar o harris benedict
  input_metodoRequerimiento: string;

  // metodo pulgar
  input_pulgarKCRequeridas: number;

  // Metodo harris
  input_peso: number;
  input_talla: number;
  input_edad: number;
  input_sexo: string;

  // requerimiento proteina
  input_gramosProteinaRequeridosKilo: number;

  // requerimiento liquidos
  input_situacionClinica: string;

  idAux: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    public paciente: PacienteService
  ) {}

  ngOnInit() {
    
  }

  ionViewDidEnter() {
    this.idAux = this.paciente.getId();
    console.log(this.idAux);
  }

  errorMessages = {
    metodoRequerimiento: [
      { type: "required", message: "Seleccione un metodo" }
    ],
    kcRequeridas: [{ type: "required", message: "Obligatorio" }],
    peso: [{ type: "required", message: "Obligatorio" }],
    talla: [{ type: "required", message: "Obligatorio" }],
    edad: [{ type: "required", message: "Obligatorio" }],
    sexo: [{ type: "required", message: "Obligatorio" }],
    proteina: [{ type: "required", message: "Obligatorio" }],
    situacionClinica: [{ type: "required", message: "Obligatorio" }]
  };

  requerimientosForm = this.formBuilder.group({
    input_metodoRequerimiento: ["", Validators.required],
    pulgar: this.formBuilder.group({
      input_pulgarKCRequeridas: ["", Validators.required],
      input_peso: [""],
      resultado: [{ value: "", disabled: true }]
    }),
    harris: this.formBuilder.group({
      input_peso: ["", Validators.required],
      input_talla: ["", Validators.required],
      input_edad: ["", Validators.required],
      input_sexo: ["", Validators.required],
      resultado: [{ value: "", disabled: true }]
    }),
    proteina: this.formBuilder.group({
      input_gramosProteinaRequeridosKilo: ["", Validators.required],
      resultado: [{ value: "", disabled: true }]
    }),
    liquido: this.formBuilder.group({
      input_edad: ["", Validators.required],
      input_situacionClinicaLiquido: ["", Validators.required],
      toggle_situacionClinicaPeso: ["", Validators.required],
      input_peso: ["", Validators.required],
      resultado: [{ value: "", disabled: true }]
    })
  });

  // calculo calorias por el metodo pulgar
  calculoPulgar() {
    this.idAux = this.paciente.getId();

    this.dataService.getPaciente(this.idAux).then(auxPaciente => {
      if (
        this.requerimientosForm.get("pulgar.input_pulgarKCRequeridas").valid
      ) {
        if (auxPaciente == undefined || auxPaciente.peso == undefined) {
          this.flagPulgarPeso = true;
          this.requerimientosForm
            .get("pulgar.input_peso")
            .setValidators([Validators.required]);
          this.requerimientosForm
            .get("pulgar.input_peso")
            .updateValueAndValidity();

          if (this.requerimientosForm.get("pulgar.input_peso").valid) {
            auxPaciente.peso = Number(
              this.requerimientosForm.get("pulgar.input_peso").value
            );
            let auxResultado = 0;
            auxResultado =
              Number(
                this.requerimientosForm.get("pulgar.input_pulgarKCRequeridas")
                  .value
              ) * auxPaciente.peso;
            auxPaciente.requerimientoCaloriasPulgar = auxResultado;
            auxPaciente.kiloCaloriasPulgar = Number(
              this.requerimientosForm.get("pulgar.input_pulgarKCRequeridas")
                .value
            );

            this.requerimientosForm
              .get("pulgar.resultado")
              .setValue(auxResultado);
            this.dataService.updatePaciente(auxPaciente);
          }
        } else {
          let auxResultado = 0;
          auxResultado =
            Number(
              this.requerimientosForm.get("pulgar.input_pulgarKCRequeridas")
                .value
            ) * auxPaciente.peso;
          auxPaciente.requerimientoCaloriasPulgar = auxResultado;
          auxPaciente.kiloCaloriasPulgar = Number(
            this.requerimientosForm.get("pulgar.input_pulgarKCRequeridas").value
          );

          this.requerimientosForm
            .get("pulgar.resultado")
            .setValue(auxResultado);
          this.dataService.updatePaciente(auxPaciente);
        }
      } else {
        this.flagPulgarPeso = false;
        this.requerimientosForm.get("pulgar.input_peso").setValidators([]);
        this.requerimientosForm
          .get("pulgar.input_peso")
          .updateValueAndValidity();
      }
    });
  }

  // calculo calorias por el metodo harris
  calculoHarrisBenedict() {
    if (
      this.requerimientosForm.get("harris.input_peso").valid &&
      this.requerimientosForm.get("harris.input_talla").valid &&
      this.requerimientosForm.get("harris.input_edad").valid &&
      this.requerimientosForm.get("harris.input_sexo").valid
    ) {
      let auxValor = 0;
      this.idAux = this.paciente.getId();
      this.dataService.getPaciente(this.idAux).then(auxPaciente => {
        if (
          this.requerimientosForm.get("harris.input_sexo").value == "hombre"
        ) {
          auxValor =
            66.47 +
            13.75 *
              Number(this.requerimientosForm.get("harris.input_peso").value) +
            5 *
              Number(this.requerimientosForm.get("harris.input_talla").value) -
            6.76 *
              Number(this.requerimientosForm.get("harris.input_edad").value);
        } else if (
          this.requerimientosForm.get("harris.input_sexo").value == "mujer"
        ) {
          auxValor =
            66.51 +
            9.6 *
              Number(this.requerimientosForm.get("harris.input_peso").value) +
            1.85 *
              Number(this.requerimientosForm.get("harris.input_talla").value) -
            4.68 *
              Number(this.requerimientosForm.get("harris.input_edad").value);
        }
        this.requerimientosForm.get("harris.resultado").setValue(auxValor);
        auxPaciente.requerimientoCaloriasHarris = auxValor;
        this.dataService.updatePaciente(auxPaciente);
      });
    }
  }

  // calculo de la proteina por kilo
  calculoProteina() {
    if (
      this.requerimientosForm.get("proteina.input_gramosProteinaRequeridosKilo")
        .valid
    ) {
      this.idAux = this.paciente.getId();

      this.dataService.getPaciente(this.idAux).then(auxPaciente => {
        let auxValor = 0;
        auxValor =
          Number(
            this.requerimientosForm.get(
              "proteina.input_gramosProteinaRequeridosKilo"
            ).value
          ) * Number(auxPaciente.peso);
        auxPaciente.gramosProteina = 
          Number(
            this.requerimientosForm.get(
              "proteina.input_gramosProteinaRequeridosKilo"
            ).value
          )
        ;
        auxPaciente.requerimientoProteina=auxValor;
        this.requerimientosForm.get("proteina.resultado").setValue(auxValor);
        this.dataService.updatePaciente(auxPaciente);
      });
    }
  }

  // calculo de liquido por kilo, necesario la carga de la tabla de situacion clinica 08/12
  calculoLiquido() {
    if (
      this.requerimientosForm.get("liquido.input_edad").valid &&
      this.requerimientosForm.get("liquido.input_situacionClinicaLiquido")
        .valid &&
      this.requerimientosForm.get("liquido.input_peso").valid
    ) {
      console.log("entra");
      let auxValor = 0;
      this.idAux = this.paciente.getId();
      this.dataService.getPaciente(this.idAux).then((auxPaciente)=>{
        console.log("entra2");
        let auxRequerimientoLiquido = 0;
        if (
          this.requerimientosForm.get("liquido.input_situacionClinicaLiquido")
            .value == "1"
        ) {
          auxRequerimientoLiquido = 25;
        } else if (
          this.requerimientosForm.get("liquido.input_situacionClinicaLiquido")
            .value == "0"
        ) {
          if (this.requerimientosForm.get("liquido.input_edad").value > 75) {
            auxRequerimientoLiquido = 25;
          } else if (
            this.requerimientosForm.get("liquido.input_edad").value > 55
          ) {
            auxRequerimientoLiquido = 30;
          } else if (
            this.requerimientosForm.get("liquido.input_edad").value > 17
          ) {
            auxRequerimientoLiquido = 35;
          }
        }
  
        if (this.requerimientosForm.get("liquido.toggle_situacionClinicaPeso").value) {
          if (
            this.requerimientosForm.get("liquido.input_situacionClinicaLiquido")
              .value == "1"
          ) {
            auxRequerimientoLiquido = 25;
          } else if (
            this.requerimientosForm.get("liquido.input_edad").value > 75
          ) {
            auxRequerimientoLiquido = 30;
          } else if (
            this.requerimientosForm.get("liquido.input_edad").value > 55
          ) {
            auxRequerimientoLiquido = 30;
          } else if (
            this.requerimientosForm.get("liquido.input_edad").value > 17
          ) {
            auxRequerimientoLiquido = 35;
          }
        }
        this.requerimientosForm.get("liquido.resultado").setValue(auxRequerimientoLiquido);
        auxPaciente.requerimientoLiquido = auxRequerimientoLiquido;
        this.dataService.updatePaciente(auxPaciente);
      });      
    }
  }

  getMetodoRequerimiento() {
    return this.requerimientosForm.get("input_metodoRequerimiento");
  }

  getPulgarKCrequeridas() {
    return this.requerimientosForm.get("pulgar.input_pulgarKCRequeridas");
  }

  getHarrisPeso() {
    return this.requerimientosForm.get("harris.input_peso");
  }

  getHarrisTalla() {
    return this.requerimientosForm.get("harris.input_talla");
  }

  getHarrisEdad() {
    return this.requerimientosForm.get("harris.input_edad");
  }

  getHarrisSexo() {
    return this.requerimientosForm.get("harris.input_sexo");
  }

  getGramosProteina() {
    return this.requerimientosForm.get(
      "proteina.input_gramosProteinaRequeridosKilo"
    );
  }

  getLiquidoEdad() {
    return this.requerimientosForm.get("liquido.input_edad");
  }

  getLiquidoSituacionClinica() {
    return this.requerimientosForm.get("liquido.input_situacionClinicaLiquido");
  }

  getLiquidoBajoPeso() {
    return this.requerimientosForm.get("liquido.toggle_situacionClinicaPeso");
  }

  getLiquidoPeso() {
    return this.requerimientosForm.get("liquido.input_peso");
  }

  // retornar el peso ingresado para el calculo de calorias necesarias de pulgar
  getPeso() {
    return this.requerimientosForm.get("pulgar.input_peso");
  }

  // para hacer
  // traer la informacion del paciente y popularla en el formulario
  // verificar metodos de calculos (mirar si se retorna strings de la informacion del formulario)
  // verificar que el peso ingresado por el usuario sea mayor a cero
}
