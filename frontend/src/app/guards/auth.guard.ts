import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { User } from '../core/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { ThemeService } from '../core/services/theme.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  user!:User ;
  constructor(private userService: UserService, private router: Router,
    private toast : ToastrService,private themeService:ThemeService
  ) {
    userService.userObservable.subscribe({
      next:(user)=>{
        this.user = user
      }
    })
  }

  canActivate(): boolean {

    if (this.user.token) {
      return true;
    } else {
      this.themeService.switchToDarkTheme()
      this.toast.info('Login to proceed please')
      this.router.navigate(['/login']); // Redirect if not logged in

      return false;
    }
  }
}
