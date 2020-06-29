import { Component, OnDestroy, AfterViewInit } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { PushService } from './services/push.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements  OnDestroy, AfterViewInit {

  backButtonSubscription;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private navCtrl: NavController,
    private pushService: PushService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.pushService.initConfiguration();
    });

  }


  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      console.log('exit button');
      console.log(this.router.url);
      if( this.router.url === '/home2/tareas' || this.router.url === '/home2/incidencia-puntual' || this.router.url === '/login' ) {
        navigator['app'].exitApp();
      } else {
        this.navCtrl.pop();
      }
    });
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
}
