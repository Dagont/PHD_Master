import { Injectable } from '@angular/core';
import { ObtenerIdUnicoService } from '../services/obtener-id-unico.service'
import { VariablesGlobalesService } from '../services/variables-globales.service'

import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import swal from 'sweetalert2';



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
  private Token:string;
  private UrlBase: string;
  private tokenResponse: [];
  public isConnected:boolean = true;

  constructor(ObtenerID: ObtenerIdUnicoService, private variablesGlobales: VariablesGlobalesService,
    private http: HttpClient) {
    this.IdUsuarioUnico = ObtenerID.getID_UID("IMEI");
    //this.IdUsuarioUnico = '864879035862160'
    this.UrlBase = variablesGlobales.getUrlBase();
    this.variablesGlobales.getToken().then((token)=>{
      setTimeout(()=>{
        this.Token=token;
      },1000)
    })
  }



  obtenerToken() {

    var ServerUrl = this.UrlBase + 'ValidateToken.php?token='+this.Token+'&appData=' + this.IdUsuarioUnico;
    console.log(ServerUrl);
    return this.http.get(ServerUrl).pipe(
      catchError(
        err => {
          swal.fire('Modo Offline', 'No hay acceso a internet o la plataforma no se encuentra disponible.', 'info');
          return Observable.throw(err);
        }
      ));

  }

  validarToken() {
    this.obtenerToken().subscribe(res => {
      this.tokenResponse = JSON.parse(JSON.stringify(res));
      console.log(this.tokenResponse);
      if (this.tokenResponse.length === 0) {
        swal.fire('Error de autenticación',
          'No se pudo validar el token en el servidor, por favor contacta al administrador del sistema',
          'error');
        return false;
      } else {
        Toast.fire({
          icon: 'success',
          title: 'Sesion iniciada'
        })
        return true;
      }
    });
  }
}
