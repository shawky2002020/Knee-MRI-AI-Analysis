import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  user!:User;
  constructor(router: Router, private userService: UserService) {
    userService.userObservable.subscribe((newUser)=>{
      this.user = newUser;
    });
  }
  logout(){
    this.userService.logout()    
  }
}
