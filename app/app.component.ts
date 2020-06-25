import { Component,OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, Platform } from "@ionic/angular";
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {ProvidersService} from './services/providers.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  user:any={};
  menu:any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public service : ProvidersService,
    public http: HttpClient,
    public navCtrl: NavController,
  ) {
    this.initializeApp();
  }
  ngOnInit(){
    console.log(this.getCookie('id'));
    this.getdata();
  }
  getdata(){
    this.user.action = "menu";
    this.user.id = this.getCookie('id');
    this.http.post(this.service.server+"menu.php", this.user)
    .subscribe(data => {
      let result = data;
      if (result == 1) {
      }
      else {
        this.menu = data;
        console.log(data);
      }
    }, err => {
      console.log(err);
    });
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
    });
  }

  getCookie(name: string): string {
    const nameLenPlus = (name.length + 1);
    return document.cookie
      .split(';')
      .map(c => c.trim())
      .filter(cookie => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map(cookie => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || null;
  }
  logout(){
    document.cookie = "id=; Path=/tabs; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "role=; Path=/tabs; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.assign("/tabs/login");
  }
}
