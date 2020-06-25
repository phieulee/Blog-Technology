import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { NavController, Platform,LoadingController } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { PhotoService } from "../services/photo.service";
import { ProvidersService } from "../services/providers.service";
import {
  Plugins,
  CameraResultType,
  Capacitor,
  FilesystemDirectory,
  CameraPhoto,
  CameraSource,
} from "@capacitor/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { from } from "rxjs";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page implements OnInit {
  constructor(
    public loadingCtrl: LoadingController,
    private camera: Camera,
    private platform: Platform,
    private domSanitizer: DomSanitizer,
    public photoService: PhotoService,
    public navCtrl: NavController,
    public http: HttpClient,
    private router: Router,
    public service: ProvidersService,
  ) {}
  notification:any={};
  notifications:any;
  ngOnInit() {
    this.getdata();
  }
  getCookie(name: string): string {
    const nameLenPlus = name.length + 1;
    return (
      document.cookie
        .split(";")
        .map((c) => c.trim())
        .filter((cookie) => {
          return cookie.substring(0, nameLenPlus) === `${name}=`;
        })
        .map((cookie) => {
          return decodeURIComponent(cookie.substring(nameLenPlus));
        })[0] || null
    );
  }
  getdata() {
    this.notification.action = "selectnotification";
    this.notification.device_id = this.getCookie("id");
    console.log(this.notification);
    this.http.post(this.service.server + "notification.php", this.notification).subscribe(
      (data) => {
        this.notifications = data;
        console.log(this.notifications);
      },
      (err) => {
        console.log(err);
      }
    );
}
}
