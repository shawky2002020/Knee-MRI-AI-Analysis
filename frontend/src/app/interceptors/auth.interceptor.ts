import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../core/models/user.model';
import { UserService } from '../core/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService, private router: Router,private toastr:ToastrService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user: User = this.userService.currentUser; // Retrieve user

    if (user.token) {
      req = req.clone({
        setHeaders: {
          access_token: user.token,
        },
      });
    } else {
      // console.log('no token');
      
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 450) {
          this.userService.logout();
          this.router.navigate(['/login'])
          this.toastr.info('Please log in again','Session expired') //token expired
        }
        return throwError(error);
      })
    );
  }
}
