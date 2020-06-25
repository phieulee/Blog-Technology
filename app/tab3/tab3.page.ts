import { Component, ViewChild, OnInit } from "@angular/core";
import { IonInfiniteScroll, ActionSheetController,ModalController,IonRouterOutlet   } from "@ionic/angular";
import { NavController, ToastController } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { ProvidersService } from "../services/providers.service";
import {ModalPage} from "../modal/modal.page";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  productList: any = {};
  news: any;
  sharee: any = {};
  likee: any = {};
  notification: any = {};
  limit = 0;
  likeStatus: any = [];
  likeuser: any = {};
  likeusers: any = {};
  countlike:any=[];
  countuserlike:any=[];
  listnewsid=[];
  listusersid=[];
  idcookie;
  check =[];
  ngOnInit() {
    this.idcookie = this.getCookie("id");
    this.getData();
    // this.like(42);
    this.userlike();
  }

  items = [];
  numTimesLeft = 5;

  constructor(
    private routerOutlet: IonRouterOutlet,
    public actionSheetController: ActionSheetController,
    public service: ProvidersService,
    public navCtrl: NavController,
    public http: HttpClient,
    public toast: ToastController,
    public modalController: ModalController
  ) {}
  //share
  share(id) {
    this.sharee.action = "share";
    this.sharee.news_id = id;
    this.sharee.user_id = this.getCookie("id");
    console.log(this.sharee);
    this.http.post(this.service.server + "share.php", this.sharee).subscribe(
      (data) => {
        console.log(data);
        let result = data;
        console.log(result);
        if (result) {
          this.showToast("Share successfully");
        } else {
          this.showToast("Share went wrong");
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //like
  like(id,name) {
    //like
    this.likee.action = "like";
    this.likee.news_id = id;
    this.likee.user_id = this.getCookie("id");

    this.http.post(this.service.server + "like.php", this.likee).subscribe(
      (data) => {
        this.likeStatus = data;
        let result = data;
        console.log(this.likeStatus);
        // if (result) {
        //   this.showToast("like successfully");
        // } else {
        //   this.showToast("like went wrong");
        // }
      },
      (err) => {
        console.log(err);
      }
    );
    //notification
    this.notification.action = "notification";
    this.notification.news_id = id;
    this.notification.device_id = this.getCookie("id");
    this.notification.user_id = name;

    this.http.post(this.service.server + "insert_notification.php", this.notification).subscribe(
      (data) => {
        // this.likeStatus = data;
        let result = data;
        console.log(data);
        if (result) {
          this.showToast("notifi successfully");
        } else {
          this.showToast("unnotifi went wrong");
        }
      },
      (err) => {
        console.log(err);
      }
    );
    console.log(this.notification);
    
  }
  // user like
  userlike() {
    let i=0;   
    let temp;
    this.likeuser.action = "likes";
    console.log(this.likeuser);
    this.http.post(this.service.server + "like.php", this.likeuser).subscribe(
      (data) => {
        this.likeusers = data;
        console.log(this.likeusers);
        this.likeusers.forEach((element) => {
          this.listnewsid[i]= element.news_id;
          temp = element.news_id;
          this.listusersid[element.news_id]= element.user_id;
          console.log( this.listusersid[39]);
          i++;
          this.checklike();     
        });
      },
      (err) => {
        console.log(err);
      }
    );
    console.log( this.listusersid[42]);  
    // console.log(this.countlike[42]);
  }
  // checkcolor(x){
  //   if(this.listusersid[x] == this.idcookie){
  //     this.check[x] = 1;
  //     console.log(this.check);
  //   }else{
  //     this.check[x] = 0;
  //   }

  // }
  //check like
  checklike() {
      var occurrences = this.listnewsid.reduce(function(obj, item) {
        obj[item] = (obj[item] || 0) + 1;
        return obj;
      }, {});
      this.countlike = occurrences;
      // console.log(this.countlike[42]); 
      
  }
  // check user like
  
  //scroll load
  loadData(event) {
    setTimeout(() => {
      console.log("Done");
      this.getData();
      this.numTimesLeft -= 1;
      event.target.complete();
    }, 2000);
  }
  detail(id) {
    this.navCtrl.navigateRoot("/tabs/detail/" + id);
  }
  getData() {
    this.productList.action = "news";
    this.limit += 10;
    this.productList.limit = this.limit;
    console.log(this.productList);
    console.log(this.service.server + "news.php");
    this.http
      .post(this.service.server + "news.php", this.productList)
      .subscribe(
        (data) => {
          console.log(data);
          this.news = data;
          console.log(this.news);
          let result = data;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  async showToast(message) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000,
    });
    toast.present();
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
  async showlike(id) {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: { userid: id }
    });
    return await modal.present();
  }
  
}
