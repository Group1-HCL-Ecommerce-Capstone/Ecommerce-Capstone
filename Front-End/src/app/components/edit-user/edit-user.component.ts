import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserCrudService } from 'src/app/services/user-crud.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: User;
  oneUser: User = new User;
  id: number=0;
  isEdited: boolean | undefined;
  isAdmin: boolean | undefined;
  isAdminChanged: boolean | undefined;
  roles:any;
  yes: any;
  adminRole:string='';

  constructor(
    private usersService: UserCrudService){
    this.user = new User();
  }

  ngOnInit(): void {
    this.id = this.usersService.id;
    this.oneUser = this.usersService.oneUser;
    this.checkIfAdmin(this.oneUser);
    setTimeout(()=>{
      console.log(this.oneUser.roles)
      console.log(this.isAdmin)
    },200)
    
  }

  checkIfAdmin(user: User){
    //console.log(user.roles.values());
    user.roles.forEach((r: any) => {
      console.log(r.roleType)
      if (r.roleType === 'ROLE_ADMIN'){
        this.yes = true;
      }
    })
    if(this.yes){
      this.isAdmin = true;
    } else{
      this.isAdmin = false;
    }
  }

  changeRole(id: number){
    if (this.isAdmin){
      this.adminRole = '{"role":["admin","user"]}'
      this.usersService.editUser(id,JSON.parse(this.adminRole));
      setTimeout(()=>{
        this.isAdminChanged = this.usersService.isEdited;
        console.log(this.isAdminChanged);
      }, 200);
    } else{
      this.adminRole = '{"role":["user"]}'
      this.usersService.editUser(id,JSON.parse(this.adminRole));
      setTimeout(()=>{
        this.isAdminChanged = this.usersService.isEdited;
        console.log(this.isAdminChanged);
      }, 200);
    }
  }

  onSubmit(value: any){
    this.user = value;
    this.usersService.editUser(this.id, this.user);
    setTimeout(()=>{
      this.isEdited = this.usersService.isEdited;
    }, 200);
  }
  
}
