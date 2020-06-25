import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {ProvidersService} from '../services/providers.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  constructor(public service : ProvidersService,private route: ActivatedRoute,public http: HttpClient) { }
  detail:any;
  id;
  data:any ={};
  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.getData();
  }
  getData(){
    this.data.action = "detail";
    this.data.id = this.id;
    this.http.post(this.service.server+"detail.php", this.data)
    .subscribe(data => {
      this.detail = data;
      console.log(this.detail);
    }, err => {
      console.log(err);
    });
}

}
