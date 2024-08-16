import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { CartService } from '../../services/domain/cart.service';
import { ProdutoService } from '../../services/domain/produto.service';

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.page.html',
  styleUrls: ['./produto-detail.page.scss'],
})
export class ProdutoDetailPage implements OnInit {

  item: ProdutoDTO;
  currency;

  constructor(public produtoService: ProdutoService, public route: ActivatedRoute,
    public cartService: CartService, public navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.route.queryParams.subscribe(params => {
      this.currency = JSON.parse(params['categoria_id'])
    })
    this.produtoService.findById(this.currency)
      .subscribe(response => {
        this.item = response;
        this.loadImageUrls();
      },
        error => { });
  }

  loadImageUrls() {
    this.item.imageUrl = `assets/imgs/produtos/prod${this.item.id}.png`;
  }

  addToCart(produto: ProdutoDTO) {
    this.cartService.addProduto(produto);
    this.navCtrl.navigateRoot('cart');
  }
}


