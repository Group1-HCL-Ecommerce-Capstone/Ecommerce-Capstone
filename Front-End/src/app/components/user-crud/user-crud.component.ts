import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserCrudService } from 'src/app/services/user-crud.service';

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css']
})
export class UserCRUDComponent implements OnInit {
  users: User[] = [];
  oneUser: User = new User;
  id: number = 0;
  //categories: Category[] = []
  displayedColumns: string[] = ["userId", "first", "last", "email", "acts"]; //"roles", 
  constructor(
    private usersService: UserCrudService,
    private router: Router) { }

  ngOnInit() {
    this.usersService.findAll().subscribe(data => {
      this.users = data;
      console.log(this.users[2].roles)
    });
  }

  public addUser() {

  }
  public editUser(userId: number) {
    this.usersService.select(userId);
  
    setTimeout(()=>{
      this.id = this.usersService.id;
      this.oneUser = this.usersService.oneUser;
      console.log(this.id);
      console.log(this.oneUser
    );
      this.router.navigate(['manage/users/edit']);
    },200)
  }

  public deleteUser(id: number, fName: string, lName: string) {
    if(confirm(`Are you sure you want to delete User ${id}: ${fName} ${lName}?`)){
      this.usersService.deleteUser(id).subscribe(data => {
        this.users = this.users.filter(item => item.userId !== id);
        console.log('User deleted successfully!');
      }
        , error => {
          console.log(error.error.message);
        }
      );
    }
  }
}
