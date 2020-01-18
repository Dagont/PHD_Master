import { DataService } from "./../services/data.service";
import { PacienteService } from "./../services/paciente.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { ModalEstimacionIngestaPage } from "../modal-estimacion-ingesta/modal-estimacion-ingesta.page";

@Component({
  selector: "app-estimacion-ingesta",
  templateUrl: "./estimacion-ingesta.page.html",
  styleUrls: ["./estimacion-ingesta.page.scss"]
})
export class EstimacionIngestaPage implements OnInit {
  // arreglo nutricion entera total
  arrayNutricionEnteraTotal: Array<[string, number]> = [];

  // arreglos nutricion via oral por horas del día
  arrayDesayuno: Array<[string, number]> = [];
  arrayMediasNueves: Array<[string, number]> = [];
  arrayAlmuerzo: Array<[string, number]> = [];
  arrayOnces: Array<[string, number]> = [];
  arrayCena: Array<[string, number]> = [];
  arrayRefrigerioNocturno: Array<[string, number]> = [];
  arrayExtras: Array<[string, number]> = [];
  arrayLiquidos: Array<[string, number]> = [];

  // Tipo de estimacion de ingesta
  //input_tipoEstimacion: string = "Via Oral";

  // flags para verificar que inputs agregar dependiendo del metodo seleccionado

  flagViaOral: boolean = false;
  flagNutricionEntera: boolean = false;
  flagFormulaArtesanal: boolean = false;

  // flags via oral

  flagDesayuno: boolean = false;
  flagMediasNueves: boolean = false;
  flagAlmuerzo: boolean = false;
  flagOnces: boolean = false;
  flagCena: boolean = false;
  flagRefrigerioNocturno: boolean = false;
  flagExtras: boolean = false;
  flagLiquidos: boolean = false;

  // Calorias totales
  caloriasTotales: number;
  caloriasTotalesKgPeso: number;

  // Proteinas totales
  gramosProteinasTotales: number;
  gramosProteinasTotalesKgPeso: number;

  // Carbohidratos totales
  gramosCarbohidratosTotales: number;

  // gramos de grasa total
  gramosGrasaTotal: number;

  // mg de hierro total
  hierroTotal: number;

  // mg de fosforo total
  fosforoTotal: number;

  // mg de sodio total
  sodioTotal: number;

  // UI de vitamina A total
  vitaminaATotal: number;

  // UI de vitamina D total
  vitaminaDTotal: number;

  // UI de vitamina E total
  vitaminaETotal: number;

  // Desayuno
  // Toggle si el paciente desayuna
  input_toggleDesayuno: boolean = false;

  // productos
  input_productosDesayuno: string;

  // porciones por producto
  input_porcionProductoDesayuno: number;

  // Medias nueves
  // Toggle si el paciente tiene medias nueves
  input_toggleMediasNueves: boolean = false;

  // productos
  input_productosMediasNueves: string;

  // porciones por producto
  input_porcionProductoMediasNueves: number;

  // Almuerzo
  // Toggle si el paciente almuerza
  input_toggleAlmuerzo: boolean = false;

  // productos
  input_productosAlmuerzo: string;

  // porciones por producto
  input_porcionProductoAlmuerzo: number;

  // Onces
  // Toggle si el paciente toma onces
  input_toggleOnces: boolean = false;

  // productos
  input_productosOnces: string;

  // porciones por producto
  input_porcionProductoOnces: number;

  // Cena
  // Toggle si el paciente cena
  input_toggleCena: boolean = false;

  // productos
  input_productosCena: string;

  // porciones por producto
  input_porcionProductoCena: number;

  // Refrigerio nocturno
  // Toggle si el paciente toma refrigerio nocturno
  input_toggleRefrigerioNocturno: boolean = false;

  // productos
  input_productosRefrigerioNocturno: string;

  // porciones por producto
  input_porcionProductoRefrigerioNocturno: number;

  // Extras
  // Toggle si el paciente tiene extras
  input_toggleExtras: boolean = false;

  // productos
  input_productosExtras: string;

  // porciones por producto
  input_porcionProductoExtras: number;

  // Liquidos
  // Toggle si el paciente toma liquidos
  input_toggleLiquidos: boolean = false;

  // productos
  input_productosLiquidos: string;

  // porciones por producto
  input_porcionProductoLiquidos: number;

  // Nutricion Entera Total
  // Selector de producto
  //input_productosNutricionEnteraTotal: string = "Prowhey NET";
  // porciones por producto
  input_porcionNutricionEnteraTotal: number;

  idAux = 0;

  constructor(
    private formBuilder: FormBuilder,
    public paciente: PacienteService,
    private dataService: DataService,
    private modalCtrl: ModalController
  ) {}

  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: ModalEstimacionIngestaPage
    });

    await modal.present();
  }

  ionViewDidEnter() {
    this.idAux = this.paciente.getId();
  }
  ngOnInit() {}

  public errorMessages = {
    tamañoPorcion: [{ type: "required", message: "Gramos por porcion" }],

    productosDesayuno: [
      { type: "required", message: "Seleccione un producto" }
    ],
    porcionDesayuno: [{ type: "required", message: "Cantidad porciones" }],
    productosMediasNueves: [
      { type: "required", message: "Seleccione un producto" }
    ],
    porcionMediasNueves: [{ type: "required", message: "Defina la porción" }],
    productosAlmuerzo: [
      { type: "required", message: "Seleccione un producto" }
    ],
    porcionAlmuerzo: [{ type: "required", message: "Defina la porción" }],
    productosOnces: [{ type: "required", message: "Seleccione un producto" }],
    porcionOnces: [{ type: "required", message: "Defina la porción" }],
    productosCena: [{ type: "required", message: "Seleccione un producto" }],
    porcionCena: [{ type: "required", message: "Defina la porción" }],
    productosRefrigerioNocturno: [
      { type: "required", message: "Seleccione un producto" }
    ],
    porcionRefrigerioNocturno: [
      { type: "required", message: "Defina la porción" }
    ],
    productosExtras: [{ type: "required", message: "Seleccione un producto" }],
    porcionExtras: [{ type: "required", message: "Defina la porción" }],
    productosLiquidos: [
      { type: "required", message: "Seleccione un producto" }
    ],
    porcionLiquidos: [{ type: "required", message: "Defina la porción" }]
  };

  estimacionIngestaForm = this.formBuilder.group({
    input_tipoEstimacion: ["", Validators.required],
    viaOral: this.formBuilder.group({
      verificacionProductos: [""],
      desayuno: this.formBuilder.group({
        toggle_desayuno: [""],
        input_productosDesayuno: [""],
        input_porcionProductoDesayuno: [""]
      }),
      mediasNueves: this.formBuilder.group({
        toggle_mediasNueves: [""],
        input_productosMediasNueves: [""],
        input_porcionProductoMediasNueves: [""]
      }),
      almuerzo: this.formBuilder.group({
        toggle_almuerzo: [""],
        input_productosAlmuerzo: [""],
        input_porcionProductoAlmuerzo: [""]
      }),
      onces: this.formBuilder.group({
        toggle_onces: [""],
        input_productosOnces: [""],
        input_porcionProductoOnces: [""]
      }),
      cena: this.formBuilder.group({
        toggle_cena: [""],
        input_productosCena: [""],
        input_porcionProductoCena: [""]
      }),
      refrigerioNocturno: this.formBuilder.group({
        toggle_refrigerioNocturno: [""],
        input_productosRefrigerioNocturno: [""],
        input_porcionProductoRefrigerioNocturno: [""]
      }),
      extras: this.formBuilder.group({
        toggle_extras: [""],
        input_productosExtras: [""],
        input_porcionProductoExtras: [""]
      }),
      liquidos: this.formBuilder.group({
        toggle_liquidos: [""],
        input_productosLiquidos: [""],
        input_porcionProductoLiquidos: [""]
      })
    }),
    nutricionEnteraTotal: this.formBuilder.group({
      verificacionProductos: [""],
      input_productosNutricionEnteraTotal: [""],
      input_porcionNutricionEnteraTotal: [""],
      formulaArtesanal: this.formBuilder.group({
        toggle_formulaArtesanal: [""],
        input_caloriasGastroclisis: [""],
        input_proteinasGastroclisis: [""]
      })
    })
  });

  guardar() {
    this.idAux = this.paciente.getId();

    this.dataService.getPaciente(this.idAux).then(auxPaciente => {
      if (
        this.estimacionIngestaForm.get("input_tipoEstimacion").value ==
        "Via Oral"
      ) {
        auxPaciente.arrayDesayuno = this.arrayDesayuno;
        auxPaciente.arrayAlmuerzo = this.arrayAlmuerzo;
        auxPaciente.arrayCena = this.arrayCena;
        auxPaciente.arrayExtras = this.arrayExtras;
        auxPaciente.arrayLiquidos = this.arrayLiquidos;
        auxPaciente.arrayMediasNueves = this.arrayMediasNueves;
        auxPaciente.arrayOnces = this.arrayOnces;
        auxPaciente.arrayRefrigerioNocturno = this.arrayRefrigerioNocturno;
      } else if (
        this.estimacionIngestaForm.get("input_tipoEstimacion").value ==
        "Nutricion Entera"
      ) {
        auxPaciente.arrayNutricionEnteraTotal = this.arrayNutricionEnteraTotal;
      }

      this.dataService.updatePaciente(auxPaciente);
    });
  }

  definirEntradaMetodoTipoEstimacion() {
    this.idAux = this.paciente.getId();
    this.dataService.getPaciente(this.idAux).then(auxPaciente => {
      if (
        this.estimacionIngestaForm.get("input_tipoEstimacion").value ==
        "Via Oral"
      ) {
        auxPaciente.metodoEstimacionIngesta = this.estimacionIngestaForm.get(
          "input_tipoEstimacion"
        ).value;

        this.estimacionIngestaForm
          .get("nutricionEnteraTotal.verificacionProductos")
          .setValidators([]);
        this.estimacionIngestaForm
          .get("nutricionEnteraTotal.verificacionProductos")
          .updateValueAndValidity();

        if (this.verificarProductosViaOral()) {
          // existen productos
          this.estimacionIngestaForm
            .get("viaOral.verificacionProductos")
            .setValidators([]);
          this.estimacionIngestaForm
            .get("viaOral.verificacionProductos")
            .updateValueAndValidity();
        } else {
          // no existen productos
          this.estimacionIngestaForm
            .get("viaOral.verificacionProductos")
            .setValidators([Validators.required]);
          this.estimacionIngestaForm
            .get("viaOral.verificacionProductos")
            .updateValueAndValidity();
        }

        this.flagViaOral = true;
        this.flagNutricionEntera = false;

        this.dataService.updatePaciente(auxPaciente).then(() => {
          console.log(
            "termina escoger metodo estimacion",
            auxPaciente.metodoEstimacionIngesta
          );
        });
      } else if (
        this.estimacionIngestaForm.get("input_tipoEstimacion").value ==
        "Nutricion Entera"
      ) {
        auxPaciente.metodoEstimacionIngesta = this.estimacionIngestaForm.get(
          "input_tipoEstimacion"
        ).value;
        this.estimacionIngestaForm
          .get("viaOral.verificacionProductos")
          .setValidators([]);
        this.estimacionIngestaForm
          .get("viaOral.verificacionProductos")
          .updateValueAndValidity();

        if (this.verificarProductosNutricionEnteraTotal()) {
          // existen productos
          this.estimacionIngestaForm
            .get("nutricionEnteraTotal.verificacionProductos")
            .setValidators([]);
          this.estimacionIngestaForm
            .get("nutricionEnteraTotal.verificacionProductos")
            .updateValueAndValidity();
        } else {
          // no existen productos
          this.estimacionIngestaForm
            .get("nutricionEnteraTotal.verificacionProductos")
            .setValidators([Validators.required]);
          this.estimacionIngestaForm
            .get("nutricionEnteraTotal.verificacionProductos")
            .updateValueAndValidity();
        }

        this.flagNutricionEntera = true;
        this.flagViaOral = false;

        this.dataService.updatePaciente(auxPaciente).then(() => {
          console.log(
            "termina escoger metodo estimacion",
            auxPaciente.metodoEstimacionIngesta
          );
        });
      }
    });
  }
  // metodos via oral
  /**
   * @description
   * Define si pide los datos de ingesta del usuario del desayuno (producto y porcion por producto)
   * ademas que añade los requisitos de validacion del Form Build
   */

  definirEntradaDesayuno() {
    if (
      this.estimacionIngestaForm.get("viaOral.desayuno.toggle_desayuno").value
    ) {
      if (this.arrayDesayuno.length > 0) {
      } else {
      }

      this.estimacionIngestaForm
        .get("viaOral.desayuno.input_productosDesayuno")
        .setValidators([Validators.required]);
      this.estimacionIngestaForm
        .get("viaOral.desayuno.input_productosDesayuno")
        .updateValueAndValidity();
      this.estimacionIngestaForm
        .get("viaOral.desayuno.input_porcionProductoDesayuno")
        .setValidators([Validators.required]);
      this.estimacionIngestaForm
        .get("viaOral.desayuno.input_porcionProductoDesayuno")
        .updateValueAndValidity();

      this.flagDesayuno = true;
    } else {
      this.estimacionIngestaForm
        .get("viaOral.desayuno.input_productosDesayuno")
        .setValidators([]);
      this.estimacionIngestaForm
        .get("viaOral.desayuno.input_productosDesayuno")
        .updateValueAndValidity();
      this.estimacionIngestaForm
        .get("viaOral.desayuno.input_porcionProductoDesayuno")
        .setValidators([]);
      this.estimacionIngestaForm
        .get("viaOral.desayuno.input_porcionProductoDesayuno")
        .updateValueAndValidity();

      this.flagDesayuno = false;
    }
  }

  definirEntradaMediasNueves() {
    if (
      this.estimacionIngestaForm.get("viaOral.mediasNueves.toggle_mediasNueves")
        .value
    ) {
      if (this.arrayMediasNueves.length > 0) {
        this.estimacionIngestaForm
          .get("viaOral.mediasNueves.input_productosMediasNueves")
          .setValidators([]);
        this.estimacionIngestaForm
          .get("viaOral.mediasNueves.input_productosMediasNueves")
          .updateValueAndValidity();
        this.estimacionIngestaForm
          .get("viaOral.mediasNueves.input_porcionProductoMediasNueves")
          .setValidators([]);
        this.estimacionIngestaForm
          .get("viaOral.mediasNueves.input_porcionProductoMediasNueves")
          .updateValueAndValidity();
      } else {
        this.estimacionIngestaForm
          .get("viaOral.mediasNueves.input_productosMediasNueves")
          .setValidators([Validators.required]);
        this.estimacionIngestaForm
          .get("viaOral.mediasNueves.input_productosMediasNueves")
          .updateValueAndValidity();
        this.estimacionIngestaForm
          .get("viaOral.mediasNueves.input_porcionProductoMediasNueves")
          .setValidators([Validators.required]);
        this.estimacionIngestaForm
          .get("viaOral.mediasNueves.input_porcionProductoMediasNueves")
          .updateValueAndValidity();
      }

      this.flagMediasNueves = true;
    } else {
      this.estimacionIngestaForm
        .get("viaOral.mediasNueves.input_productosMediasNueves")
        .setValidators([]);
      this.estimacionIngestaForm
        .get("viaOral.mediasNueves.input_productosMediasNueves")
        .updateValueAndValidity();
      this.estimacionIngestaForm
        .get("viaOral.mediasNueves.input_porcionProductoMediasNueves")
        .setValidators([]);
      this.estimacionIngestaForm
        .get("viaOral.mediasNueves.input_porcionProductoMediasNueves")
        .updateValueAndValidity();

      this.flagMediasNueves = false;
    }
  }

  definirEntradaAlmuerzo() {
    if (
      this.estimacionIngestaForm.get("viaOral.almuerzo.toggle_almuerzo").value
    ) {
      if (this.arrayAlmuerzo.length > 0) {
        this.estimacionIngestaForm
          .get("viaOral.almuerzo.input_productosAlmuerzo")
          .setValidators([]);
        this.estimacionIngestaForm
          .get("viaOral.almuerzo.input_productosAlmuerzo")
          .updateValueAndValidity();
        this.estimacionIngestaForm
          .get("viaOral.almuerzo.input_porcionProductoAlmuerzo")
          .setValidators([]);
        this.estimacionIngestaForm
          .get("viaOral.almuerzo.input_porcionProductoAlmuerzo")
          .updateValueAndValidity();
      } else {
        this.estimacionIngestaForm
          .get("viaOral.almuerzo.input_productosAlmuerzo")
          .setValidators([Validators.required]);
        this.estimacionIngestaForm
          .get("viaOral.almuerzo.input_productosAlmuerzo")
          .updateValueAndValidity();
        this.estimacionIngestaForm
          .get("viaOral.almuerzo.input_porcionProductoAlmuerzo")
          .setValidators([Validators.required]);
        this.estimacionIngestaForm
          .get("viaOral.almuerzo.input_porcionProductoAlmuerzo")
          .updateValueAndValidity();
      }

      this.flagAlmuerzo = true;
    } else {
      this.estimacionIngestaForm
        .get("viaOral.almuerzo.input_productosAlmuerzo")
        .setValidators([]);
      this.estimacionIngestaForm
        .get("viaOral.almuerzo.input_productosAlmuerzo")
        .updateValueAndValidity();
      this.estimacionIngestaForm
        .get("viaOral.almuerzo.input_porcionProductoAlmuerzo")
        .setValidators([]);
      this.estimacionIngestaForm
        .get("viaOral.almuerzo.input_porcionProductoAlmuerzo")
        .updateValueAndValidity();

      this.flagAlmuerzo = false;
    }
  }

  definirEntradaOnces() {
    if (this.estimacionIngestaForm.get("viaOral.onces.toggle_onces").value) {
      if (this.arrayOnces.length > 0) {
        this.estimacionIngestaForm
          .get("viaOral.onces.input_productosOnces")
          .setValidators([]);
        this.estimacionIngestaForm
          .get("viaOral.onces.input_productosOnces")
          .updateValueAndValidity();
        this.estimacionIngestaForm
          .get("viaOral.onces.input_porcionProductoOnces")
          .setValidators([]);
        this.estimacionIngestaForm
          .get("viaOral.onces.input_porcionProductoOnces")
          .updateValueAndValidity();
      } else {
        this.estimacionIngestaForm
          .get("viaOral.onces.input_productosOnces")
          .setValidators([Validators.required]);
        this.estimacionIngestaForm
          .get("viaOral.onces.input_productosOnces")
          .updateValueAndValidity();
        this.estimacionIngestaForm
          .get("viaOral.onces.input_porcionProductoOnces")
          .setValidators([Validators.required]);
        this.estimacionIngestaForm
          .get("viaOral.onces.input_porcionProductoOnces")
          .updateValueAndValidity();
      }

      this.flagOnces = true;
    } else {
      this.estimacionIngestaForm
        .get("viaOral.onces.input_productosOnces")
        .setValidators([]);
      this.estimacionIngestaForm
        .get("viaOral.onces.input_productosOnces")
        .updateValueAndValidity();
      this.estimacionIngestaForm
        .get("viaOral.onces.input_porcionProductoOnces")
        .setValidators([]);
      this.estimacionIngestaForm
        .get("viaOral.onces.input_porcionProductoOnces")
        .updateValueAndValidity();

      this.flagOnces = false;
    }
  }

  definirEntradaCena() {
    if (this.estimacionIngestaForm.get("viaOral.cena.toggle_cena").value) {
      if (this.arrayCena.length > 0) {
        this.estimacionIngestaForm
          .get("viaOral.cena.input_productosCena")
          .setValidators([]);
        this.estimacionIngestaForm
          .get("viaOral.cena.input_productosCena")
          .updateValueAndValidity();
        this.estimacionIngestaForm
          .get("viaOral.cena.input_porcionProductoCena")
          .setValidators([]);
        this.estimacionIngestaForm
          .get("viaOral.cena.input_porcionProductoCena")
          .updateValueAndValidity();
      } else {
        this.estimacionIngestaForm
          .get("viaOral.cena.input_productosCena")
          .setValidators([Validators.required]);
        this.estimacionIngestaForm
          .get("viaOral.cena.input_productosCena")
          .updateValueAndValidity();
        this.estimacionIngestaForm
          .get("viaOral.cena.input_porcionProductoCena")
          .setValidators([Validators.required]);
        this.estimacionIngestaForm
          .get("viaOral.cena.input_porcionProductoCena")
          .updateValueAndValidity();
      }

      this.flagCena = true;
    } else {
      this.estimacionIngestaForm
        .get("viaOral.cena.input_productosCena")
        .setValidators([]);
      this.estimacionIngestaForm
        .get("viaOral.cena.input_productosCena")
        .updateValueAndValidity();
      this.estimacionIngestaForm
        .get("viaOral.cena.input_porcionProductoCena")
        .setValidators([]);
      this.estimacionIngestaForm
        .get("viaOral.cena.input_porcionProductoCena")
        .updateValueAndValidity();

      this.flagCena = false;
    }
  }

  definirEntradaRefrigerioNocturno() {
    if (
      this.estimacionIngestaForm.get(
        "viaOral.refrigerioNocturno.toggle_refrigerioNocturno"
      ).value
    ) {
      if (this.arrayRefrigerioNocturno.length > 0) {
        this.estimacionIngestaForm
          .get("viaOral.refrigerioNocturno.input_productosRefrigerioNocturno")
          .setValidators([]);
        this.estimacionIngestaForm
          .get("viaOral.refrigerioNocturno.input_productosRefrigerioNocturno")
          .updateValueAndValidity();
        this.estimacionIngestaForm
          .get(
            "viaOral.refrigerioNocturno.input_porcionProductoRefrigerioNocturno"
          )
          .setValidators([]);
        this.estimacionIngestaForm
          .get(
            "viaOral.refrigerioNocturno.input_porcionProductoRefrigerioNocturno"
          )
          .updateValueAndValidity();
      } else {
        this.estimacionIngestaForm
          .get("viaOral.refrigerioNocturno.input_productosRefrigerioNocturno")
          .setValidators([Validators.required]);
        this.estimacionIngestaForm
          .get("viaOral.refrigerioNocturno.input_productosRefrigerioNocturno")
          .updateValueAndValidity();
        this.estimacionIngestaForm
          .get(
            "viaOral.refrigerioNocturno.input_porcionProductoRefrigerioNocturno"
          )
          .setValidators([Validators.required]);
        this.estimacionIngestaForm
          .get(
            "viaOral.refrigerioNocturno.input_porcionProductoRefrigerioNocturno"
          )
          .updateValueAndValidity();
      }

      this.flagRefrigerioNocturno = true;
    } else {
      this.estimacionIngestaForm
        .get("viaOral.refrigerioNocturno.input_productosRefrigerioNocturno")
        .setValidators([]);
      this.estimacionIngestaForm
        .get("viaOral.refrigerioNocturno.input_productosRefrigerioNocturno")
        .updateValueAndValidity();
      this.estimacionIngestaForm
        .get(
          "viaOral.refrigerioNocturno.input_porcionProductoRefrigerioNocturno"
        )
        .setValidators([]);
      this.estimacionIngestaForm
        .get(
          "viaOral.refrigerioNocturno.input_porcionProductoRefrigerioNocturno"
        )
        .updateValueAndValidity();

      this.flagRefrigerioNocturno = false;
    }
  }

  definirEntradaExtras() {
    if (this.estimacionIngestaForm.get("viaOral.extras.toggle_extras").value) {
      if (this.arrayExtras.length > 0) {
        this.estimacionIngestaForm
          .get("viaOral.extras.input_productosExtras")
          .setValidators([]);
        this.estimacionIngestaForm
          .get("viaOral.extras.input_productosExtras")
          .updateValueAndValidity();
        this.estimacionIngestaForm
          .get("viaOral.extras.input_porcionProductoExtras")
          .setValidators([]);
        this.estimacionIngestaForm
          .get("viaOral.extras.input_porcionProductoExtras")
          .updateValueAndValidity();
      } else {
        this.estimacionIngestaForm
          .get("viaOral.extras.input_productosExtras")
          .setValidators([Validators.required]);
        this.estimacionIngestaForm
          .get("viaOral.extras.input_productosExtras")
          .updateValueAndValidity();
        this.estimacionIngestaForm
          .get("viaOral.extras.input_porcionProductoExtras")
          .setValidators([Validators.required]);
        this.estimacionIngestaForm
          .get("viaOral.extras.input_porcionProductoExtras")
          .updateValueAndValidity();
      }
      this.flagExtras = true;
    } else {
      this.estimacionIngestaForm
        .get("viaOral.extras.input_productosExtras")
        .setValidators([]);
      this.estimacionIngestaForm
        .get("viaOral.extras.input_productosExtras")
        .updateValueAndValidity();
      this.estimacionIngestaForm
        .get("viaOral.extras.input_porcionProductoExtras")
        .setValidators([]);
      this.estimacionIngestaForm
        .get("viaOral.extras.input_porcionProductoExtras")
        .updateValueAndValidity();

      this.flagExtras = false;
    }
  }

  definirEntradaLiquidos() {
    if (
      this.estimacionIngestaForm.get("viaOral.liquidos.toggle_liquidos").value
    ) {
      if (this.arrayLiquidos.length > 0) {
        this.estimacionIngestaForm
          .get("viaOral.liquidos.input_productosLiquidos")
          .setValidators([]);
        this.estimacionIngestaForm
          .get("viaOral.liquidos.input_productosLiquidos")
          .updateValueAndValidity();
        this.estimacionIngestaForm
          .get("viaOral.liquidos.input_porcionProductoLiquidos")
          .setValidators([]);
        this.estimacionIngestaForm
          .get("viaOral.liquidos.input_porcionProductoLiquidos")
          .updateValueAndValidity();
      } else {
        this.estimacionIngestaForm
          .get("viaOral.liquidos.input_productosLiquidos")
          .setValidators([Validators.required]);
        this.estimacionIngestaForm
          .get("viaOral.liquidos.input_productosLiquidos")
          .updateValueAndValidity();
        this.estimacionIngestaForm
          .get("viaOral.liquidos.input_porcionProductoLiquidos")
          .setValidators([Validators.required]);
        this.estimacionIngestaForm
          .get("viaOral.liquidos.input_porcionProductoLiquidos")
          .updateValueAndValidity();
      }
      this.flagLiquidos = true;
    } else {
      this.estimacionIngestaForm
        .get("viaOral.liquidos.input_productosLiquidos")
        .setValidators([]);
      this.estimacionIngestaForm
        .get("viaOral.liquidos.input_productosLiquidos")
        .updateValueAndValidity();
      this.estimacionIngestaForm
        .get("viaOral.liquidos.input_porcionProductoLiquidos")
        .setValidators([]);
      this.estimacionIngestaForm
        .get("viaOral.liquidos.input_porcionProductoLiquidos")
        .updateValueAndValidity();

      this.flagLiquidos = false;
    }
  }

  definirEntradaFormulaArtesanal() {
    if (
      this.estimacionIngestaForm.get(
        "nutricionEnteraTotal.formulaArtesanal.toggle_formulaArtesanal"
      ).value
    ) {
      this.estimacionIngestaForm
        .get("nutricionEnteraTotal.formulaArtesanal.input_caloriasGastroclisis")
        .setValidators([Validators.required]);
      this.estimacionIngestaForm
        .get("nutricionEnteraTotal.formulaArtesanal.input_caloriasGastroclisis")
        .updateValueAndValidity();
      this.estimacionIngestaForm
        .get(
          "nutricionEnteraTotal.formulaArtesanal.input_proteinasGastroclisis"
        )
        .setValidators([Validators.required]);
      this.estimacionIngestaForm
        .get(
          "nutricionEnteraTotal.formulaArtesanal.input_proteinasGastroclisis"
        )
        .updateValueAndValidity();

      this.flagFormulaArtesanal = true;
    } else {
      this.estimacionIngestaForm
        .get("nutricionEnteraTotal.formulaArtesanal.input_caloriasGastroclisis")
        .setValidators([]);
      this.estimacionIngestaForm
        .get("nutricionEnteraTotal.formulaArtesanal.input_caloriasGastroclisis")
        .updateValueAndValidity();
      this.estimacionIngestaForm
        .get(
          "nutricionEnteraTotal.formulaArtesanal.input_proteinasGastroclisis"
        )
        .setValidators([]);
      this.estimacionIngestaForm
        .get(
          "nutricionEnteraTotal.formulaArtesanal.input_proteinasGastroclisis"
        )
        .updateValueAndValidity();

      this.flagFormulaArtesanal = false;
    }
  }

  agregarProductoDesayuno() {
    this.idAux = this.paciente.getId();
    this.dataService.getPaciente(this.idAux).then(auxPaciente => {
      this.arrayDesayuno.push([
        this.estimacionIngestaForm.get(
          "viaOral.desayuno.input_productosDesayuno"
        ).value,
        this.estimacionIngestaForm.get(
          "viaOral.desayuno.input_porcionProductoDesayuno"
        ).value
      ]);
      auxPaciente.arrayDesayuno = this.arrayDesayuno;

      this.dataService.updatePaciente(auxPaciente).then(() => {
        this.verificarProductosViaOral();
      });
    });
  }

  agregarProductoMediasNueves() {
    this.idAux = this.paciente.getId();

    this.dataService.getPaciente(this.idAux).then(auxPaciente => {
      this.arrayMediasNueves.push([
        this.estimacionIngestaForm.get(
          "viaOral.mediasNueves.input_productosMediasNueves"
        ).value,
        this.estimacionIngestaForm.get(
          "viaOral.mediasNueves.input_porcionProductoMediasNueves"
        ).value
      ]);
      auxPaciente.arrayMediasNueves = this.arrayMediasNueves;
      this.dataService.updatePaciente(auxPaciente).then(() => {
        this.verificarProductosViaOral();
      });
    });
  }
  agregarProductoAlmuerzo() {
    this.idAux = this.paciente.getId();
    this.dataService.getPaciente(this.idAux).then(auxPaciente => {
      this.arrayAlmuerzo.push([
        this.estimacionIngestaForm.get(
          "viaOral.almuerzo.input_productosAlmuerzo"
        ).value,
        this.estimacionIngestaForm.get(
          "viaOral.almuerzo.input_porcionProductoAlmuerzo"
        ).value
      ]);
      auxPaciente.arrayAlmuerzo = this.arrayAlmuerzo;
      this.dataService.updatePaciente(auxPaciente).then(() => {
        this.verificarProductosViaOral();
      });
    });
  }
  agregarProductoOnces() {
    this.idAux = this.paciente.getId();

    this.dataService.getPaciente(this.idAux).then(auxPaciente => {
      this.arrayOnces.push([
        this.estimacionIngestaForm.get("viaOral.onces.input_productosOnces")
          .value,
        this.estimacionIngestaForm.get(
          "viaOral.onces.input_porcionProductoOnces"
        ).value
      ]);
      auxPaciente.arrayOnces = this.arrayOnces;
      this.dataService.updatePaciente(auxPaciente).then(() => {
        this.verificarProductosViaOral();
      });
    });
  }

  agregarProductoCena() {
    this.idAux = this.paciente.getId();

    this.dataService.getPaciente(this.idAux).then(auxPaciente => {
      this.arrayCena.push([
        this.estimacionIngestaForm.get("viaOral.cena.input_productosCena")
          .value,
        this.estimacionIngestaForm.get("viaOral.cena.input_porcionProductoCena")
          .value
      ]);
      auxPaciente.arrayCena = this.arrayCena;
      this.dataService.updatePaciente(auxPaciente).then(() => {
        this.verificarProductosViaOral();
      });
    });
  }

  agregarProductoRefrigerioNocturno() {
    this.idAux = this.paciente.getId();

    this.dataService.getPaciente(this.idAux).then(auxPaciente => {
      this.arrayRefrigerioNocturno.push([
        this.estimacionIngestaForm.get(
          "viaOral.refrigerioNocturno.input_productosRefrigerioNocturno"
        ).value,
        this.estimacionIngestaForm.get(
          "viaOral.refrigerioNocturno.input_porcionProductoRefrigerioNocturno"
        ).value
      ]);
      auxPaciente.arrayRefrigerioNocturno = this.arrayRefrigerioNocturno;
      this.dataService.updatePaciente(auxPaciente).then(() => {
        this.verificarProductosViaOral();
      });
    });
  }

  agregarProductoExtras() {
    this.idAux = this.paciente.getId();

    this.dataService.getPaciente(this.idAux).then(auxPaciente => {
      this.arrayExtras.push([
        this.estimacionIngestaForm.get("viaOral.extras.input_productosExtras")
          .value,
        this.estimacionIngestaForm.get(
          "viaOral.extras.input_porcionProductoExtras"
        ).value
      ]);
      auxPaciente.arrayExtras = this.arrayExtras;
      this.dataService.updatePaciente(auxPaciente).then(() => {
        this.verificarProductosViaOral();
      });
    });
  }

  agregarProductoLiquidos() {
    this.idAux = this.paciente.getId();

    this.dataService.getPaciente(this.idAux).then(auxPaciente => {
      this.arrayLiquidos.push([
        this.estimacionIngestaForm.get(
          "viaOral.liquidos.input_productosLiquidos"
        ).value,
        this.estimacionIngestaForm.get(
          "viaOral.liquidos.input_porcionProductoLiquidos"
        ).value
      ]);
      auxPaciente.arrayLiquidos = this.arrayLiquidos;
      this.dataService.updatePaciente(auxPaciente).then(() => {
        this.verificarProductosViaOral();
      });
    });
  }

  // agregar producto para nutricion entera total
  agregarProducto() {
    this.idAux = this.paciente.getId();

    // agrega un producto y su porcion al arreglo de productos de nutricion entera total

    this.dataService.getPaciente(this.idAux).then(auxPaciente => {
      this.arrayNutricionEnteraTotal.push([
        this.estimacionIngestaForm.get(
          "nutricionEnteraTotal.input_productosNutricionEnteraTotal"
        ).value,
        this.estimacionIngestaForm.get(
          "nutricionEnteraTotal.input_porcionNutricionEnteraTotal"
        ).value
      ]);

      auxPaciente.arrayNutricionEnteraTotal = this.arrayNutricionEnteraTotal;
      this.dataService.updatePaciente(auxPaciente).then(() => {
        this.estimacionIngestaForm
          .get("nutricionEnteraTotal.verificacionProductos")
          .setValidators([]);
        this.estimacionIngestaForm
          .get("nutricionEnteraTotal.verificacionProductos")
          .updateValueAndValidity();
      });
    });
  }

  // Calculo calorias totales y por kilo
  calcularCalorias() {}
  // Calculo proteinas totales y por kilo
  calcularProteinas() {}

  calcularCarbohidratos() {}

  calcularGrasa() {}

  calcularHierro() {}

  calcularFosforo() {}

  calcularSodio() {}

  calcularVitaminaA() {}

  calcularVitaminaD() {}

  calcularVitaminaE() {}

  // Metodos de formula artesanal
  calcularCaloriasFormulaArtesanal() {}

  calcularProteinaFormulaArtesanal() {}

  getProductosDesayuno() {
    return this.estimacionIngestaForm.get(
      "viaOral.desayuno.input_productosDesayuno"
    );
  }

  getPorcionDesayuno() {
    return this.estimacionIngestaForm.get(
      "viaOral.desayuno.input_porcionProductoDesayuno"
    );
  }

  getProductosMediasNueves() {
    return this.estimacionIngestaForm.get(
      "viaOral.mediasNueves.input_productosMediasNueves"
    );
  }

  getPorcionMediasNueves() {
    return this.estimacionIngestaForm.get(
      "viaOral.mediasNueves.input_porcionProductoMediasNueves"
    );
  }

  getProductosAlmuerzo() {
    return this.estimacionIngestaForm.get(
      "viaOral.almuerzo.input_productosAlmuerzo"
    );
  }

  getPorcionAlmuerzo() {
    return this.estimacionIngestaForm.get(
      "viaOral.almuerzo.input_porcionProductoAlmuerzo"
    );
  }
  getProductosOnces() {
    return this.estimacionIngestaForm.get("viaOral.onces.input_productosOnces");
  }

  getPorcionOnces() {
    return this.estimacionIngestaForm.get(
      "viaOral.onces.input_porcionProductoOnces"
    );
  }
  getProductosCena() {
    return this.estimacionIngestaForm.get("viaOral.cena.input_productosCena");
  }

  getPorcionCena() {
    return this.estimacionIngestaForm.get(
      "viaOral.cena.input_porcionProductoCena"
    );
  }
  getProductosRefrigerioNocturno() {
    return this.estimacionIngestaForm.get(
      "viaOral.refrigerioNocturno.input_productosRefrigerioNocturno"
    );
  }

  getPorcionRefrigerioNocturno() {
    return this.estimacionIngestaForm.get(
      "viaOral.refrigerioNocturno.input_porcionProductoRefrigerioNocturno"
    );
  }

  getProductosExtras() {
    return this.estimacionIngestaForm.get(
      "viaOral.extras.input_productosExtras"
    );
  }

  getPorcionExtras() {
    return this.estimacionIngestaForm.get(
      "viaOral.extras.input_porcionProductoExtras"
    );
  }

  getProductosLiquidos() {
    return this.estimacionIngestaForm.get(
      "viaOral.liquidos.input_productosLiquidos"
    );
  }

  getPorcionLiquidos() {
    return this.estimacionIngestaForm.get(
      "viaOral.liquidos.input_porcionProductoLiquidos"
    );
  }

  // verifica el arreglo de productos
  verificarProductosNutricionEnteraTotal() {
    if (this.arrayNutricionEnteraTotal.length > 0) {
      console.log("Si hay productos");
      this.estimacionIngestaForm
        .get("nutricionEnteraTotal.input_productosNutricionEnteraTotal")
        .setValidators([]);
      this.estimacionIngestaForm
        .get("nutricionEnteraTotal.input_productosNutricionEnteraTotal")
        .updateValueAndValidity();
      this.estimacionIngestaForm
        .get("nutricionEnteraTotal.input_porcionNutricionEnteraTotal")
        .setValidators([]);
      this.estimacionIngestaForm
        .get("nutricionEnteraTotal.input_porcionNutricionEnteraTotal")
        .updateValueAndValidity();
      return true;
    } else {
      console.log("no hay productos");
      this.estimacionIngestaForm
        .get("nutricionEnteraTotal.input_productosNutricionEnteraTotal")
        .setValidators([Validators.required]);
      this.estimacionIngestaForm
        .get("nutricionEnteraTotal.input_productosNutricionEnteraTotal")
        .updateValueAndValidity();
      this.estimacionIngestaForm
        .get("nutricionEnteraTotal.input_porcionNutricionEnteraTotal")
        .setValidators([Validators.required]);
      this.estimacionIngestaForm
        .get("nutricionEnteraTotal.input_porcionNutricionEnteraTotal")
        .updateValueAndValidity();
      return false;
    }
  }

  // verifica si existe un producto y una porcion dentro del formulario para agregar un producto
  // activa el boton de agregar producto si los datos existen
  verificarDatosDesayuno() {
    if (
      this.estimacionIngestaForm.get("viaOral.desayuno.input_productosDesayuno")
        .valid &&
      this.estimacionIngestaForm.get(
        "viaOral.desayuno.input_porcionProductoDesayuno"
      ).valid
    ) {
      return true;
    } else {
      return false;
    }
  }

  verificarDatosMediasNueves() {
    if (
      this.estimacionIngestaForm.get(
        "viaOral.mediasNueves.input_productosMediasNueves"
      ).valid &&
      this.estimacionIngestaForm.get(
        "viaOral.mediasNueves.input_porcionProductoMediasNueves"
      ).valid
    ) {
      return true;
    } else {
      return false;
    }
  }

  verificarDatosAlmuerzo() {
    if (
      this.estimacionIngestaForm.get("viaOral.almuerzo.input_productosAlmuerzo")
        .valid &&
      this.estimacionIngestaForm.get(
        "viaOral.almuerzo.input_porcionProductoAlmuerzo"
      ).valid
    ) {
      return true;
    } else {
      return false;
    }
  }

  verificarDatosOnces() {
    if (
      this.estimacionIngestaForm.get("viaOral.onces.input_productosOnces")
        .valid &&
      this.estimacionIngestaForm.get("viaOral.onces.input_porcionProductoOnces")
        .valid
    ) {
      return true;
    } else {
      return false;
    }
  }

  verificarDatosCena() {
    if (
      this.estimacionIngestaForm.get("viaOral.cena.input_productosCena")
        .valid &&
      this.estimacionIngestaForm.get("viaOral.cena.input_porcionProductoCena")
        .valid
    ) {
      return true;
    } else {
      return false;
    }
  }

  verificarDatosRefrigerioNocturno() {
    if (
      this.estimacionIngestaForm.get(
        "viaOral.refrigerioNocturno.input_productosRefrigerioNocturno"
      ).valid &&
      this.estimacionIngestaForm.get(
        "viaOral.refrigerioNocturno.input_porcionProductoRefrigerioNocturno"
      ).valid
    ) {
      return true;
    } else {
      return false;
    }
  }

  verificarDatosExtras() {
    if (
      this.estimacionIngestaForm.get("viaOral.extras.input_productosExtras")
        .valid &&
      this.estimacionIngestaForm.get(
        "viaOral.extras.input_porcionProductoExtras"
      ).valid
    ) {
      return true;
    } else {
      return false;
    }
  }

  verificarDatosLiquidos() {
    if (
      this.estimacionIngestaForm.get("viaOral.liquidos.input_productosLiquidos")
        .valid &&
      this.estimacionIngestaForm.get(
        "viaOral.liquidos.input_porcionProductoLiquidos"
      ).valid
    ) {
      return true;
    } else {
      return false;
    }
  }

  verificarProductosViaOral(): boolean {
    if (
      this.arrayDesayuno.length > 0 ||
      this.arrayMediasNueves.length > 0 ||
      this.arrayAlmuerzo.length > 0 ||
      this.arrayExtras.length > 0 ||
      this.arrayLiquidos.length > 0 ||
      this.arrayCena.length > 0 ||
      this.arrayOnces.length > 0 ||
      this.arrayRefrigerioNocturno.length > 0
    ) {
      this.estimacionIngestaForm
        .get("viaOral.verificacionProductos")
        .setValidators([]);
      this.estimacionIngestaForm
        .get("viaOral.verificacionProductos")
        .updateValueAndValidity();

      return true;
    } else {
      this.estimacionIngestaForm
        .get("viaOral.verificacionProductos")
        .setValidators([Validators.required]);
      this.estimacionIngestaForm
        .get("viaOral.verificacionProductos")
        .updateValueAndValidity();

      return false;
    }
  }

  eliminarProducto(arreglo: string, item: [string, number]) {
    let index: number = -1;
    this.idAux = this.paciente.getId();
    this.dataService.getPaciente(this.idAux).then(auxPaciente => {
      switch (arreglo) {
        case "desayuno":
          index = this.arrayDesayuno.indexOf(item);
          if (index !== -1) {
            this.arrayDesayuno.splice(index, 1);
            auxPaciente.arrayDesayuno = this.arrayDesayuno;
            this.dataService.updatePaciente(auxPaciente);
          }

          break;
        case "mediasNueves":
          index = this.arrayMediasNueves.indexOf(item);
          if (index !== -1) {
            this.arrayMediasNueves.splice(index, 1);
            auxPaciente.arrayMediasNueves = this.arrayMediasNueves;
            this.dataService.updatePaciente(auxPaciente);
          }

          break;
        case "almuerzo":
          index = this.arrayAlmuerzo.indexOf(item);
          if (index !== -1) {
            this.arrayAlmuerzo.splice(index, 1);
            auxPaciente.arrayAlmuerzo = this.arrayAlmuerzo;
            this.dataService.updatePaciente(auxPaciente);
          }

          break;
        case "onces":
          index = this.arrayOnces.indexOf(item);
          if (index !== -1) {
            this.arrayOnces.splice(index, 1);
            auxPaciente.arrayOnces = this.arrayOnces;
            this.dataService.updatePaciente(auxPaciente);
          }

          break;
        case "cena":
          index = this.arrayCena.indexOf(item);
          if (index !== -1) {
            this.arrayCena.splice(index, 1);
            auxPaciente.arrayCena = this.arrayCena;
            this.dataService.updatePaciente(auxPaciente);
          }

          break;
        case "refrigerioNocturno":
          index = this.arrayRefrigerioNocturno.indexOf(item);
          if (index !== -1) {
            this.arrayRefrigerioNocturno.splice(index, 1);
            auxPaciente.arrayRefrigerioNocturno = this.arrayRefrigerioNocturno;
            this.dataService.updatePaciente(auxPaciente);
          }
          break;
        case "extras":
          index = this.arrayExtras.indexOf(item);
          if (index !== -1) {
            this.arrayExtras.splice(index, 1);
            auxPaciente.arrayExtras = this.arrayExtras;
            this.dataService.updatePaciente(auxPaciente);
          }
          break;
        case "liquidos":
          index = this.arrayLiquidos.indexOf(item);
          if (index !== -1) {
            this.arrayLiquidos.splice(index, 1);
            auxPaciente.arrayLiquidos = this.arrayLiquidos;
            this.dataService.updatePaciente(auxPaciente);
          }
          break;
      }

      this.verificarProductosViaOral();
    });
  }

  eliminarProductoNutricionEntera(item: [string, number]) {
    this.idAux = this.paciente.getId();

    this.dataService.getPaciente(this.idAux).then(auxPaciente => {
      let index = -1;
      index = this.arrayNutricionEnteraTotal.indexOf(item);
      if (index !== -1) {
        this.arrayNutricionEnteraTotal.splice(index, 1);
        auxPaciente.arrayNutricionEnteraTotal = this.arrayNutricionEnteraTotal;
        this.dataService.updatePaciente(auxPaciente);
      }
      this.verificarProductosNutricionEnteraTotal();
    });
  }

  // para hacer
  // que pasa si el toggle de la comida se quita....(el formulario se eliminaria??)
  // definir calculos
}
