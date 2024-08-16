import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage implements OnInit {

  items: EnderecoDTO[];
  pedido: PedidoDTO;

  constructor(public storage: StorageService, public clienteService: ClienteService, public navCtrl: NavController,
    public cartService: CartService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos'];

          let cart = this.cartService.getCart();

          this.pedido = {
            cliente: { id: response['id'] },
            enderecoDeEntrega: null,
            pagamento: null,
            itens: cart.items.map(x => {
              return { quantidade: x.quantidade, produto: { id: x.produto.id } }
            })
          }
        },
          error => {
            if (error.status == 403) {
              this.navCtrl.navigateRoot('');
            }
          }
        )
    } else {
      this.navCtrl.navigateRoot('');
    }
  }

  nextPage(item: EnderecoDTO) {
    this.pedido.enderecoDeEntrega = { id: item.id };
    let navigationExtras: NavigationExtras = {
      queryParams: {
        pedido: JSON.stringify(this.pedido)
      }
    }
    this.navCtrl.navigateRoot('payment', navigationExtras);
  }

}
