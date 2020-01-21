import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class VariablesGlobalesService {
  public UrlBase: string="http://lineincloud.com:8080/PHD/Scripts/PHP/";
  public token: string;

  constructor(private storage: Storage, platform: Platform) {
   // this.UrlBase = "http://lineincloud.com:8080/PHD/Scripts/PHP/";
  }


  async set(key: string, value: any): Promise<any> {
    try {
      const result = await this.storage.set(key, value);
      console.log('set string in storage: ' + result);
      return true;
    } catch (reason) {
      console.log(reason);
      return false;
    }

  }
  async get(key: string): Promise<any> {
    try {
      const result = await this.storage.get(key);
      console.log('storageGET: ' + key + ': ' + result);
      if (result != null) {
        return result;
      }
      return null;
    } catch (reason) {
      console.log(reason);
      return null;
    }
  }

  getUrlBase() {
    return this.UrlBase;
  }

  getToken() {
    return this.storage.get('Token')
  }

  public getTokenA() {
    return this.storage.ready().then(() => this.storage.get('Token'));
  }

  setNewToken() {
    (async () => {

      const ipAPI = '//api.ipify.org?format=json'

      const inputValue = fetch(ipAPI)
        .then(response => response.json())
        .then(data => data.ip)

      const { value: token } = await swal.fire({
        title: 'Ingrese su nuevo token asignado',
        input: 'text',
        inputValue: inputValue,
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'El campo no puede quedar en blanco!'
          }
        }
      })

      if (token) {
        this.set('Token', token).then(result => {
          console.log('Data is saved');
          }).catch(e => {
          console.log("error: " + e);
          });
      }

    })()
  }
}
