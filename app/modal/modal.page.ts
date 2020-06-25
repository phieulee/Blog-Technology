import { Component, OnInit } from '@angular/core';
import { ModalController  } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { ProvidersService } from "../services/providers.service";
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  constructor(public modalController: ModalController,public http: HttpClient,public service: ProvidersService,) { }
  userid;
  likeuser: any = {};
  likeusers: any ;
  ngOnInit() {
    console.log(this.userid)
    this.userlike();
    
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  userlike() {
    this.likeuser.action = "likes";
    console.log(this.likeuser);
    this.http.post(this.service.server + "like.php", this.likeuser).subscribe(
      (data: Response) => {
        this.likeusers = data;
        console.log(this.likeusers);
        
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
