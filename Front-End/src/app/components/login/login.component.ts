import { Component, Inject, OnInit } from '@angular/core';
import { UserRegService } from 'src/app/services/userReg.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;

  isErr: boolean | undefined;
  errMessage: string = '';
  constructor(
    private userRegService: UserRegService,
    private _router: Router,
    private _oktaStateService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth,
  ) {
    this.user = new User();
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.userRegService.login(this.user);
    setTimeout(() => {
      this.errMessage = this.userRegService.errMessage;
      this.isErr = this.userRegService.err;
    }, 200);
    form.resetForm();
  }

  public async signIn(): Promise<void> {
    await this._oktaAuth.signInWithRedirect().then(
      _ => this._router.navigate(['/okta'])
    )
  }

}
