import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.page.html',
  styleUrls: ['./calculadora.page.scss'],
})
export class CalculadoraPage implements OnInit {


  //flags

  flagNutricionEnteraTotal: boolean = false;
  flagViaOral: boolean = false;
  flagFormulaArtesanal: boolean = false;

  // arreglos de productos

  arrayNutricionEnteraTotal: Array<[string, number]> = [];
  arrayViaOral: Array<[string, number]> = [];
  // nutricion entera total

  // variables del cliente cuando toma formula artesanal
  input_caloriasFormulaArtesanal: number;
  input_proteinasFormulaArtesanal: number;


  // suplementacion via oral

  input_viaOralTotalCalorias: number;
  input_viaOralTotalProteinas: number;
  input_viaOralTotalCarbohidratos: number;
  input_viaOralTotalGrasas: number;

  constructor(private formBuilder: FormBuilder) { }

  calculadoraForm = this.formBuilder.group({
    input_metodoSoporte: ['', Validators.required],
    nutricionEnteraTotal: this.formBuilder.group({
      verificacionProductos: [''],
      input_producto: [''],
      input_porcion: [''],
      formulaArtesanal: this.formBuilder.group({
        toggle_formulaArtesanal: [''],
        input_caloriasGastroclisis: [''],
        input_proteinaGastroclisis: ['']
      })
    }),
    viaOral: this.formBuilder.group({
      cuestionario: this.formBuilder.group({

      }),
      suplementacionNutricional: this.formBuilder.group({
        verificacionProductos: [''],
        input_producto: [''],
        input_porcion: ['']
      })
    })
  });
  ngOnInit() {


  }

  definirTipoSoporte() {
    if (this.calculadoraForm.get("input_metodoSoporte").value == "Nutricion entera total") {

      this.calculadoraForm.get("viaOral.suplementacionNutricional.input_producto").setValidators([]);
      this.calculadoraForm.get("viaOral.suplementacionNutricional.input_producto").updateValueAndValidity();
      this.calculadoraForm.get("viaOral.suplementacionNutricional.input_porcion").setValidators([]);
      this.calculadoraForm.get("viaOral.suplementacionNutricional.input_porcion").updateValueAndValidity();
      this.calculadoraForm.get("viaOral.suplementacionNutricional.verificacionProductos").setValidators([]);
      this.calculadoraForm.get("viaOral.suplementacionNutricional.verificacionProductos").updateValueAndValidity();

      if (this.arrayNutricionEnteraTotal.length > 0) {

        this.calculadoraForm.get("nutricionEnteraTotal.input_producto").setValidators([]);
        this.calculadoraForm.get("nutricionEnteraTotal.input_producto").updateValueAndValidity();
        this.calculadoraForm.get("nutricionEnteraTotal.input_porcion").setValidators([]);
        this.calculadoraForm.get("nutricionEnteraTotal.input_porcion").updateValueAndValidity();
        this.calculadoraForm.get("nutricionEnteraTotal.verificacionProductos").setValidators([]);
        this.calculadoraForm.get("nutricionEnteraTotal.verificacionProductos").updateValueAndValidity();
      } else {
        this.calculadoraForm.get("nutricionEnteraTotal.input_producto").setValidators([Validators.required]);
        this.calculadoraForm.get("nutricionEnteraTotal.input_producto").updateValueAndValidity();
        this.calculadoraForm.get("nutricionEnteraTotal.input_porcion").setValidators([Validators.required]);
        this.calculadoraForm.get("nutricionEnteraTotal.input_porcion").updateValueAndValidity();
        this.calculadoraForm.get("nutricionEnteraTotal.verificacionProductos").setValidators([Validators.required]);
        this.calculadoraForm.get("nutricionEnteraTotal.verificacionProductos").updateValueAndValidity();
      }


      this.flagNutricionEnteraTotal = true;
      this.flagViaOral = false;

    } else if (this.calculadoraForm.get("input_metodoSoporte").value == "Suplementacion via oral") {

      this.calculadoraForm.get("nutricionEnteraTotal.input_producto").setValidators([]);
      this.calculadoraForm.get("nutricionEnteraTotal.input_producto").updateValueAndValidity();
      this.calculadoraForm.get("nutricionEnteraTotal.input_porcion").setValidators([]);
      this.calculadoraForm.get("nutricionEnteraTotal.input_porcion").updateValueAndValidity();
      this.calculadoraForm.get("nutricionEnteraTotal.verificacionProductos").setValidators([]);
      this.calculadoraForm.get("nutricionEnteraTotal.verificacionProductos").updateValueAndValidity();

      if (this.arrayViaOral.length > 0) {
        this.calculadoraForm.get("viaOral.suplementacionNutricional.input_producto").setValidators([]);
        this.calculadoraForm.get("viaOral.suplementacionNutricional.input_producto").updateValueAndValidity();
        this.calculadoraForm.get("viaOral.suplementacionNutricional.input_porcion").setValidators([]);
        this.calculadoraForm.get("viaOral.suplementacionNutricional.input_porcion").updateValueAndValidity();
        this.calculadoraForm.get("viaOral.suplementacionNutricional.verificacionProductos").setValidators([]);
        this.calculadoraForm.get("viaOral.suplementacionNutricional.verificacionProductos").updateValueAndValidity();
      } else {
        this.calculadoraForm.get("viaOral.suplementacionNutricional.input_producto").setValidators([Validators.required]);
        this.calculadoraForm.get("viaOral.suplementacionNutricional.input_producto").updateValueAndValidity();
        this.calculadoraForm.get("viaOral.suplementacionNutricional.input_porcion").setValidators([Validators.required]);
        this.calculadoraForm.get("viaOral.suplementacionNutricional.input_porcion").updateValueAndValidity();
        this.calculadoraForm.get("viaOral.suplementacionNutricional.verificacionProductos").setValidators([Validators.required]);
        this.calculadoraForm.get("viaOral.suplementacionNutricional.verificacionProductos").updateValueAndValidity();

      }

      this.flagNutricionEnteraTotal = false;
      this.flagViaOral = true;
    }
  }

  definirFormulaArtesanal() {
    if (this.calculadoraForm.get("nutricionEnteraTotal.formulaArtesanal.toggle_formulaArtesanal").value) {

      this.calculadoraForm.get("nutricionEnteraTotal.formulaArtesanal.input_caloriasGastroclisis").setValidators([Validators.required]);
      this.calculadoraForm.get("nutricionEnteraTotal.formulaArtesanal.input_caloriasGastroclisis").updateValueAndValidity();
      this.calculadoraForm.get("nutricionEnteraTotal.formulaArtesanal.input_proteinaGastroclisis").setValidators([Validators.required]);
      this.calculadoraForm.get("nutricionEnteraTotal.formulaArtesanal.input_proteinaGastroclisis").updateValueAndValidity();
      this.flagFormulaArtesanal = true;

    } else {

      this.calculadoraForm.get("nutricionEnteraTotal.formulaArtesanal.input_caloriasGastroclisis").setValidators([]);
      this.calculadoraForm.get("nutricionEnteraTotal.formulaArtesanal.input_caloriasGastroclisis").updateValueAndValidity();
      this.calculadoraForm.get("nutricionEnteraTotal.formulaArtesanal.input_proteinaGastroclisis").setValidators([]);
      this.calculadoraForm.get("nutricionEnteraTotal.formulaArtesanal.input_proteinaGastroclisis").updateValueAndValidity();
      this.flagFormulaArtesanal = false;

    }
  }


  // calculo calorias totales, por kilo y % de cubrimiento // metodoDoble
  caloriasTotales() {

  }

  // calculo proteina totales, por kilo y % de cubrimiento // metodoDoble
  proteinasTotales() {

  }

  // metodoDoble
  carbohidratosTotales() {

  }

  // metodoDoble
  grasaTotales() {


  }

  // metodoDoble
  hierroTotal() {

  }

  // metodoDoble
  fosforoTotal() {

  }

  // metodoDoble
  sodioTotal() {


  }

  // metodoDoble
  vitaminaATotal() {

  }


  // metodos especificos Nutricion entera total

  // calculo de las calorias totales+formula artesanal, por kilo y % de cubrimiento
  caloriasTotalFormulaArtesanal() {

  }

  // calculo %calorias provenientes de formula artesanal
  caloriasPorcentajeFormulaArtesanal() {

  }

  // calculo %calorias provenientes de productos prowhey
  caloriasPorcentajeProwhey() {

  }

  // calculo de las proteinas totales+formula artesanal, por kilo y % de cubrimiento
  proteinaTotalFormulaArtesanal() {

  }

  guardar() {

  }

  verificarDatosViaOral() {

    if (this.calculadoraForm.get("viaOral.suplementacionNutricional.input_producto").valid && this.calculadoraForm.get("viaOral.suplementacionNutricional.input_porcion").valid) {
      return true;
    } else {
      return false;
    }

  }

  verificarDatosNutricionEntera() {
    if (this.calculadoraForm.get("nutricionEnteraTotal.input_producto").valid && this.calculadoraForm.get("nutricionEnteraTotal.input_porcion").valid) {
      return true;
    } else {
      return false;
    }

  }

  agregarProductoViaOral() {

    this.arrayViaOral.push([this.calculadoraForm.get("viaOral.suplementacionNutricional.input_producto").value, this.calculadoraForm.get("viaOral.suplementacionNutricional.input_porcion").value]);
    this.verificarProductosViaOral();
  }

  agregarProductoNutricionEntera() {

    this.arrayNutricionEnteraTotal.push([this.calculadoraForm.get("nutricionEnteraTotal.input_producto").value, this.calculadoraForm.get("nutricionEnteraTotal.input_porcion").value]);
    this.verificarProductosNutricionEnteraTotal();

  }



  verificarProductosViaOral() {
    if (this.arrayViaOral.length > 0) {
      this.calculadoraForm.get("viaOral.suplementacionNutricional.verificacionProductos").setValidators([]);
      this.calculadoraForm.get("viaOral.suplementacionNutricional.verificacionProductos").updateValueAndValidity();
      return true;
    } else {
      this.calculadoraForm.get("viaOral.suplementacionNutricional.verificacionProductos").setValidators([Validators.required]);
      this.calculadoraForm.get("viaOral.suplementacionNutricional.verificacionProductos").updateValueAndValidity();
      return false;
    }

  }

  verificarProductosNutricionEnteraTotal() {
    if (this.arrayNutricionEnteraTotal.length > 0) {
      this.calculadoraForm.get("nutricionEnteraTotal.verificacionProductos").setValidators([]);
      this.calculadoraForm.get("nutricionEnteraTotal.verificacionProductos").updateValueAndValidity();
      return true;
    } else {
      this.calculadoraForm.get("nutricionEnteraTotal.verificacionProductos").setValidators([Validators.required]);
      this.calculadoraForm.get("nutricionEnteraTotal.verificacionProductos").updateValueAndValidity();
      return false;
    }
  }


  eliminarProducto(array: string, item: [string, number]) {
    if (array == "nutricionEnteraTotal") {
      let index: number = -1
      index = this.arrayNutricionEnteraTotal.indexOf(item);
      if (index !== -1) {
        this.arrayNutricionEnteraTotal.splice(index, 1);
      }
      this.verificarProductosNutricionEnteraTotal();
    } else if (array == "viaOral") {
      let index: number = -1;
      index = this.arrayViaOral.indexOf(item);
      if (index !== -1) {
        this.arrayViaOral.splice(index, 1);
      }
      this.verificarProductosViaOral();
    }

  }

}
