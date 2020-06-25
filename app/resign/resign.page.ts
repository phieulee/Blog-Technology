import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import {ProvidersService} from '../services/providers.service';

@Component({
  selector: 'app-resign',
  templateUrl: './resign.page.html',
  styleUrls: ['./resign.page.scss'],
})
export class ResignPage implements OnInit {

  constructor(public service : ProvidersService,public navCtrl: NavController, public http: HttpClient, public toast: ToastController) { }
  user: any = {};
  ngOnInit() {
  }
  login() {
    this.navCtrl.navigateRoot('/tabs/login');
  }

  resign() {
    this.user.action = "insert";
    console.log(this.user);
    if(this.user.username != '' && this.user.email != '' && this.user.password != ''){
    this.http.post(this.service.server+"resign.php", this.user)
    .subscribe(data => {
      console.log(data);
      let result = data;
      console.log(result);
      if (result) {
        this.showToast("Resign successfully");
        this.navCtrl.navigateRoot('/tabs/login');
      }
      else {
        this.showToast("Resign fails");
      }
    }, err => {
      console.log(err);
    });
  }else{
    this.showToast("insert full infor");
  }
  }
  async showToast(message) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
