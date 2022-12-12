import { Component, OnInit, Input, Inject } from '@angular/core';
import { LocalService } from 'src/app/services/local.service';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth, AuthState } from '@okta/okta-auth-js';
import { AppComponent } from 'src/app/app.component';
//import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class HomeComponent implements OnInit {

  user: any;
  public name$!: Observable<string>;
  isLoggedInOkta!: boolean;
  isLoggedInDB!: boolean;

  constructor(
    private _oktaAuthStateService: OktaAuthStateService,
    private appComp: AppComponent,
    private localstore: LocalService) {
    this.appComp.isAuthenticated$.forEach((x) => this.isLoggedInOkta = x);
    this.isLoggedInDB = this.localstore.isLoggedIn()
    this.user = this.localstore.getData();
  }

  async ngOnInit() {
    if (this.isLoggedInOkta){
      this.name$ = this._oktaAuthStateService.authState$.pipe(
        filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
        map((authState: AuthState) => authState.idToken?.claims.name ?? '')
      );
    } else if(this.isLoggedInDB){
      this.name$ = this.user.firstName;
    }
  }
}
  /*
  currentUser:any;
  
  constructor(private localStore: LocalService) {
    this.currentUser =this.localStore.getData();
   }

  ngOnInit(): void {
  }
*/

