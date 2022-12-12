import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LocalService } from 'src/app/services/local.service';
import { UserCrudService } from 'src/app/services/user-crud.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: User;
  currentUser: any;
  isAdded: boolean | undefined;

  constructor(
    private usersService: UserCrudService,
    private router: Router,
    private localStorage: LocalService
  ){
    this.user = new User();
    this.currentUser = this.localStorage.getData();
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){    
    this.usersService.addUser(this.user)
    setTimeout(()=>{
      this.isAdded = this.usersService.isAdded;
    }, 200);
      
    //form.resetForm();
    //this.router.navigate(['manage/products'])
  }
  
}
