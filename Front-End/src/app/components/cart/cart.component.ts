import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any;
  products: any[]=[];
  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {

    this.cartService.getCartItems().subscribe((data: any) => {
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

  ngAfterViewInit(): void {

  }

  increase(prdId: any, quant: number) {
    this.cartService.updateCart(prdId, quant + 1);
    window.location.reload();
  }
  decrease(prdId: number, quant: number) {
    this.cartService.updateCart(prdId, quant - 1);
    window.location.reload();
  }

  remove(cartId: number) {
    if (confirm("Are you sure you want to remove this item from your cart?")) {
      this.cartService.deleteCartItem(cartId).subscribe(data => {
        this.products = this.products.filter((item: any) => item.id !== cartId);
        console.log('Product deleted successfully!');
      }
        , error => {
          console.log(error.error.message);
        }
      );
    }
  }
}
