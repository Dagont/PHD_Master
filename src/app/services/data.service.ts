
import { PacienteService } from "./paciente.service";

import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

const KEY = "paciente";

@Injectable({
  providedIn: "root"
})
export class DataService {
  
  

  constructor(private storage: Storage) {}

  addPaciente(paciente: PacienteService): Promise<any> {
    return this.storage.get(KEY).then((auxPacientes: PacienteService[]) => {
      console.log(auxPacientes);
      if (auxPacientes) {
        auxPacientes.push(paciente);
        return this.storage.set(KEY, auxPacientes);
      } else {
        return this.storage.set(KEY, [paciente]);
      }
    });
  }

  getTodosPacientes(): Promise<PacienteService[]> {
    return this.storage.get(KEY);
  }

  getPaciente(id: number): Promise<PacienteService> {
    return this.storage.get(KEY).then((auxPacientes: PacienteService[]) => {
      if (!auxPacientes || auxPacientes.length === 0) {
        return null;
      } else {
        for (let i of auxPacientes) {
          if (i.id == id) {
            return i;
          }
        }
        return null;
      }
    });
  }

  updatePaciente(paciente: PacienteService): Promise<any> {
    return this.storage.get(KEY).then((auxPacientes: PacienteService[]) => {
      if (!auxPacientes || auxPacientes.length === 0) {
        return null;
      } else {
        let newPacientes: PacienteService[] = [];
        for (let i of auxPacientes) {
          if (i.id == paciente.id) {
            newPacientes.push(paciente);
          } else {
            newPacientes.push(i);
          }
        }
        return this.storage.set(KEY, newPacientes);
      }
    });
  }

  deletePaciente(id: number) {
    return this.storage.get(KEY).then((auxPacientes: PacienteService[]) => {
      if (!auxPacientes || auxPacientes.length === 0) {
      } else {
        let mantenerPacientes: PacienteService[] = [];
        for (let i of auxPacientes) {
          if (i.id !== id) {
            mantenerPacientes.push(i);
          }
        }
        return this.storage.set(KEY, mantenerPacientes);
      }
    });
  }

  //---------------------

  setTalla(id: number, value: number) {
    this.getPaciente(id).then(auxPaciente => {
      auxPaciente.talla = value;
      this.updatePaciente(auxPaciente);
    });
  }

  // halla la talla estimada, Formulario Valoracion

  calcularEdad(id: number) {
    console.log("id:", id);
    this.getPaciente(id).then(paciente => {
      console.log("imprime paciente: ", paciente.id);
      if (paciente === null) {
        console.log("no hace nada");
      } else {
        let auxEdad = 0;

        let auxDateValoracion: Date = new Date(
          paciente.valoracion.fechaValoracion
        );

        let auxDateNacimiento: Date = new Date(paciente.fechaNacimiento);

        auxEdad =
          (auxDateValoracion.getTime() - auxDateNacimiento.getTime()) / 1000;
        auxEdad /= 60 * 60 * 24;

        paciente.edad = Number(Math.abs(Math.round(auxEdad / 365.25)));
        this.updatePaciente(paciente).then(item => {
          console.log("calcula la edad");
        });
      }
    });
  }

  tallaEstimada(id: number, entrada: string, value: number) {
    this.getPaciente(id).then(auxPaciente => {
      auxPaciente.metodoTallaEstimada = entrada;
      let tallaEstimada = 0;

      if (entrada == "alturaRodilla") {
        if (auxPaciente.genero == "hombre") {
          tallaEstimada = Number(
            2.02 * value - 0.04 * auxPaciente.edad + 64.19
          );
        } else if (auxPaciente.genero == "mujer") {
          tallaEstimada = Number(
            1.83 * value - 0.24 * auxPaciente.edad + 84.88
          );
        }
      } else if (entrada == "longitudRodilla") {
        if (auxPaciente.genero == "hombre") {
          tallaEstimada = Number(
            value * 1.121 - 0.117 * auxPaciente.edad + 119.6
          );
        } else if (auxPaciente.genero == "mujer") {
          tallaEstimada = Number(
            value * 1.263 - 0.159 * auxPaciente.edad + 107.7
          );
        }
      }
      auxPaciente.tallaEstimada = tallaEstimada;
      this.updatePaciente(auxPaciente).then(() => {
        console.log("termina calcular talla estimada:", tallaEstimada);
      });
    });
  }

  pesoEstimado(id: number, entrada: string, values: number[]) {
    this.getPaciente(id).then(auxPaciente => {
      auxPaciente.metodoPesoEstimado = entrada;
      let pesoEstimado = 0;

      if (entrada == "Rabito") {
        if (auxPaciente.genero == "hombre") {
          pesoEstimado = Number(
            0.5759 * values[0] +
              0.5263 * values[1] +
              1.2452 * values[2] -
              4.8689 * 1 -
              32.9241
          );
        } else if (auxPaciente.genero == "mujer") {
          pesoEstimado = Number(
            0.5759 * values[0] +
              0.5263 * values[1] +
              1.2452 * values[2] -
              4.8689 * 2 -
              32.9241
          );
        }
      } else if (entrada == "Lorenz") {
        if (auxPaciente.genero == "hombre") {
          pesoEstimado = Number(
            -137.432 +
              auxPaciente.talla * 100 * 0.60035 +
              values[0] * 0.785 +
              values[1] * 0.392
          );
        } else if (auxPaciente.genero == "mujer") {
          // este calculo es el mismo que hombre,
          pesoEstimado = Number(
            -137.432 +
              auxPaciente.talla * 100 * 0.60035 +
              values[0] * 0.785 +
              values[1] * 0.392
          );
        }
      }
      auxPaciente.pesoEstimado = pesoEstimado;
      this.updatePaciente(auxPaciente).then(() => {
        console.log("Peso estimado:", entrada, pesoEstimado);
      });
    });
  }

  pesoAjustadoAmputaciones(id: number, miembros: string[]) {
    this.getPaciente(id).then(auxPaciente => {
      let pesoEstimado = auxPaciente.pesoEstimado;
      let auxMiembrosAmputados: string[] = [];
      let auxPesoEstimadoAmputaciones: number = pesoEstimado;

      for (let i = 0; i < miembros.length; i++) {
        switch (miembros[i]) {
          case "Mano":
            auxPesoEstimadoAmputaciones -= pesoEstimado * 0.7;
            auxMiembrosAmputados.push("Mano");
            break;
          case "Antebrazo":
            auxPesoEstimadoAmputaciones -= pesoEstimado * 2.3;
            auxMiembrosAmputados.push("Antebrazo");
            break;
          case "Brazo hasta el hombro":
            auxPesoEstimadoAmputaciones -= pesoEstimado * 0.7;
            auxMiembrosAmputados.push("Brazo hasta el hombro");
            break;
          case "Pie":
            auxPesoEstimadoAmputaciones -= Number(pesoEstimado * 6.6);
            auxMiembrosAmputados.push("Pie");
            break;
          case "Pierna debajo de la rodilla":
            auxPesoEstimadoAmputaciones -= Number(pesoEstimado * 1.7);
            auxMiembrosAmputados.push("Pierna debajo de la rodilla");
            break;
          case "Pierna por encima de la rodilla":
            auxPesoEstimadoAmputaciones -= Number(pesoEstimado * 11);
            auxMiembrosAmputados.push("Pierna por encima de la rodilla");
            break;
          case "Pierna entera":
            auxPesoEstimadoAmputaciones -= Number(pesoEstimado * 18.6);
            auxMiembrosAmputados.push("Pierna entera");
            break;
        }
      }
      if (auxMiembrosAmputados.length == 0) {
        auxMiembrosAmputados = ["Sin definir"];
        auxPaciente.tieneAmputaciones = false;
      } else {
        auxPaciente.miembrosAmputaciones = auxMiembrosAmputados;
        auxPaciente.pesoEstimadoAmputaciones = auxPesoEstimadoAmputaciones;
        auxPaciente.tieneAmputaciones = true;
        this.updatePaciente(auxPaciente).then(() => {
          console.log(
            "calcula peso miembros amputados:",
            auxMiembrosAmputados,
            auxPesoEstimadoAmputaciones
          );
        });
      }
    });
  }

  pesoIdealEstructura(id: number, value: number) {
    this.getPaciente(id).then(auxPaciente => {
      let pesoIdealEstructura = 0;

      pesoIdealEstructura = Math.pow(Number(auxPaciente.talla), 2) / value;

      auxPaciente.pesoIdealEstructura = pesoIdealEstructura;
      this.updatePaciente(auxPaciente).then(() => {
        console.log("Termina peso ideal por estructura:", pesoIdealEstructura);
      });
    });
  }

  pesoIdeal(id: number) {
    console.log("entra peso ideal");

    this.getPaciente(id).then(auxPaciente => {
      let pesoIdealEstructura = auxPaciente.pesoIdealEstructura;
      let pesoIdeal = 0;

      if (auxPaciente.genero == "hombre") {
        if (pesoIdealEstructura > 10.4) {
          auxPaciente.estructuraCorporal = "pequeña";
          pesoIdeal = auxPaciente.talla * 20;
        } else if (pesoIdealEstructura < 9.6) {
          auxPaciente.estructuraCorporal = "grande";
          pesoIdeal = auxPaciente.talla * 25;
        } else {
          auxPaciente.estructuraCorporal = "mediana";
          pesoIdeal = auxPaciente.talla * 22.5;
        }
      } else if (auxPaciente.genero == "mujer") {
        if (pesoIdealEstructura > 11) {
          auxPaciente.estructuraCorporal = "pequeña";
          pesoIdeal = auxPaciente.talla * 20;
        } else if (pesoIdealEstructura < 10.1) {
          auxPaciente.estructuraCorporal = "grande";
          pesoIdeal = auxPaciente.talla * 25;
        } else {
          auxPaciente.estructuraCorporal = "mediana";
          pesoIdeal = auxPaciente.talla * 22.5;
        }
      }
      (auxPaciente.pesoIdeal = pesoIdealEstructura),
        this.updatePaciente(auxPaciente);
    });
  }

  // setData(id: number, data: PacienteService) {
  //   this.data[id] = data;
  // }

  // getData(id: number): PacienteService {
  //   return this.data[id];
  // }

  // getAll(): Paciente[] {
  //   //return this.data;
  // }

  // por hacer
  // metodo peso estimado mujer, esta mal el calculo
  // que hacer si no existen los datos de talla, o peso estimado con los metodos de amputaciones y peso ideal estructura
  // hacer el modal para mostrar los datos
}
