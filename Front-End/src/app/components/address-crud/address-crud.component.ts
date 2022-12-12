import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetails } from 'src/app/models/user-details';
import { LocalService } from 'src/app/services/local.service';
import { UserDetailsService } from 'src/app/services/user-details.service';

@Component({
  selector: 'app-address-crud',
  templateUrl: './address-crud.component.html',
  styleUrls: ['./address-crud.component.css']
})
export class AddressCrudComponent implements OnInit {

  currentUser: any;
  userDetails: UserDetails[]=[];
  id: number = 0;
  oneAddress: any;

  constructor(
    private userDetailsService: UserDetailsService,
    private router: Router,
    private localStore: LocalService
  ) { 
    this.currentUser = this.localStore.getData()
  }

  ngOnInit(): void {
    this.userDetailsService.findCurrentUserAddresses().subscribe(data=>{
      setTimeout(()=>{
        this.userDetails = data;
        console.log(this.userDetails);
      },200)
    })
  }

  public editAddress(prdId: number) {
    this.userDetailsService.select(prdId);
  
    setTimeout(()=>{
      this.id = this.userDetailsService.currentAddressId;
      this.oneAddress = this.userDetailsService.oneAddress;
      console.log(this.id);
      console.log(this.oneAddress);
      this.router.navigate(['profile/edit']);
    },200)
  }

  public deleteAddress(id:number){
    if(confirm(`Are you sure you want to delete Address with id: ${id}?`)){
      this.userDetailsService.deleteCurrentAddress(id)
      .subscribe(data => {
        this.userDetails = this.userDetails.filter(item => item.id !== id);
        console.log('Product deleted successfully!');
      }
        , error => {
          console.log(error.error.message);
        }
      );
    }
  }
}
