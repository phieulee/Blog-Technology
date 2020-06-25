import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, 
  CameraPhoto, CameraSource } from '@capacitor/core';
// import {photos} from './photos'
import { from } from 'rxjs';

const { Camera, Filesystem, Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: Photo[] = [];

  constructor() { }
  private async savePicture(cameraPhoto: CameraPhoto) { }

  // public async addNewToGallery() {
  //   // Take a photo
  //   const capturedPhoto = await Camera.getPhoto({
  //     resultType: CameraResultType.Uri, 
  //     source: CameraSource.Camera, 
  //     quality: 100 
  //   });
  // }
}
interface Photo {
  filepath: string;
  webviewPath: string;
  base64?: string;
}
