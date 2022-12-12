import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-cart-sidenav',
  templateUrl: './cart-sidenav.component.html',
  styleUrls: ['./cart-sidenav.component.css']
})
export class CartSidenavComponent implements OnInit {

  @ViewChild('sidenav', {static: true}) public sidenav:any;

  cartItems: any;
  products: any;
  constructor(
    private cartService: CartService,
    private sideNavService: SidenavService
  ) { }

  ngOnInit() {
    this.sideNavService.setSidenav(this.sidenav);
    console.log(this.sidenav)
    
    this.cartService.getCartItems().subscribe((data: any) =>{
      this.cartItems = data;
      this.products = this.cartItems.cartItems;
      console.log(this.products[0].product.name)
      console.log(this.cartItems.cartItems);
      console.log(this.cartItems.totalPrice);
      console.log(this.cartItems.totalQuantity);
      console.log(this.cartItems.cartItems[0].quantity);
    });
    //console.log(this.cartItems);
    //console.log(this.cartItems.cartItems);
  }

  ngAfterViewInit(): void{
    
  }

  async increase(prdId: any, quant: number){
    this.cartService.updateCart(prdId, quant+1);
  }
  decrease(prdId: number, quant: number){
    this.cartService.updateCart(prdId, quant-1);
  }

}
