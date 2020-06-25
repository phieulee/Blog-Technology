import { Component, OnInit, Input } from "@angular/core";
import {
  NavController,
  ActionSheetController,
  ToastController,
  NavParams,
  LoadingController,
  Platform,
} from "@ionic/angular";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { PhotoService } from "../services/photo.service";
import { ProvidersService } from "../services/providers.service";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from "@ionic-native/file-transfer/ngx";
import { File } from "@ionic-native/file";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  data: any = {};
  user: any = {};
  news: any;
  id = "";
  avatar: any = {};
  avatared: any;
  imageData: string;
  @Input() useURI = true;
  constructor(
    public service: ProvidersService,
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public imgpov: ProvidersService,
    public nav: NavController,
    
  ) {}

  ngOnInit() {
    this.id = this.getCookie("id");
    this.getData();
  }
  getData() {
    this.data.action = "profile";
    this.data.id = this.id;
    console.log(this.data);
    console.log(this.service.server + "profile.php");
    this.http.post(this.service.server + "profile.php", this.data).subscribe(
      (data) => {
        console.log(data);
        this.user = data[0];
        this.news = data;
        console.log(this.user);
      },
      (err) => {
        console.log(err);
      }
    );
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
  detail(id) {
    this.nav.navigateRoot("/tabs/detail/" + id);
  }


  //
  // getPicture(srcType: number) {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.useURI
  //       ? this.camera.DestinationType.FILE_URI
  //       : this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     sourceType: srcType,
  //     targetWidth: 800,
  //     targetHeight: 800,
  //   };

  //   this.camera.getPicture(options).then(
  //     (imageData) => {
  //       // imageData is either a base64 encoded string or a file URI
  //       if (this.useURI) {
  //         const temp = imageData.split("?");
  //         this.imageData = temp[0];
  //         this.imageData = (window as any).Ionic.WebView.convertFileSrc(
  //           imageData
  //         );
  //         console.log(this.imageData);
  //       } else {
  //         this.imageData = "data:image/jpeg;base64," + imageData;
  //         console.log(this.imageData);
  //         this.avatar.image = this.imageData;
  //       }
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }


  //update avatar
  // updateavatar(x) {
  //   this.update();
  //   this.avatar.action = "update";
  //   this.avatar.user_id = this.id;
  //   console.log(this.avatar);
  //   this.http.post(this.service.server + "avatar.php", this.avatar).subscribe(
  //     (data) => {
  //       console.log(data);
  //       let result = data;
  //       console.log(result);
  //       if (result) {
  //         this.showToast("Inserted successfully");
  //         // this.navCtrl.navigateRoot('/tabs/tab3');
  //         window.location.assign("/tabs/profile");
  //       } else {
  //         this.showToast("Something went wrong");
  //       }
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }
  // // update


  // async update() {
  //   const actionSheet = await this.actionSheetController.create({
  //     header: "Upload Album",
  //     cssClass: "my-custom-class",
  //     buttons: [
  //       {
  //         text: "Image",
  //         role: "destructive",
  //         icon: "image-outline",
  //         handler: () => {
  //           console.log("Delete clicked");
  //           this.getPicture(0);
  //         },
  //       },
  //       {
  //         text: "Camera",
  //         icon: "camera-outline",
  //         handler: () => {
  //           console.log("Share clicked");
  //           this.getPicture(1);
  //         },
  //       },
  //       {
  //         text: "Video",
  //         icon: "videocam-outline",
  //         handler: () => {
  //           console.log("Play clicked");
  //           this.getPicture(1);
  //         },
  //       },
  //       {
  //         text: "Cancle",
  //         icon: "close-outline",
  //         handler: () => {
  //           console.log("Play clicked");
  //         },
  //       },
  //     ],
  //   });
  //   await actionSheet.present();
  // }
  // async showToast(message) {
  //   const toast = await this.toast.create({
  //     message: message,
  //     duration: 2000,
  //   });
  //   toast.present();
  // }
}
