import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { CategoriaDTO } from '../../models/categoria.dto';
import { CategoriaService } from '../../services/domain/categoria.service';
import { ProdutoService } from '../../services/domain/produto.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  items: CategoriaDTO[];

  constructor(
    public categoriaService: CategoriaService, public produtoService: ProdutoService,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.categoriaService.findAll().subscribe(response => {
      this.items = response;
    },
      error => { });

  }

  showProdutos(categoria_id: string) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        categoria_id: JSON.stringify(categoria_id)
      }
    }
    this.navCtrl.navigateRoot('produtos', navigationExtras);
  }

  goToCart() {
    this.navCtrl.navigateRoot('cart')
  }
}
