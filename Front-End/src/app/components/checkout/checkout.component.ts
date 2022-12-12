import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth, { AuthState } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { LocalService } from 'src/app/services/local.service';
import { OrderService } from 'src/app/services/order.service';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  paymentHandler: any = null;
  cart: any;
  products: any;
  currentUser: any;
  userDetails: any;
  oneAddress: any;
  id: number = 0;

  isLoggedIn!: boolean;
  isLoggedInOkta!: boolean;
  public isAuthenticated$!: Observable<boolean>;
  public name$!: Observable<string>;
  public email$!: Observable<string>;


  constructor(
    private cartService: CartService,
    private localStore: LocalService,
    private userDetailsService: UserDetailsService,
    private orderService: OrderService,
    private _oktaStateService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth
  ) {
    this.currentUser = this.localStore.getData();
    this.isLoggedIn = this.localStore.isLoggedIn();
  
    //check if logged into okta
    this.isAuthenticated$ = this._oktaStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
    this.isAuthenticated$.forEach((x)=>this.isLoggedInOkta = x);
    if (this.isLoggedInOkta){
      this.name$ = this._oktaStateService.authState$.pipe(
        filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
        map((authState: AuthState) => authState.idToken?.claims.name ?? '')
      );
      this.email$ = this._oktaStateService.authState$.pipe(
        filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
        map((authState: AuthState) => authState.idToken?.claims.email ?? '')
      );
    } 
  }

  ngOnInit(): void {
    //fetch cart info
    this.cartService.getCartItems().subscribe((data: any) => {
      this.cart = data;
      this.products = this.cart.cartItems;
    });

    //fetch address info
    this.userDetailsService.findCurrentUserAddresses().subscribe(data => {
      setTimeout(() => {
        this.userDetails = data;
        console.log(this.userDetails);
      }, 200)
    });
    this.invokeStripe();
  }

  onSubmit(value: any) {
    this.oneAddress = value;
    this.id = this.oneAddress.value.id;
    this.userDetailsService.findAddress(this.id).subscribe(data => {
      setTimeout(() => {
        this.oneAddress = data;
        console.log(this.oneAddress)
        this.orderService.placeOrder(this.oneAddress);
      }, 500);
    });

    //this.orderService.placeOrder(this.oneAddress);
  }

  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51M9UYGAywS1S1N1AIpCijfjSSVmJsOkg17aXqpBJKwIY51I4lJfrkUkLA3KuIeMUjWv0Za8usbNQCq66rpMO3rES00RrhgPzTg',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        alert('Stripe token generated!');
        window.location.reload();
      },
    });
    paymentHandler.open({
      name: 'Positronx',
      description: '3 widgets',
      amount: amount * 100,
    });
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51M9UYGAywS1S1N1AIpCijfjSSVmJsOkg17aXqpBJKwIY51I4lJfrkUkLA3KuIeMUjWv0Za8usbNQCq66rpMO3rES00RrhgPzTg',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }


}
