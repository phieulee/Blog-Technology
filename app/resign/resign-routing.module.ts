import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResignPage } from './resign.page';

const routes: Routes = [
  {
    path: '',
    component: ResignPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResignPageRoutingModule {}
