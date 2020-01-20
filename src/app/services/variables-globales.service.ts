import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class VariablesGlobalesService {
  public UrlBase: string;
  public token: string;

  constructor(private storage: Storage, platform: Platform) {

    this.UrlBase = "http://lineincloud.com:8080/PHD/Scripts/PHP/";



  }

  ngOnInit() {

  }

  getUrlBase() {
    return this.UrlBase;
  }

  getToken() {

    return this.storage.get('Token')


  }
}
