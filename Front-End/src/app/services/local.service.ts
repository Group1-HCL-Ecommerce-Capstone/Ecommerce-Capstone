import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  currentUser: any;
  roles!: string;
  admin:boolean = false;
  constructor() {}

    public saveData(value: any){
      localStorage.setItem('storedUser', JSON.stringify(value));
      this.setAdmin(JSON.stringify(value));
    }

    public getData(){
      return JSON.parse(localStorage.getItem('storedUser') || '{}');
    }

    public clearData(){
      localStorage.clear();
    }

    isLoggedIn() {
      if (localStorage.getItem('storedUser')) {
        return true;
      }
      return false;
    }

    setAdmin(value:string){
      if(value.indexOf('ROLE_ADMIN')> -1){
        this.admin =true;
      }
    }
    isAdmin(){
      if (this.isLoggedIn()){
      this.currentUser = this.getData();
      this.roles = JSON.stringify(this.currentUser.roles);
      if(this.roles.indexOf('ROLE_ADMIN')> -1){
        this.admin =true;
      }
    }
      return this.admin;
    }
}