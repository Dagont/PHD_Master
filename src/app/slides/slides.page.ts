import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {

  
  flagVerificado:boolean = true;
  slides = [
    {
      img: "assets/img/boydorr_logo.png",
      titulo: "Tu Compañero en<br>RutaProwhey"
    }
  ]
  constructor(private route: Router) { 

  }

  ngOnInit() {
  }

  continuar(){
    this.route.navigateByUrl("/inicio");
  }


}
