import { Injectable } from '@angular/core';
import { ObtenerIdUnicoService } from '../services/obtener-id-unico.service'
import { VariablesGlobalesService } from '../services/variables-globales.service'

import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import swal from 'sweetalert2';
import { Router } from '@angular/router'
import { promise } from 'protractor';
import { resolve } from 'url';
import { EmptyObservable } from "rxjs/observable/EmptyObservable";



const Toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', swal.stopTimer)
    toast.addEventListener('mouseleave', swal.resumeTimer)
  }
})

@Injectable({
  providedIn: 'root'
})
export class AutenticarSesionService {
  private IdUsuarioUnico: string;
  private Token: string;
  private UrlBase: string;
  private tokenResponse: [];
  private autenticado: boolean = false;
  private ServerUrl: string = this.UrlBase + 'ValidateToken.php?token=' + this.Token + '&appData=' + this.IdUsuarioUnico;

  constructor(private ObtenerID: ObtenerIdUnicoService, private variablesGlobales: VariablesGlobalesService,
    private http: HttpClient,
    private router: Router) {

    this.IdUsuarioUnico = this.ObtenerID.getID_UID("IMEI");
    //this.IdUsuarioUnico = '864879035862160'// REAL
    this.UrlBase = variablesGlobales.getUrlBase();
  }

  obtenerToken(serverString:string) {
    console.log("ServerString: "+serverString);
    return this.http.get(serverString).pipe(
      catchError(
        err => {
          swal.fire('Modo Offline', 'No hay acceso a internet o la plataforma no se encuentra disponible.', 'info');
          this.router.navigateByUrl('/inicio');
          return Observable.throw(err);
        }
      ));
  }

  validarToken(): Promise<any> {
    return new Promise(resolve => {
      this.variablesGlobales.get('Token').then(result => {
        this.obtenerToken(this.UrlBase + 'ValidateToken.php?token=' + result + '&appData=' + this.IdUsuarioUnico).subscribe(res => {
          this.tokenResponse = JSON.parse(JSON.stringify(res));

          if (this.tokenResponse.length === 0) {
            swal.fire('Error de autenticación',
              'No se pudo validar el token en el servidor, por favor contacta al administrador del sistema',
              'error');

            resolve(false);
          } else {
            Toast.fire({
              icon: 'success',
              title: 'Sesion iniciada'
            })
            resolve(true);
          }

        })
      }).catch(e => {
        console.log('error: ' + e);
        // Handle errors here
      })
    })
  }


}
