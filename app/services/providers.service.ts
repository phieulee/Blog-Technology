import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProvidersService {
  base64img:string='';
  server: string = "http://lekhaphieu.tk/";
  // server: string = "http://blog-technology.local/`
  // <!-- ngrok thay thees link o tren -->
  // resources/android/xml
  // url:'http://vortexmobievotingapp.000webhostapp.com/imageUpload.php';
  constructor(public http: HttpClient) {
   
  }
  postdata(link,data){
    this.http.post('http://813d3eb0f2c3.ngrok.io/'+link, data)
  }
  setImage(img){
    this.base64img=img;
  }
  getImage(){
    return this.base64img;
  }
}
