import { Injectable } from '@angular/core';
import { ObtenerIdUnicoService } from '../services/obtener-id-unico.service'
import { SincronizarProductosService } from '../services/sincronizar-productos.service'
import { VariablesGlobalesService } from '../services/variables-globales.service'
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Producto } from '../Class/producto';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class AutenticarSesionService {
  private IdUsuarioUnico:string;
  private UrlBase:string;
  private token:string;

  constructor(ObtenerID : ObtenerIdUnicoService, variablesGlobales:VariablesGlobalesService,
    private http: HttpClient) {
    this.IdUsuarioUnico=ObtenerID.getID_UID("IMEI");
    this.UrlBase=variablesGlobales.getUrlBase();
   }

   obtenerToken() {
    var ServerUrl = this.UrlBase + 'ValidateToken.php?token=FFFFFFFF&appData=864879035862160';
    return this.http.get(ServerUrl).pipe(
      catchError(
        err => {
          swal.fire('Error de autenticación', 'Error al autenticar, por favor contacta al administrador.', 'error');
          return Observable.throw(err);
        }
      ));
      
  }

  validarToken() {
    this.obtenerToken().subscribe(res => {
      this.token = JSON.parse(JSON.stringify(res));

       if (this.token.length === 0) {
         swal.fire('Error de autenticación', 'No se pudo validar el token en el servidor, por favor contacta al administrador del sistema', 'error');
         return false;
        } else {
          return true;
        }
      });
    }
}
