import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { NavController,ToastController } from '@ionic/angular'; 
import { HttpClient } from '@angular/common/http';
import {ProvidersService} from '../services/providers.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{
  ngOnInit(){
    // this.getData(); 
  }
  user: any = {}; 
  constructor(public service : ProvidersService,public navCtrl: NavController, public http: HttpClient,private router: Router,public toast: ToastController) {}
    goAddNew(){
    this.navCtrl.navigateRoot('/tabs/tab1');
    }
    resign(){
      this.navCtrl.navigateRoot('/tabs/resign');
    }
    login(){
    this.user.action = "login";
    console.log(this.user);
    this.http.post(this.service.server+"user.php", this.user)
    .subscribe(data => {
      let result = data;
      if (result == 1) {
        this.showToast("Login fails");
      }
      else {
        console.log(data);
        document.cookie = "id="+data[0].id;
        document.cookie = "role="+data[0].role;
        this.showToast("Login finish");
        // this.navCtrl.navigateRoot('/tabs/tab3');
        window.location.assign("/tabs/tab3");
      }
    }, err => {
      console.log(err);
    });
  }
  async showToast(message) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}

