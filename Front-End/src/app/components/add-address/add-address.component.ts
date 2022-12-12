import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserDetails } from 'src/app/models/user-details';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
  userDetails: UserDetails;
  isAdded: boolean | undefined;
  constructor(
    private userDetailsService: UserDetailsService
  ) {
    this.userDetails = new UserDetails();
   }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    this.userDetailsService.addAddress(this.userDetails);
    setTimeout(()=>{
      this.isAdded = this.userDetailsService.isAdded;
      console.log(this.isAdded);
      form.resetForm();
    },300);
    
  }

  updateAddress(form: NgForm){
    form.resetForm();
    console.log(this.userDetails);
    //this.userDetailsService.updateAddress(this.userDetails);
  }
}
