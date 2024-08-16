import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PedidoDTO } from '../../models/pedido.dto';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  pedido: PedidoDTO;

  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  formGroup: FormGroup;

  constructor(public formBuilder: FormBuilder, public route: ActivatedRoute, public navCtrl: NavController) {
    this.formGroup = this.formBuilder.group({
      numeroDeParcelas: [1, Validators.required],
      "@type": ["pagamentoComCartao", Validators.required]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.pedido = JSON.parse(params['pedido'])
    });
  }

  nextPage() {
    this.pedido.pagamento = this.formGroup.value;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        pedido: this.pedido
      }
    }
    this.navCtrl.navigateRoot('order-confimation', navigationExtras);
  }
}
