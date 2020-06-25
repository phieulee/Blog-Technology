import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateInforPage } from './update-infor.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateInforPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateInforPageRoutingModule {}
