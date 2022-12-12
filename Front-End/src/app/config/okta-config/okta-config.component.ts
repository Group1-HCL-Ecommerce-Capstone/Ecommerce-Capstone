import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { filter, map, Observable } from 'rxjs';
import { AuthState } from '@okta/okta-auth-js'
@Component({
  selector: 'app-okta-config',
  templateUrl: './okta-config.component.html',
  styleUrls: ['./okta-config.component.css']
})
export class OktaConfigComponent implements OnInit {

  public name$!: Observable<string>;

  constructor(private _oktaAuthStateService: OktaAuthStateService) { }

  ngOnInit(): void {
    this.name$ = this._oktaAuthStateService.authState$.pipe(
      filter((authState: AuthState) => !!authState&& !!authState.isAuthenticated),
      map((authState: AuthState) => authState.idToken?.claims.name ?? '')
    );
  }

}
