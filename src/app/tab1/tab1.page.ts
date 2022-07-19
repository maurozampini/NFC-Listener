import { Component } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public platform: Platform, private toastCtrl: ToastController, private nfc: NFC, private ndef: Ndef) {
    this.platform.ready().then(() => { 
      this.addListenNFC();
    });
   }

   addListenNFC() {
    document.getElementById("datos").append("Entra a addListenerNFC ");
    document.getElementById("datos").appendChild(document.createElement("br"));
    
    this.nfc.addTagDiscoveredListener(() => {
    document.getElementById("datos").append("successfully addTagDiscoveredListener");
    document.getElementById("datos").appendChild(document.createElement("br"));

  }, async (err) => {
      console.log('error listener', err);
      document.getElementById("datos").append("Falló " + err);
    document.getElementById("datos").appendChild(document.createElement("br"));

      let toast = await this.toastCtrl.create({
        message: err,
        duration: 1000,
        position: 'bottom'
      });

      toast.present(); 

    }).subscribe(async (event) => {
      console.log('received ndef message. the tag contains: ', event.tag);
      console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));
      
      document.getElementById("datos").append("NFC DATA (EVENT): " + JSON.stringify(event));
      document.getElementById("datos").appendChild(document.createElement("br"));
      document.getElementById("datos").appendChild(document.createElement("br"));
      document.getElementById("datos").append("NFC DATA (EVENT.TAG): " + JSON.stringify(event.tag));
      document.getElementById("datos").appendChild(document.createElement("br"));
      document.getElementById("datos").appendChild(document.createElement("br"));

      let toast = await this.toastCtrl.create({
        message: this.nfc.bytesToHexString(event.tag.id),
        duration: 1000,
        position: 'bottom'
      });

      toast.present(); 
    });
  }
}
