import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';
import { Product } from '../models/product';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public email$!: Observable<string>;
  email: string = '';
  public isAuthenticated$!: Observable<boolean>;
  isLoggedInOkta!: boolean;

  currentUser: any;
  totalItems: any;
  responseString: string ='';
  private cartUrl: string;

  constructor(private http: HttpClient,
    private localStore: LocalService,
    private _oktaAuthStateService: OktaAuthStateService) {
    this.cartUrl = 'http://localhost:8181/cart';

    this.isAuthenticated$ = this._oktaAuthStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
    this.isAuthenticated$.forEach((x)=>this.isLoggedInOkta = x);
    this.email$ = this._oktaAuthStateService.authState$.pipe(
        filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
        map((authState: AuthState) => authState.idToken?.claims.email ?? '')
      );
      this.email$.forEach((x) => this.email = x);
    if (this.localStore.isLoggedIn()){
      this.currentUser = this.localStore.getData();
    }
  }

  getCartInfo(): any{
    console.log(this.isLoggedInOkta);
    if (this.isLoggedInOkta){
      console.log(this.email);
      this.http.get<any>(this.cartUrl + '/list/' + this.email).subscribe((response) => {return this.totalItems = response.totalQuantity});
    }else {
      this.http.get<any>(this.cartUrl + '/list/' + this.currentUser.email).subscribe((response) => {return this.totalItems = response.totalQuantity});
    }
    
    //return this.totalItems;
  }

  public addToCart(product: Product, quant: any) {
    this.responseString = '{"productId": '+ product.id +',"quantity": '+quant+'}';
    if (this.isLoggedInOkta){
      this.http.post<any>(this.cartUrl + '/add/' + this.email, JSON.parse(this.responseString)).subscribe();
    } else{
      this.http.post<any>(this.cartUrl + '/add/' + this.currentUser.email, JSON.parse(this.responseString)).subscribe();
    }
    
  }

  public getCartItems(): Observable<any[]> {
    if (this.isLoggedInOkta){
      return this.http.get<any>(this.cartUrl + '/list/' + this.email);//.subscribe((response) => {console.log(response)});
    }else {
      return this.http.get<any>(this.cartUrl + '/list/' + this.currentUser.email);//.subscribe((response) => {console.log(response)});
    }
    
  }

  public updateCart(productId: number, quant: any): any{
      this.responseString = '{"productId": '+ productId +',"quantity": '+quant+'}';
      if (this.isLoggedInOkta){
        this.http.put<any>(this.cartUrl + '/update/' + this.email, JSON.parse(this.responseString)).subscribe();
      }else{
        this.http.put<any>(this.cartUrl + '/update/' + this.currentUser.email, JSON.parse(this.responseString)).subscribe();
      }
     
  }

  public deleteCartItem(cartId: number){
    return this.http.delete(this.cartUrl+'/delete/'+cartId);
  }

}