import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AutenticarSesionService } from '../services/autenticar-sesion.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {

  flagVerificado: boolean = true;

  slides = [
    {
      img: "assets/img/boydorr_logo.png",
      titulo: "Tu Compañero en<br>RutaProwhey"
    }
  ]

  constructor(
    private route: Router,
    private AutenticarSesionService: AutenticarSesionService,
  ) {
  }

  ngOnInit() {
  }


  continuar() {
    this.AutenticarSesionService.validarToken();
    this.route.navigateByUrl("/inicio");
  }




}
