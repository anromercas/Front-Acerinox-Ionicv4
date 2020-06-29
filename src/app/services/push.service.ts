import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(private oneSignal: OneSignal) { }

  initConfiguration() {
    this.oneSignal.startInit('7895a2d8-4be3-40ad-8d43-6008a545ebef', '730366924523');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe(( noti ) => {
    // do something when notification is received
    console.log('Notificación recibida ', noti);
    });

    this.oneSignal.handleNotificationOpened().subscribe(( noti ) => {
      // do something when a notification is opened
      console.log('Notificación abierta ', noti);
    });

    this.oneSignal.endInit();
  }
}
