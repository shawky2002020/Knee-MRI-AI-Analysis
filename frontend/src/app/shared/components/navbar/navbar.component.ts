import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  user!:User;
  isLight !:boolean;
  constructor(private router: Router, private userService: UserService,  private themeService:ThemeService) {
    
    userService.userObservable.subscribe((newUser)=>{
      this.user = newUser;
    });
    themeService.themeObservable.subscribe((newTheme)=>{
      this.isLight = newTheme === 'light';
      console.log(this.isLight);

    })
    
  }
  logout(){
    this.userService.logout()  
  }
}
