import { Component, OnInit } from '@angular/core';
import { User } from '../../../../core/models/user.model';
import { ThemeService } from '../../../../core/services/theme.service';
import { UserService } from '../../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isExpanded = false
  user!:User;
  isLight !:boolean;
  activeItem!: string ; // Default active item

  constructor(private router: Router, private userService: UserService,  private themeService:ThemeService) {
    
    userService.userObservable.subscribe((newUser)=>{
      this.user = newUser;
    });
    themeService.themeObservable.subscribe((newTheme)=>{
      this.isLight = newTheme === 'light';

    })
    this.activeItem = localStorage.getItem('activeItem') || 'dashboard'
    
  }

  logout(){
    this.userService.logout()  
  }

  setActiveItem(item: string): void {
    this.activeItem = item;
    localStorage.setItem('activeItem', item);
  }

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }

}
