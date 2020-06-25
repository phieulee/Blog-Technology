import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResignPageRoutingModule } from './resign-routing.module';

import { ResignPage } from './resign.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResignPageRoutingModule
  ],
  declarations: [ResignPage]
})
export class ResignPageModule {}
