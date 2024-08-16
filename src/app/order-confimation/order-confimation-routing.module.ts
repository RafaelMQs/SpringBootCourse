import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderConfimationPage } from './order-confimation.page';

const routes: Routes = [
  {
    path: '',
    component: OrderConfimationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderConfimationPageRoutingModule {}
