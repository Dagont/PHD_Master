import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ObtenerIdUnicoService } from '../services/obtener-id-unico.service'

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {

  private IdUnico;
  flagVerificado: boolean = true;
  slides = [
    {
      img: "assets/img/boydorr_logo.png",
      titulo: "Tu Compañero en<br>RutaProwhey"
    }
  ]
  constructor(private route: Router, private ObtenerIdUnicoService : ObtenerIdUnicoService) {

  }

  ngOnInit() {
  }

  continuar() {
    this.route.navigateByUrl("/inicio");
  }

  ObtenerIdUnico() {
    this.IdUnico=this.ObtenerIdUnicoService.getID_UID("MAC");
    document.getElementById("MAC").innerHTML = "MAC: " + this.ObtenerIdUnicoService.getID_UID("MAC");
    document.getElementById("IMEI").innerHTML = "IMEI: " + this.ObtenerIdUnicoService.getID_UID("IMEI");
    document.getElementById("IMSI").innerHTML = "IMSI: " + this.ObtenerIdUnicoService.getID_UID("IMSI");
    document.getElementById("ICCID").innerHTML = "ICCID: " + this.ObtenerIdUnicoService.getID_UID("ICCID");
    document.getElementById("UUID").innerHTML = "UUID: " + this.ObtenerIdUnicoService.getID_UID("UUID");
  }


}
