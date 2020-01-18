export class Valoracion {

    fechaValoracion: Date;
    tablaPorcentajes: string[];
    // tablaPorcentajes = {
    //     mano: 0.7,
    //     antebrazo: 2.3,
    //     brazoHombro: 6.6,
    //     pie: 1.7,
    //     piernaDebajoRodilla: 7,
    //     piernaEncimaRodilla: 11,
    //     piernaEntera: 18.6
    // };
    //--------------------------
    
    peso: number;
    talla: number;
    imc: number;

    // Selecciona el metodo para calcular la talla estimada
    metodoTallaEstimada: string = "Rodilla-Talon";

    // Valor talla estimada
    tallaEstimada: number;
    // Datos para hallar talla estimada

    alturaRodilla: number;

    longitudRodilla: number;

    //------------------------------------------------------- aca

    // selecciona el metodo para calcular el peso estimado
    metodoPesoEstimado: string = "Rabito";
    // valor del peso estimado
    pesoEstimado: number;

    // datos para hallar el peso estimado
    perimetroBrazo: number;
    perimetroAbdomen: number;
    perimetroPantorilla: number;

    perimetroAbdominal: number;
    perimetroCadera: number;

    // Porcentaje pérdida de peso

    pesoAnterior: number;
    porcentajePerdidapeso: number;

    // Peso ajustado con amputaciones
    pesoAjustadoAmputaciones: number
    miembrosAmputados: string[];




    // Peso ideal por estructura

    pesoIdealEstructura: number;
    circunferenciaCarpo: number;
    constanteEstructura: number;

    // Evaluación Física

    // Evaluacion Masa Muscular

    EMMTemporal: string = "Sin Compromiso";
    EMMClaviculaHombros: string = "Sin Compromiso";
    EMMEscapula: string = "Sin Compromiso";
    EMMMano: string = "Sin Compromiso";
    EMMPierna: string = "Sin Compromiso";
    EMMPantorilla: string = "Sin Compromiso";

    // Evaluacion Masa Grasa

    EMGOrbital: string = "Sin Compromiso";
    EMGToracicaLumbar: string = "Sin Compromiso";
    EMGBrazoTriceps: string = "Sin Compromiso";

    // Observaciones

    observaciones: string;

    setFechaValoracion(fechaValoracion: Date){
        this.fechaValoracion = fechaValoracion;
    }
    getFechaValoracion(){
        return this.fechaValoracion;
    }
    // llenar el metodo con el llamado de los calculos 26/12
    hacerCalculos() {

    }
    // Calcula la talla estimada segun el metodo seleccionado, y los parametros de edad y genero del paciente
    // calcularTallaEstimada(edad: number, genero: string) {
    //     if (this.metodoTallaEstimada == "Rodilla-Talon") {
    //         if (genero == "hombre") {
    //             this.tallaEstimada = (2.02 * this.alturaRodilla) - (0.04 * edad) + 64.19;
    //         } else if (genero == "mujer") {
    //             this.tallaEstimada = (1.83 * this.alturaRodilla) - (0.24 * edad) + 84.88;
    //         }

    //     } else if (this.metodoTallaEstimada == "Rodilla-Maleolo") {
    //         if (genero == "hombre") {
    //             this.tallaEstimada = (this.longitudRodilla * 1.121) - (0.117 * edad) + 119.6;
    //         } else if (genero == "mujer") {
    //             this.tallaEstimada = (this.longitudRodilla * 1.263) - (0.159 * edad) + 107.7;
    //         }
    //     }
    // }

    // calcularPesoEstimado(genero: string) {
    //     if (this.metodoPesoEstimado == "Rabito") {
    //         if (genero == "hombre") {
    //             this.pesoEstimado = (0.5759 * this.perimetroBrazo) + (0.5263 * this.perimetroAbdomen) + (1.2452 * this.perimetroPantorilla) - (4.8689 * 1) - 32.9241;
    //         } else if (genero == "mujer") {
    //             this.pesoEstimado = (0.5759 * this.perimetroBrazo) + (0.5263 * this.perimetroAbdomen) + (1.2452 * this.perimetroPantorilla) - (4.8689 * 2) - 32.9241;
    //         }

    //     } else if (this.metodoPesoEstimado == "Lorenz") {
    //         if (genero == "hombre") {
    //             this.pesoEstimado = -137.432 + (this.talla * 0.60035) + (this.perimetroAbdominal * 0.785) + (this.perimetroCadera * 0.392);
    //         } else if (genero == "mujer") {
    //             this.pesoEstimado = -137.432 + (this.talla * 0.60035) + (this.perimetroAbdominal * 0.785) + (this.perimetroCadera * 0.392);
    //         }
    //     }
    // }

    // // se calcula si el paciente no ha ingresado un peso anteriormente (primera valoracion)
    // // el resultado de la operacion debe tener % 26/12
    // calcularPorcentajePerdidaPeso(pesoAnterior: number) {
    //     this.porcentajePerdidapeso = ((pesoAnterior - this.peso) / pesoAnterior) * 100;

    // }

    // // verificar si se esta retornando un cero 26/12
    // // sin funcionar
    // calcularPesoAjustadoAmputaciones(): number {
        
    //     var auxPesoAjustadoAmputaciones = 0;
    //     for (let i = 0; i < this.miembrosAmputados.length; i++) {
    //         let porcentajeMiembro = this.tablaPorcentajes[this.miembrosAmputados[i]];
    //         auxPesoAjustadoAmputaciones += this.pesoEstimado * porcentajeMiembro;
    //     }
    //     auxPesoAjustadoAmputaciones = this.pesoEstimado - auxPesoAjustadoAmputaciones;
    //     return auxPesoAjustadoAmputaciones;
    // }


}