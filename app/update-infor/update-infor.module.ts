import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateInforPageRoutingModule } from './update-infor-routing.module';

import { UpdateInforPage } from './update-infor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateInforPageRoutingModule
  ],
  declarations: [UpdateInforPage]
})
export class UpdateInforPageModule {}
