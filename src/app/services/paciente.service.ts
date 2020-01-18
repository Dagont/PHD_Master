import { Injectable } from "@angular/core";
import { Valoracion } from "../Class/Valoracion";
import { Requerimientos } from '../Class/Requerimientos';
import { Calculadora } from '../Class/Calculadora';
import { Ingesta } from '../Class/Ingesta';

@Injectable({
  providedIn: "root"
})
export class PacienteService {
  constructor() {}

  id: number = 0;
  fechaNacimiento: Date = new Date();
  genero: string = "Sin definir";
  edad: number = 0;

  // modulo valoracion

  valoracion: Valoracion = new Valoracion();

  talla: number = 0;
  peso: number = 0;
  imc: number = 0;

  metodoTallaEstimada: string = "Sin definir";
  tallaEstimada: number = 0;

  tieneAmputaciones: boolean = false;
  metodoPesoEstimado: string = "Sin definir";
  pesoEstimado: number = 0;

  manifiestaAmputaciones: string = "No";
  miembrosAmputaciones: string[] = ["Sin definir"];
  pesoEstimadoAmputaciones: number = 0;

  porcentajePerdidaPeso: string = "Primera Valoracion";

  pesoIdealEstructura: number = 0;
  estructuraCorporal: string = "Sin definir";
  pesoIdeal: number = 0;

  estadoTemporal: string = "Sin definir";
  estadoClaviculaHombros: string = "Sin definir";
  estadoEscapula: string = "Sin definir";
  estadoMano: string = "Sin definir";
  estadoPierna: string = "Sin definir";
  estadoPantorilla: string = "Sin definir";
  estadoOrbital: string = "Sin definir";
  estadoToracicaLumbar: string = "Sin definir";
  estadoBrazo: string = "Sin definir";

  // modulo estimacion ingesta

  metodoEstimacionIngesta: string = "Sin definir";

  setMetodoEstimacionIngesta(value: string) {
    this.metodoEstimacionIngesta = value;
  }

  getMetodoEstimacinoIngesta() {
    return this.metodoEstimacionIngesta;
  }

  // via oral

  arrayDesayuno: Array<[string, number]> = [];
  arrayMediasNueves: Array<[string, number]> = [];
  arrayAlmuerzo: Array<[string, number]> = [];
  arrayOnces: Array<[string, number]> = [];
  arrayCena: Array<[string, number]> = [];
  arrayRefrigerioNocturno: Array<[string, number]> = [];
  arrayExtras: Array<[string, number]> = [];
  arrayLiquidos: Array<[string, number]> = [];

  setArrayDesayuno(values: Array<[string, number]>) {
    this.arrayDesayuno = values;
  }

  getArrayDesayuno() {
    return this.arrayDesayuno;
  }

  setArrayMediasNueves(values: Array<[string, number]>) {
    this.arrayMediasNueves = values;
  }

  getArrayMediasNueves() {
    return this.arrayMediasNueves;
  }

  setArrayAlmuerzo(values: Array<[string, number]>) {
    this.arrayAlmuerzo = values;
  }

  getArrayAlmuerzo() {
    return this.arrayAlmuerzo;
  }

  setArrayOnces(values: Array<[string, number]>) {
    this.arrayOnces = values;
  }

  getArrayOnces() {
    return this.arrayOnces;
  }

  setArrayCena(values: Array<[string, number]>) {
    this.arrayCena = values;
  }

  getArrayCena() {
    return this.arrayCena;
  }

  setArrayRefrigerioNocturno(values: Array<[string, number]>) {
    this.arrayRefrigerioNocturno = values;
  }

  getArrayRefrigerioNocturno() {
    return this.arrayRefrigerioNocturno;
  }

  setArrayExtras(values: Array<[string, number]>) {
    this.arrayExtras = values;
  }

  getArrayExtras() {
    return this.arrayExtras;
  }

  setArrayLiquidos(values: Array<[string, number]>) {
    this.arrayLiquidos = values;
  }

  getArrayLiquidos() {
    return this.arrayLiquidos;
  }

  // // nutricion entera total

  arrayNutricionEnteraTotal: Array<[string, number]> = [];

  setArrayNutricionEnteraTotal(values: Array<[string, number]>){
    this.arrayNutricionEnteraTotal = values;
  }

  getArrayNutricionEnteraTotal(){
    return this.arrayNutricionEnteraTotal;
  }

  // modulo diagnostico

  metodoDiagnostico: string = "Sin definir"; // tamizaje o glim
  metodoTamizaje: string = "Sin definir"; // metodo de tamizaje (MNA o MST)
  diagnostico: string = "Sin definir"; // desnutricion, riesgo de desnutrcion, etc.
  severidadDesnutricion: string = "Sin definir";

  // Modulo requerimientos

  kiloCaloriasPulgar: number = 0;
  requerimientoCaloriasPulgar: number = 0;

  requerimientoCaloriasHarris: number = 0;

  gramosProteina: number = 0;
  requerimientoProteina: number = 0;

  requerimientoLiquido: number= 0;

  setTieneAmputaciones(value: boolean) {
    this.tieneAmputaciones = value;
  }

  getTieneAmputaciones() {
    return this.tieneAmputaciones;
  }
  setManifiestaAmputaciones(value: string) {
    this.manifiestaAmputaciones = value;
  }

  getManifiestaAmputaciones() {
    return this.manifiestaAmputaciones;
  }

  setMiembrosAmputaciones(value: string[]) {
    this.miembrosAmputaciones = value;
  }

  getMiembrosAmputaciones() {
    return this.miembrosAmputaciones;
  }

  setPorcentajePerdidaPeso(value: string) {
    this.porcentajePerdidaPeso = value;
  }

  getPorcentajePerdidaPeso() {
    return this.porcentajePerdidaPeso;
  }
  setImc(value: number) {
    this.imc = value;
  }

  getImc() {
    return this.imc;
  }

  setRequerimientoProteina(value: number) {
    this.requerimientoProteina = value;
  }

  getRequerimientoProteina() {
    return this.requerimientoProteina;
  }

  setGramosProteina(value: number) {
    this.gramosProteina = value;
  }

  getGramosProteina() {
    return this.gramosProteina;
  }
  setRequerimientoCaloriasHarris(value: number) {
    this.requerimientoCaloriasHarris = value;
  }

  getRequerimientoCaloriasHarris() {
    return this.requerimientoCaloriasHarris;
  }

  setKiloCaloriasPulgar(value: number) {
    this.kiloCaloriasPulgar = value;
  }

  getKiloCaloriasPulgar() {
    return this.kiloCaloriasPulgar;
  }

  setRequerimientosCaloriasPulgar(value: number) {
    this.requerimientoCaloriasPulgar = value;
  }

  getRequerimientosCaloriasPulgar() {
    return this.requerimientoCaloriasPulgar;
  }
  setPeso(value: number) {
    this.peso = value;
  }

  getPeso() {
    return this.peso;
  }
  setSeveridadDesnutricion(value: string) {
    this.severidadDesnutricion = value;
  }

  getSeveridadDesnutricion() {
    return this.severidadDesnutricion;
  }

  setDiagnostico(value: string) {
    this.diagnostico = value;
  }

  getDiagnostico() {
    return this.diagnostico;
  }

  setMetodoTamizaje(value: string) {
    this.metodoTamizaje = value;
  }

  getMetodoTamizaje() {
    return this.metodoTamizaje;
  }

  setMetodoDiagnostico(value: string) {
    this.metodoDiagnostico = value;
  }

  getMetodoDiagnostico() {
    return this.metodoDiagnostico;
  }

  setTalla(value: number) {
    this.talla = value;
  }

  getTalla() {
    return this.talla;
  }

  setEstructuraCorporal(value: string) {
    this.estructuraCorporal = value;
  }

  getEstructuraCorporal() {
    return this.estructuraCorporal;
  }

  setPesoIdeal(value: number) {
    this.pesoIdeal = value;
  }

  getPesoIdeal() {
    return this.pesoIdeal;
  }

  setMetodoPesoEstimado(metodo: string) {
    this.metodoTallaEstimada = metodo;
  }

  getMetodoPesoEstimado() {
    return this.metodoPesoEstimado;
  }

  setMetodoTallaEstimada(metodo: string) {
    this.metodoTallaEstimada = metodo;
  }

  getMetodoTallaEstimada() {
    return this.metodoTallaEstimada;
  }

  setEdad(edad: number) {
    this.edad = edad;
  }


  setPesoIdealEstructura(value: number) {
    this.pesoIdealEstructura = value;
  }

  getPesoIdealEstructura() {
    return this.pesoIdealEstructura;
  }

  setPesoEstimado(value: number, amputaciones?: boolean) {
    this.pesoEstimado = value;
    if (amputaciones) {
      this.tieneAmputaciones = amputaciones;
    }
  }

  getPesoEstimado() {
    return this.pesoEstimado;
  }

  setTallaEstimada(value: number) {
    this.tallaEstimada = value;
  }

  getTallaEstimada() {
    return this.tallaEstimada;
  }

  setId(id: number) {
    this.id = id;
  }

  setFechaNacimiento(fechaNacimiento: Date) {
    this.fechaNacimiento = fechaNacimiento;
  }

  setGenero(genero: string) {
    this.genero = genero;
  }

  setValoracion(valoracion: Valoracion) {
    this.valoracion = valoracion;
  }

  setFechaValoracion(date: Date) {
    this.getValoracion().setFechaValoracion(date);
  }

  getId(): number {
    return this.id;
  }

  getFechaValoracion(): Date {
    return this.valoracion.getFechaValoracion();
  }

  setEstadoTemporal(value: string) {
    this.estadoTemporal = value;
  }

  getEstadoTemporal() {
    return this.estadoTemporal;
  }

  setEstadoClaviculaHombros(value: string) {
    this.estadoClaviculaHombros = value;
  }

  getEstadoClaviculaHombros() {
    return this.estadoClaviculaHombros;
  }

  setEstadoEscapula(value: string) {
    this.estadoEscapula = value;
  }

  getEstadoEscapula() {
    return this.estadoEscapula;
  }

  setEstadoMano(value: string) {
    this.estadoMano = value;
  }

  getEstadoMano() {
    return this.estadoMano;
  }

  setEstadoPierna(value: string) {
    this.estadoPierna = value;
  }

  getEstadoPierna() {
    return this.estadoPierna;
  }

  setEstadoPantorilla(value: string) {
    this.estadoPantorilla = value;
  }

  getEstadoPantorilla() {
    return this.estadoPantorilla;
  }

  setEstadoOrbital(value: string) {
    this.estadoOrbital = value;
  }

  getEstadoOrbital() {
    return this.estadoOrbital;
  }

  setEstadoToracicaLumbar(value: string) {
    this.estadoToracicaLumbar = value;
  }

  getEstadoToracicaLumbar() {
    return this.estadoToracicaLumbar;
  }

  setEstadoBrazo(value: string) {
    this.estadoBrazo = value;
  }

  getEstadoBrazo() {
    return this.estadoBrazo;
  }

    getEdad() {
      let auxDateValoracion: Date = new Date(
        this.valoracion.getFechaValoracion()
      );
      let auxDateNacimiento: Date = new Date(this.getFechaNacimiento());
      let auxEdad =
        (auxDateValoracion.getTime() - auxDateNacimiento.getTime()) / 1000;
        auxEdad /= 60*60*24;
        console.log(Math.abs(Math.round(auxEdad / 365.25)));
      return Math.abs(Math.round(auxEdad / 365.25));
    }

    diff_years(dt2, dt1) {
      var diff = (dt2.getTime() - dt1.getTime()) / 1000;
      diff /= 60 * 60 * 24;
      return Math.abs(Math.round(diff / 365.25));
    }


  ingesta: Ingesta;

  

  requerimientos: Requerimientos;

  calculadora: Calculadora;

  
  setIngesta(ingesta: Ingesta) {
      this.ingesta = ingesta;
  }

  
  setRequerimientos(requerimientos: Requerimientos) {
      this.requerimientos = requerimientos;
  }

  setCalculadora(calculadora: Calculadora) {
      this.calculadora = calculadora;
  }

  getFechaNacimiento() {
      return this.fechaNacimiento;
  }

  getGenero() {
      return this.genero;
  }

  getValoracion() {
      return this.valoracion;
  }

  getIngesta() {
      return this.ingesta;
  }


  getRequerimientos() {
      return this.requerimientos;
  }

  getCalculadora() {
      return this.calculadora;
  }

  // por hacer
  // falta agregar observaciones al paciente
  // falta agregar funcionalidad de amputaciones
  // modulo valoracion incompleto
}
