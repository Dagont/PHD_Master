import { Calculadora } from "./Calculadora";
import { Requerimientos } from "./Requerimientos";
import { Diagnostico } from "./Diagnostico";
import { Ingesta } from "./Ingesta";
import { Valoracion } from "./Valoracion";

export class Paciente {
  id: number;
  fechaNacimiento: Date;
  genero: string = "";
  edad: number = 0;

  // modulo valoracion

  valoracion: Valoracion = new Valoracion();

  talla: number;
  peso: number;

  metodoTallaEstimada: string = "";
  tallaEstimada: number = 0;

  tieneAmputaciones: boolean = false;
  metodoPesoEstimado: string = "";
  pesoEstimado: number = 0;

  pesoIdealEstructura: number;
  estructuraCorporal: string;
  pesoIdeal: number;

  // modulo diagnostico

  metodoDiagnostico: string;
  metodoTamizaje: string; // metodo de tamizaje (MNA o MST)
  diagnostico: string; // desnutricion, riesgo de desnutrcion, etc.
  severidadDesnutricion: string;

  // Modulo requerimientos

  kiloCaloriasPulgar: number;
  requerimientoCaloriasPulgar: number;

  requerimientoCaloriasHarris: number;

  gramosProteina: number;
  requerimientoProteina: number

  setRequerimientoProteina(value: number){
    this.requerimientoProteina = value;
  }

  getRequerimientoProteina(){
    return this.requerimientoProteina;
  }
  
  setGramosProteina(value: number){
    this.gramosProteina = value;
  }

  getGramosProteina(){
    return this.gramosProteina;
  }
  setRequerimientoCaloriasHarris(value: number){
    this.requerimientoCaloriasHarris = value;
  }

  getRequerimientoCaloriasHarris(){
    return this.requerimientoCaloriasHarris;
  }

  setKiloCaloriasPulgar(value: number){
    this.kiloCaloriasPulgar = value;
  }

  getKiloCaloriasPulgar(){
    return this.kiloCaloriasPulgar;
  }

  setRequerimientosCaloriasPulgar(value: number){
    this.requerimientoCaloriasPulgar = value;
  }

  getRequerimientosCaloriasPulgar(){
    return this.requerimientoCaloriasPulgar;
  }
  setPeso(value: number){
    this.peso = value;
  }

  getPeso(){
    return this.peso;
  }
  setSeveridadDesnutricion(value: string){
    this.severidadDesnutricion = value;
  }

  getSeveridadDesnutricion(){
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

  getEdad() {
    return this.edad;
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

  //   getEdad() {
  //     let auxDateValoracion: Date = new Date(
  //       this.valoracion.getFechaValoracion()
  //     );
  //     let auxDateNacimiento: Date = new Date(this.getFechaNacimiento());
  //     let auxEdad =
  //       (auxDateValoracion.getTime() - auxDateNacimiento.getTime()) / 1000;
  //       auxEdad /= 60*60*24;
  //       console.log(Math.abs(Math.round(auxEdad / 365.25)));
  //     return Math.abs(Math.round(auxEdad / 365.25));
  //   }

  //   diff_years(dt2, dt1) {
  //     var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  //     diff /= 60 * 60 * 24;
  //     return Math.abs(Math.round(diff / 365.25));
  //   }

  getFechaNacimiento(): Date {
    return this.fechaNacimiento;
  }

  getGenero(): string {
    return this.genero;
  }

  getValoracion(): Valoracion {
    return this.valoracion;
  }
  // ingesta: Ingesta;

  // diagnostico: Diagnostico;

  // requerimientos: Requerimientos;

  // calculadora: Calculadora;

  // setNombre(nombre: string) {
  //     this.nombre = nombre;
  // }

  // setFechaNacimiento(fechaNacimiento: Date) {
  //     this.fechaNacimiento = fechaNacimiento;
  // }

  // setGenero(genero: string) {
  //     this.genero = genero;
  // }

  // setValoracion(valoracion: Valoracion) {
  //     this.valoracion = valoracion;
  // }

  // // setIngesta(ingesta: Ingesta) {
  // //     this.ingesta = ingesta;
  // // }

  // // setDiagnostico(diagnostico: Diagnostico) {
  // //     this.diagnostico = diagnostico;

  // // }

  // // setRequerimientos(requerimientos: Requerimientos) {
  // //     this.requerimientos = requerimientos;
  // // }

  // // setCalculadora(calculadora: Calculadora) {
  // //     this.calculadora = calculadora;
  // // }

  // getFechaNacimiento() {
  //     return this.fechaNacimiento;
  // }

  // getGenero() {
  //     return this.genero;
  // }

  // getValoracion() {
  //     return this.valoracion;
  // }

  // // getIngesta() {
  // //     return this.ingesta;
  // // }

  // // getDiagnostico() {
  // //     return this.diagnostico;
  // // }

  // // getRequerimientos() {
  // //     return this.requerimientos;
  // // }

  // // getCalculadora() {
  // //     return this.calculadora;
  // // }

  // por hacer
  // falta agregar observaciones al paciente
  // falta agregar funcionalidad de amputaciones
  // modulo valoracion incompleto
}
