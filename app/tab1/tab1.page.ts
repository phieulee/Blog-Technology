import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  ngOnInit(){
     console.log('Hello Addproduct Page');
  }
  product: any = {};
  constructor(public navCtrl: NavController, public http: HttpClient, public toast: ToastController) { }
  insert() {
    this.product.action = "insert";
    console.log(this.product);
    this.http.post("http://blog-technology.local/product.php", this.product)
    .subscribe(data => {
      console.log(data);
      let result = data;
      console.log(result);
      if (result) {
        this.showToast("Inserted successfully");
      }
      else {
        this.showToast("Something went wrong");
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
