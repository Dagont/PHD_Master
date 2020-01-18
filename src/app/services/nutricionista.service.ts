import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NutricionistaService {

  constructor() { }

  nombre: string;

  setNombre(value: string){
    this.nombre = value;
  }

  getNombre(){
    return this.nombre;
  }
}
