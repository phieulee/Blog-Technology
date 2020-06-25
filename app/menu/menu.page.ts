import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import {Camera,CameraOptions} from '@ionic-native/camera/ngx';
import { ProvidersService } from '../services/providers.service';
import { File } from '@ionic-native/file/ngx';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  base64img:string='';
  constructor(public imgpov:ProvidersService,public nav: NavController,private platform: Platform,private camera:Camera) { }

  ngOnInit() {
  }
  imageCaptured(){
    const options:CameraOptions={
      quality:70,
      destinationType:this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((ImageData=>{
       this.base64img="data:image/jpeg;base64,"+ImageData;
    }),error=>{
      console.log(error);
    })
  }

  imageCapturedGallery(){
    const options:CameraOptions={
      quality:70,
      destinationType:this.camera.DestinationType.DATA_URL,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }
    this.camera.getPicture(options).then((ImageData=>{
       this.base64img="data:image/jpeg;base64,"+ImageData;
    }),error=>{
      console.log(error);
    })
  }
  nextPage(){
    this.imgpov.setImage(this.base64img);
    // this.nav.push('IdentifyphotoPage');
  }
  clear(){
    this.base64img='';
  }
}

