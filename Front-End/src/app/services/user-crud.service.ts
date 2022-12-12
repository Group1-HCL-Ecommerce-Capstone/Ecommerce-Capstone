import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class UserCrudService {
  private usersUrl: string;
  currentUser: any;
  isAdded: boolean = false;
  isEdited: boolean = false;
  errMessage: string = '';
  id: any;
  oneUser:any;

  constructor(
    private http: HttpClient,
    private localStorage: LocalService) { 
    this.usersUrl = 'http://localhost:8181/admin';
    this.currentUser = localStorage.getData();
  }
  
  public addHeaders(){
    let jwt = this.currentUser.token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      })
    }
    return httpOptions;
  }

  public findAll(): Observable<User[]>{
    return this.http.get<User[]>(this.usersUrl + '/allUsers');
  }

  public addUser(user: User){
    this.http.post<any>(this.usersUrl + "/addUser", user,  this.addHeaders()).subscribe((response) => {
      console.log(response);
      this.isAdded = true;
    },
      error => {
        this.isAdded = false;
        this.errMessage = error.error.message;
      });
  }

  public editUser(userId: number, user: User){
    this.http.patch<any>(this.usersUrl+'/update/'+userId, user, this.addHeaders()).subscribe((response) => {
      console.log(response);
      this.isEdited = true;
    },
      error => {
        this.isEdited = false;
        this.errMessage = error.error.message;
      });
  }

  public findUser(id: number){
    return this.http.get<any>(this.usersUrl+'/find/'+id, this.addHeaders());
  }

  public deleteUser(id: number){
    return this.http.delete(this.usersUrl+'/remove/'+id, this.addHeaders());
  }

  public select(userId: number){
    this.id = userId;
    this.findUser(this.id).subscribe(data=>{
      this.oneUser = data;
    })
  }
}
