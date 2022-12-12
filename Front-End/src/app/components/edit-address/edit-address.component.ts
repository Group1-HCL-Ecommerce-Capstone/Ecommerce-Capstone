import { Component, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/models/user-details';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {
  userDetails: any;
  oneAddress: UserDetails = new UserDetails;
  id: number=0;
  isEdited: boolean | undefined;

  constructor(
    private userDetailsService: UserDetailsService){
    this.userDetails = new UserDetails();
  }

  ngOnInit(): void {
    this.id = this.userDetailsService.currentAddressId;
    this.oneAddress = this.userDetailsService.oneAddress;
    setTimeout(()=>{
      console.log(this.oneAddress)
    },200)
    
  }

  onSubmit(value: any){
    this.userDetails = value;
    console.log(this.userDetails.value);
    this.userDetailsService.updateAddress(this.id, this.userDetails.value);
    setTimeout(()=>{
      this.isEdited = this.userDetailsService.isEdited;
    }, 200);
  }

}
