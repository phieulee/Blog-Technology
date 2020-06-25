import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular'; 
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{
  postt;
  userid='0';
  role = '0';
  ngOnInit(){
    // console.log(this.getCookie("role"));
    this.role = this.getCookie("role");
    // this.userid = this.getCookie("id");
    if(this.role != '1' ){
      this.postt = '0';
    }else{
      this.postt = '1';    
    }
    
  }
  constructor() {}
   getCookie(name: string): string {
    const nameLenPlus = (name.length + 1);
    return document.cookie
      .split(';')
      .map(c => c.trim())
      .filter(cookie => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map(cookie => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || null;
  }
  
}
