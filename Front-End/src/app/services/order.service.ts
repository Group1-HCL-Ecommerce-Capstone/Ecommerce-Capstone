import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public email$!: Observable<string>;
  email: string = '';
  public isAuthenticated$!: Observable<boolean>;
  isLoggedInOkta!: boolean;

  private orderUrl: string;
  currentUser: any;
  currentOrderId: number = 0;
  oneOrder: any;
  responseString: string = '';
  isEdited: boolean = false;
  errMessage: string = '';

  constructor(
    private http: HttpClient,
    private localstore: LocalService,
    private _oktaAuthStateService: OktaAuthStateService
  ) {
    this.orderUrl = 'https://ecommerce-capstone-be.azurewebsites.net/orders';
    this.isAuthenticated$ = this._oktaAuthStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
    this.isAuthenticated$.forEach((x) => this.isLoggedInOkta = x);

    this.email$ = this._oktaAuthStateService.authState$.pipe(
      filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
      map((authState: AuthState) => authState.idToken?.claims.email ?? ''))

    this.email$.forEach((x) => this.email = x);
    if (this.localstore.isLoggedIn()) {
      this.currentUser = this.localstore.getData();
    }
  }

  public findCurrentUserOrders() {
    if (this.isLoggedInOkta) {
      return this.http.get<any>(this.orderUrl + '/all/' + this.email);
    } else {
      return this.http.get<any>(this.orderUrl + '/all/' + this.currentUser.email);
    }

  }

  public findAllOrders() {
    return this.http.get<any>(this.orderUrl + '/all');
  }

  public findOrder(orderId: number) {
    return this.http.get<any>(this.orderUrl + '/find/' + orderId);
  }

  public select(orderId: number) {
    this.currentOrderId = orderId;
    this.findOrder(this.currentOrderId).subscribe(data => {
      this.oneOrder = data;
    })
  }

  public updateStatus(orderId: number, status: any) {
    this.responseString = '{"status": "' + status + '"}'
    this.http.patch<any>(this.orderUrl + '/updatestatus/' + orderId, JSON.parse(this.responseString)).subscribe((response) => {
      console.log(response);
      this.isEdited = true;
      console.log("orderservice " + this.isEdited)
    },
      error => {
        this.isEdited = false;
        this.errMessage = error.error.message;
      });
  }

  public placeOrder(address: any) {
    if (this.isLoggedInOkta) {
      this.http.post<any>(this.orderUrl + '/add/' + this.email, address).subscribe();
    } else {
      this.http.post<any>(this.orderUrl + '/add/' + this.currentUser.email, address).subscribe();
    }

  }

}


