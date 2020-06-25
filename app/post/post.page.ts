import { Component, OnInit, Input } from "@angular/core";
import {
  NavController,
  ToastController,
  ActionSheetController,
  Platform,
} from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { FormControl } from '@angular/forms';
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
import { PhotoService } from "../services/photo.service";

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);
@Component({
  selector: "app-post",
  templateUrl: "./post.page.html",
  styleUrls: ["./post.page.scss"],
})
export class PostPage implements OnInit {
  constructor(
    private camera: Camera,
    private platform: Platform,
    private domSanitizer: DomSanitizer,
    public photoService: PhotoService,
    public actionSheetController: ActionSheetController,
    public service: ProvidersService,
    public navCtrl: NavController,
    public http: HttpClient,
    public toast: ToastController
  ) {}
  news: any = {};
  imageData: string;
  @Input() useURI = true;
  ngOnInit() {}
  hi() {
    alert(1);
  }
  login() {
    this.navCtrl.navigateRoot("/tabs/login");
  }
  fileChangeListener(e) {
    // console.log(e);//e.detail.value
    // this.news.image =e.detail.value;
  }
  //hand image
  getPicture(srcType: number) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.useURI
        ? this.camera.DestinationType.FILE_URI
        : this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: srcType,
      targetWidth: 800,
      targetHeight: 800,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        if (this.useURI) {
          const temp = imageData.split("?");
          this.imageData = temp[0];
          this.imageData = (window as any).Ionic.WebView.convertFileSrc(
            imageData
          );
          console.log(this.imageData);
        } else {
          this.imageData = "data:image/jpeg;base64," + imageData;
          console.log(this.imageData);
          this.news.image = this.imageData;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  logForm() {
    console.log(this.news);
  }
  resign() {
    this.news.action = "insert";
    this.news.user_id = this.getCookie("id");
    console.log(this.news);
    if (
      this.news.newsname != "" &&
      this.news.email != "" &&
      this.news.password != ""
    ) {
      this.http.post(this.service.server + "post.php", this.news).subscribe(
        (data) => {
          console.log(data);
          let result = data;
          console.log(result);
          if (result) {
            this.showToast("Inserted successfully");
            // this.navCtrl.navigateRoot('/tabs/tab3');
            window.location.assign("/tabs/tab3");
          } else {
            this.showToast("Something went wrong");
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.showToast("insert full infor");
    }
  }
  //
  async showToast(message) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: "Upload Albums",
      cssClass: "my-custom-class",
      buttons: [
        {
          text: "Image",
          role: "destructive",
          icon: "image-outline",
          handler: () => {
            console.log("Delete clicked");
            this.getPicture(0);
          },
        },
        {
          text: "Camera",
          icon: "camera-outline",
          handler: () => {
            console.log("Share clicked");
            this.getPicture(1);
          },
        },
        {
          text: "Video",
          icon: "videocam-outline",
          handler: () => {
            console.log("Play clicked");
            this.getPicture(1);
          },
        },
        {
          text: "Cancle",
          icon: "close-outline",
          handler: () => {
            console.log("Play clicked");
          },
        },
      ],
    });
    await actionSheet.present();
  }
  getCookie(name) {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");

    // Loop through the array elements
    for (var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");

      /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
      if (name == cookiePair[0].trim()) {
        // Decode the cookie value and return
        return decodeURIComponent(cookiePair[1]);
      }
    }

    // Return null if not found
    return null;
  }
}
