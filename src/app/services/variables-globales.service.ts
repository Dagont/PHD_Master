import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariablesGlobalesService {
  private UrlBase: string;

  constructor() {
    this.UrlBase = "http://lineincloud.com:8080/PHD/Scripts/PHP/";
  }

  getUrlBase() {
    return this.UrlBase;
  }
}
