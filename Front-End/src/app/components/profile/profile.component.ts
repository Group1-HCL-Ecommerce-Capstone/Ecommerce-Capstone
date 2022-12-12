import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserDetails } from 'src/app/models/user-details';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userDetails: UserDetails;
  constructor(
    private userDetailsService: UserDetailsService
  ) {
    this.userDetails = new UserDetails();
   }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.userDetailsService.addAddress(this.userDetails);
    form.resetForm();
  }

  updateAddress(form: NgForm){
    form.resetForm();
    console.log(this.userDetails);
    //this.userDetailsService.updateAddress(this.userDetails);
  }
}
