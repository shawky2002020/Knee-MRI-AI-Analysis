import { Component } from '@angular/core';
import { Router } from 'express';
import { UserService } from '../../../../core/services/user.service';
import { ThemeService } from '../../../../core/services/theme.service';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  user!:User;
  isLight !:boolean;
  constructor(private router: Router, private userService: UserService,  private themeService:ThemeService) {
    
    userService.userObservable.subscribe((newUser)=>{
      this.user = newUser;
    });
    themeService.themeObservable.subscribe((newTheme)=>{
      this.isLight = newTheme === 'light';

    })
    
  }
  logout(){
    this.userService.logout()  
  }


}
