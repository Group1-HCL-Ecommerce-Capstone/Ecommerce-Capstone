import { enableProdMode, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { CurrentUser } from '../models/current-user';
import { LocalService } from './local.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserRegService {

  private userRegUrl: string;
  currentUser: any;
  err: boolean = false;
  errMessage: string = '';
  isAdmin: boolean = false;

  cUser: CurrentUser = new CurrentUser;

  constructor(
    private http: HttpClient,
    private localStore: LocalService,
    private router: Router
  ) {
    this.userRegUrl = 'http://localhost:8181/auth';
    this.currentUser = this.localStore.getData();
  }

  save(user: User) {
    this.err = false;
    this.http.post<any>(this.userRegUrl + '/register', user, { observe: 'response' }).subscribe((response) => { this.err = false },
      error => {
        this.err = true;
        this.errMessage = error.error.message;
      });
  }

  login(user: User) {
    this.http.post<any>(this.userRegUrl + '/login', user).subscribe((response) => {
      this.localStore.saveData(response);
      setTimeout(() => {
        this.router.navigate(['home']);
        console.log(this.currentUser.roles);
      }, 400);

    },
      error => {
        this.err = true;
        this.errMessage = error.error.message;
      });

  }

}