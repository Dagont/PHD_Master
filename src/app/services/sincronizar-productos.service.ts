import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Producto } from '../Class/producto';
import { VariablesGlobalesService } from '../services/variables-globales.service'
import { ObtenerIdUnicoService } from '../services/obtener-id-unico.service'
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})



export class SincronizarProductosService {
  private IdUsuarioUnico: string;
  private Token: string;
  private UrlBase: string;
  productos: Producto[];


  constructor(private http: HttpClient, private variablesGlobales: VariablesGlobalesService,
    ObtenerID: ObtenerIdUnicoService) {
    this.IdUsuarioUnico = ObtenerID.getID_UID("IMEI");
    this.UrlBase = this.variablesGlobales.getUrlBase();
    this.variablesGlobales.getToken().then((token)=>{
      setTimeout(()=>{
        this.Token=token;
      },1000)
    })

  }


  obtenerProductos() {
    
    var ServerUrl = this.UrlBase + 'GetProducts.php?token=' + this.Token + '&appData=' + this.IdUsuarioUnico;
    return this.http.get(ServerUrl).pipe(
      catchError(
        err => {
          swal.fire('Error de conexión', 'No hay acceso a internet o la plataforma no se encuentra disponible.', 'error');
          return Observable.throw(err);
        }
      ));

  }

  obtenerUrlBase() {
    return this.UrlBase;
  }


  parsearProductos() {
    this.obtenerProductos().subscribe(res => {
      this.productos = JSON.parse(JSON.stringify(res));
      if (this.productos.length === 0) {
        swal.fire('Error de autenticación',
        'No se pudo validar el token en el servidor, por favor contacta al administrador del sistema',
        'error');
      } else {
        swal.fire({
          title: 'Exito!',
          text: 'Se importaron ' + this.productos.length + ' productos',
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#a9a9a9',
          confirmButtonText: 'Ver elementos',
          cancelButtonText: 'Continuar'
        }).then((result) => {
          var resumenProductos:string="";

          this.productos.forEach(element => {
            resumenProductos+='['+element.IDPRODUCTO+'] '+element.PRODUCTO+'\n'
          });

          if (result.value) {
            swal.fire(
              'Elementos importados',
              resumenProductos,
              'info'
            )
          }
        })
        //swal.fire('Exito', 'Se importaron ' + this.productos.length + ' productos', 'success');
      }
    });
  }


}




