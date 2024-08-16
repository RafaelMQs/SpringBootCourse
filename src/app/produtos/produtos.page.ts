import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { IonInfiniteScroll, LoadingController, NavController, NavParams } from '@ionic/angular';
import { error } from 'protractor';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  items: ProdutoDTO[] = [];
  currency;
  isLoading = false;
  page: number = 0

  constructor(public navCtrl: NavController, public route: ActivatedRoute,
    public produtoService: ProdutoService, public loadingController: LoadingController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loadData();
  }

  loadData() {
    this.route.queryParams.subscribe(params => {
      this.currency = JSON.parse(params['categoria_id'])
    })
    this.presentLoading();
    this.produtoService.findByCategoria(this.currency, this.page, 10)
      .subscribe(response => {
        this.items = this.items.concat(response['content']);
        this.loadImageUrls();
        console.log(this.page)
        console.log(this.items)
        this.dismiss();
      },
        error => {
          this.dismiss();
        });
  }

  loadImageUrls() {
    for (var i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      item.imageUrl = `assets/imgs/produtos/prod${item.id}.png`;
    }
  }

  showDetail(produto_id: string) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        categoria_id: JSON.stringify(produto_id)
      }
    }
    this.navCtrl.navigateRoot('produto-detail', navigationExtras)
  }

  goToCart() {
    this.navCtrl.navigateRoot('cart')
  }

  async presentLoading() {
    this.isLoading = true;
    return await this.loadingController.create({
      message: 'Aguarde',
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss();
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
  }

  doRefresh(event) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  loadDataScroll(event) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }
}
