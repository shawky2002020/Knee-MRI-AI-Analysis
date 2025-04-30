import { Component } from '@angular/core';
import { User } from '../../../../core/models/user.model';
import { AdminService } from '../../../../core/services/admin.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {
  adminUser !: User 
  users : User[] = []
  constructor(
    private userService : UserService,
    private adminService : AdminService
  ){
    this.userService.userObservable.subscribe(user => {
      this.adminUser = user
    })
  }
  ngOnInit(){
    this.adminService.getAllUsers().subscribe(users => {
      this.users = users
    })
  }


  deleteUser(id : string){
    this.adminService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user._id !== id)
    })
  }


}
