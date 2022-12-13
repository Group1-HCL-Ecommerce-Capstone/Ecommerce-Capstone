import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { filter, map, Observable } from 'rxjs';
import { UserDetails } from '../models/user-details';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  public email$!: Observable<string>;
  email: string = '';
  public isAuthenticated$!: Observable<boolean>;
  isLoggedInOkta!: boolean;

  currentUser: any;
  isAdded: boolean = false;
  isEdited: boolean = false;
  errMessage: string = '';
  oneAddress: any;
  currentAddressId: number = 0;
  private addressUrl: string;


  constructor(private http: HttpClient,
    private localStore: LocalService,
    private _oktaAuthStateService: OktaAuthStateService
  ) {
    this.addressUrl = 'https://ecommerce-capstone-be.azurewebsites.net/address';

    this.isAuthenticated$ = this._oktaAuthStateService.authState$.pipe(
      filter((s: AuthState) => !!s),
      map((s: AuthState) => s.isAuthenticated ?? false)
    );
    this.isAuthenticated$.forEach((x) => this.isLoggedInOkta = x);

    this.email$ = this._oktaAuthStateService.authState$.pipe(
      filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
      map((authState: AuthState) => authState.idToken?.claims.email ?? '')
    );
    this.email$.forEach((x) => this.email = x);
    if (this.localStore.isLoggedIn()) {
      this.currentUser = this.localStore.getData();
    }

  }

  public addAddress(userDetails: UserDetails) {
    this.isAdded = false;
    console.log(this.email);

    if (this.isLoggedInOkta) {
      this.http.post<any>(this.addressUrl + '/add/' + this.email, userDetails).subscribe((response) => {
        console.log(response);
        this.isAdded = true;
      },
        error => {
          this.isAdded = false;
          this.errMessage = error.error.message;
        });
    } else {
      this.http.post<any>(this.addressUrl + '/add/' + this.currentUser.email, userDetails).subscribe((response) => {
        console.log(response);
        this.isAdded = true;
      },
        error => {
          this.isAdded = false;
          this.errMessage = error.error.message;
        });
    }

  }

  public updateAddress(adrId: number, userDetails: UserDetails) {
    //this.http.get<any>(this.addressUrl + '/all/' + this.currentUser.userId).subscribe(response => this.currentAddressId = response[0].id);
    this.http.patch<any>(this.addressUrl + '/update/' + adrId, userDetails).subscribe((response) => {
      console.log(response);
      this.isEdited = true;
    },
      error => {
        this.isEdited = false;
        this.errMessage = error.error.message;
      });
  }

  public findCurrentUserAddresses(): Observable<UserDetails[]> {
    if (this.isLoggedInOkta) {
      return this.http.get<UserDetails[]>(this.addressUrl + '/all/' + this.email);
    } else {
      return this.http.get<UserDetails[]>(this.addressUrl + '/all/' + this.currentUser.email);
    }

  }

  public findAddress(adrId: number) {
    return this.http.get<any>(this.addressUrl + '/find/' + adrId);
  }

  public deleteCurrentAddress(adrId: number) {
    return this.http.delete(this.addressUrl + '/delete/' + adrId);
  }

  public select(adrId: number) {
    this.currentAddressId = adrId;
    this.findAddress(this.currentAddressId).subscribe(data => {
      this.oneAddress = data;
    })
  }
}
