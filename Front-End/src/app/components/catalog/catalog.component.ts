import { Component, Inject, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { LocalService } from 'src/app/services/local.service';
import { Cart } from 'src/app/models/cart';
import { filter, map, Observable } from 'rxjs';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth, { AuthState } from '@okta/okta-auth-js';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  cartItems: any;
  products: Product[] = [];
  isLoggedIn!: boolean;
  itemsToPrint: any;
  quantControl = new FormControl(0);
  quantForm = new FormGroup({
    quant: this.quantControl
  });
  public isAuthenticated$!: Observable<boolean>;

  constructor(private productsService: ProductService,
    private cartService: CartService,
    private localstore: LocalService,
    private _oktaStateService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth
  ) {
    this.isLoggedIn = this.localstore.isLoggedIn();
  }

  ngOnInit() {
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
    this.productsService.findAll().subscribe(data => {
      this.products = data;
    });

  }

  public addToCart(product: Product) {
    this.cartService.addToCart(product, this.quantControl.value);
    setTimeout(() => {
      this.cartService.getCartInfo();
      this.itemsToPrint = this.cartService.totalItems;
      //console.log(this.itemsToPrint);
    }, 150);

  }


}
