import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Producto } from '../Class/producto';
import { VariablesGlobalesService } from '../services/variables-globales.service'
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})



export class SincronizarProductosService {

  productos: Producto[];
  private UrlBase = "http://lineincloud.com:8080/PHD/Scripts/PHP/";
  
  constructor(private http: HttpClient, variablesGlobales:VariablesGlobalesService) {
    this.UrlBase=variablesGlobales.getUrlBase();
   }


  obtenerProductos() {
    var ServerUrl = this.UrlBase + 'GetProducts.php?token=FFFFFFFF&appData=864879035862160';
    return this.http.get(ServerUrl).pipe(
      catchError(
        err => {
          swal.fire('Error de autenticación', 'Error al autenticar, por favor contacta al administrador.', 'error');
          return Observable.throw(err);
        }
      ));
      
  }

  obtenerUrlBase(){
    return this.UrlBase;
  }


  parsearProductos() {
    this.obtenerProductos().subscribe(res => {
      this.productos = JSON.parse(JSON.stringify(res));
     this.productos.forEach(element => {
        console.log(element.PRODUCTO);
        console.log(element.IDPRODUCTO);
      });
       if (this.productos.length === 0) {
         swal.fire('Error', 'No se obtuvieron productos', 'error');
        } else {
        }
      });
    }
}




