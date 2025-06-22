import { Component, OnInit } from '@angular/core';
import { User } from '../../../../core/models/user.model';
import { UserService } from '../../../../core/services/user.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  isExpanded = false
  user!:User;
  isLight !:boolean;
  activeItem!: string ; // Default active item

  constructor(private router: Router, private userService: UserService,private route: ActivatedRoute) {
    this.isExpanded = false;
    userService.userObservable.subscribe((newUser)=>{
      this.user = newUser;
    });
    // themeService.themeObservable.subscribe((newTheme)=>{
    //   this.isLight = newTheme === 'light';

    // })
    
  }
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setActiveFromURL(); // Now safe to run
      }
    });  }

  logout(){
    this.userService.logout()  
  }

  

  setActiveFromURL(): void {
    const fullPath = this.router.url; // e.g. /dashboard/reports/view
    const lastSegment = fullPath.split('/').filter(Boolean).pop()|| ""; // 'view'
    console.log('last path:', lastSegment);
    
    this.setActiveItem(lastSegment);
  }

  setActiveItem(item: string): void {
    this.activeItem = item;
  }

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }

}
