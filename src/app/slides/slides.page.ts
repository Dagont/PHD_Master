import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AutenticarSesionService } from '../services/autenticar-sesion.service';
import { VariablesGlobalesService } from '../services/variables-globales.service';
import { Storage } from '@ionic/storage'
import swal from 'sweetalert2';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})

export class SlidesPage {


  flagVerificado: boolean = true;
  

slides = [
  {
    img: "assets/img/boydorr_logo.png",
    titulo: "Tu Compañero en<br>RutaProwhey"
  }
]

constructor(
  private route: Router,
  private autenticarSesionService: AutenticarSesionService,
  private storage: Storage,
  private VariablesGlobalesService: VariablesGlobalesService
) {
}





continuar() {
  this.autenticarSesionService.validarToken().then((isAutenticado) => {
    //console.log(isAutenticado);
    if (isAutenticado) {
      this.route.navigateByUrl("/inicio");
    } else {
      swal.fire({
        title: 'Error',
        text: 'Tu token no es valido, por favor contacta a Boydorr e ingresa uno nuevo',
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#a9a9a9',
        confirmButtonText: 'Ingresar Token',
        cancelButtonText: 'Cerrar'
      }).then((result) => {

        if (result.value) {
          this.VariablesGlobalesService.setNewToken();
        }
      })
      //swal.fire('Error','Tu token no está funcionando, por favor comunicate con Boydorr','error');
      
    }
  })
}
}
