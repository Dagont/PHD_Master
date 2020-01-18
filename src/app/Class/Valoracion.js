"use strict";
exports.__esModule = true;
var Valoracion = /** @class */ (function () {
    function Valoracion() {
        // Selecciona el metodo para calcular la talla estimada
        this.metodoTallaEstimada = "Rodilla-Talon";
        //------------------------------------------------------- aca
        // selecciona el metodo para calcular el peso estimado
        this.metodoPesoEstimado = "Rabito";
        // Evaluación Física
        // Evaluacion Masa Muscular
        this.EMMTemporal = "Sin Compromiso";
        this.EMMClaviculaHombros = "Sin Compromiso";
        this.EMMEscapula = "Sin Compromiso";
        this.EMMMano = "Sin Compromiso";
        this.EMMPierna = "Sin Compromiso";
        this.EMMPantorilla = "Sin Compromiso";
        // Evaluacion Masa Grasa
        this.EMGOrbital = "Sin Compromiso";
        this.EMGToracicaLumbar = "Sin Compromiso";
        this.EMGBrazoTriceps = "Sin Compromiso";
    }
    // llenar el metodo con el llamado de los calculos 26/12
    Valoracion.prototype.hacerCalculos = function () {
    };
    // Calcula la talla estimada segun el metodo seleccionado, y los parametros de edad y genero del paciente
    Valoracion.prototype.calcularTallaEstimada = function (edad, genero) {
        if (this.metodoTallaEstimada == "Rodilla-Talon") {
            if (genero == "hombre") {
                this.tallaEstimada = (2.02 * this.alturaRodilla) - (0.04 * edad) + 64.19;
            }
            else if (genero == "mujer") {
                this.tallaEstimada = (1.83 * this.alturaRodilla) - (0.24 * edad) + 84.88;
            }
        }
        else if (this.metodoTallaEstimada == "Rodilla-Maleolo") {
            if (genero == "hombre") {
                this.tallaEstimada = (this.longitudRodilla * 1.121) - (0.117 * edad) + 119.6;
            }
            else if (genero == "mujer") {
                this.tallaEstimada = (this.longitudRodilla * 1.263) - (0.159 * edad) + 107.7;
            }
        }
    };
    Valoracion.prototype.calcularPesoEstimado = function (genero) {
        if (this.metodoPesoEstimado == "Rabito") {
            if (genero == "hombre") {
                this.pesoEstimado = (0.5759 * this.perimetroBrazo) + (0.5263 * this.perimetroAbdomen) + (1.2452 * this.perimetroPantorilla) - (4.8689 * 1) - 32.9241;
            }
            else if (genero == "mujer") {
                this.pesoEstimado = (0.5759 * this.perimetroBrazo) + (0.5263 * this.perimetroAbdomen) + (1.2452 * this.perimetroPantorilla) - (4.8689 * 2) - 32.9241;
            }
        }
        else if (this.metodoPesoEstimado == "Lorenz") {
            if (genero == "hombre") {
                this.pesoEstimado = -137.432 + (this.talla * 0.60035) + (this.perimetroAbdominal * 0.785) + (this.perimetroCadera * 0.392);
            }
            else if (genero == "mujer") {
                this.pesoEstimado = -137.432 + (this.talla * 0.60035) + (this.perimetroAbdominal * 0.785) + (this.perimetroCadera * 0.392);
            }
        }
    };
    // se calcula si el paciente no ha ingresado un peso anteriormente (primera valoracion)
    // el resultado de la operacion debe tener % 26/12
    Valoracion.prototype.calcularPorcentajePerdidaPeso = function (pesoAnterior) {
        this.porcentajePerdidapeso = ((pesoAnterior - this.peso) / pesoAnterior) * 100;
    };
    // verificar si se esta retornando un cero 26/12
    // sin funcionar
    Valoracion.prototype.calcularPesoAjustadoAmputaciones = function () {
        var auxPesoAjustadoAmputaciones = 0;
        for (var i = 0; i < this.miembrosAmputados.length; i++) {
            var porcentajeMiembro = this.tablaPorcentajes[this.miembrosAmputados[i]];
            auxPesoAjustadoAmputaciones += this.pesoEstimado * porcentajeMiembro;
        }
        auxPesoAjustadoAmputaciones = this.pesoEstimado - auxPesoAjustadoAmputaciones;
        return auxPesoAjustadoAmputaciones;
    };
    return Valoracion;
}());
exports.Valoracion = Valoracion;
