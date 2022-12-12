import { Component, OnInit } from '@angular/core';
import { UserRegService } from 'src/app/services/userReg.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  
  successMsg: boolean | undefined;
  isErr: boolean | undefined;
  errMessage: string = '';
  
  constructor(private userRegService: UserRegService,
    private router: Router) {
    this.user = new User();
  }

  onSubmit(form: NgForm) {
    this.userRegService.save(this.user);
    setTimeout(() => {
    this.successMsg = !this.userRegService.err;
    this.errMessage = this.userRegService.errMessage;
    this.isErr = this.userRegService.err;
    }, 200);
    
    form.resetForm();
  }

  ngOnInit(): void {
  }

}
