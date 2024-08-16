import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderConfimationPageRoutingModule } from './order-confimation-routing.module';

import { OrderConfimationPage } from './order-confimation.page';
import { PedidoService } from '../../services/domain/pedido.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderConfimationPageRoutingModule
  ],
  declarations: [OrderConfimationPage],

  providers: [ PedidoService ]
})
export class OrderConfimationPageModule {}
