import { Injectable } from '@angular/core';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';



@Injectable({
  providedIn: 'root'
})
export class ObtenerIdUnicoService {

  UniqueDeviceID:string;
  

  constructor(
    private uniqueDeviceID: UniqueDeviceID,
    private uid: Uid,
    private androidPermissions: AndroidPermissions,
  ) {
    //Verificar Permisos al iniciar el APP
    this.getPermission();
  }


  //Para obtener la ID de dispositivo único, llamar al método get() del servicio ObtenerIdUnicoService
  getUniqueDeviceID() {
    this.uniqueDeviceID.get()
      .then((uuid: any) => {
        console.log(uuid);
        this.uniqueDeviceID = uuid;
      })
      .catch((error: any) => {
        console.log(error);
        this.UniqueDeviceID = "Error! ${error}";
      });
  }

  //Para usar el metodo getUniqueDeviceID, se debe verificar si la aplicación tiene permiso 
  //READ_PHONE_STATE. Entonces llamo al método getPermission() en el constructor.
  getPermission() {
    this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    ).then(res => {
      if (res.hasPermission) {

      } else {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE).then(res => {
          alert("Persmission Granted Please Restart App!");
        }).catch(error => {
          alert("Error! " + error);
        });
      }
    }).catch(error => {
      alert("Error! " + error);
    });
  }


  getID_UID(type){
    if(type == "IMEI"){
      return this.uid.IMEI;
    }else if(type == "ICCID"){
      return this.uid.ICCID;
    }else if(type == "IMSI"){
      return this.uid.IMSI;
    }else if(type == "MAC"){
      return this.uid.MAC;
    }else if(type == "UUID"){
      return this.uid.UUID;
    }
  }

  

  
}
