import { Injectable } from '@angular/core';
import { User, userResponse } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import * as url from '../../data/url';
// import { ThemeService } from './theme.service';
import { Router } from '@angular/router';
import { LoaderService } from './loader.service';

//Store Key for LocalStorage
export const USER_KEY = 'user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );
  public userObservable: Observable<User>;

  constructor(
    private http: HttpClient,
    // private themeService: ThemeService,
    private router: Router,
    private loadingService:LoaderService,

  ) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): User {
    return this.userSubject.value;
  }

  login(user: User): Observable<userResponse> {
    return this.http.post<userResponse>(url.USERS_LOGIN, user).pipe(
      tap({
        next: (res) => {

          const newUser = {
            ...res.user,
            token: res.token,
          };
          this.setUserToLocalStorage(newUser);
          this.userSubject.next(newUser);
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  register(user: User): Observable<userResponse> {
    return this.http.post<userResponse>(url.USERS_REGISTER, user).pipe(
      tap({
        next: (res) => {
          this.loadingService.showLoader()

          // this.themeService.switchToLightTheme();
          const newUser = {
            ...res.user,
            token: res.token,
          };
          this.setUserToLocalStorage(newUser);
          this.userSubject.next(newUser);
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    // this.themeService.switchToDarkTheme();
    this.router.navigate(['/']);
  }

  private setUserToLocalStorage(user: User) {
    if (localStorage.getItem(USER_KEY)) {
      localStorage.removeItem(USER_KEY);
    }
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUserFromLocalStorage(): User {
    if (typeof window !== 'undefined' && localStorage) {
      const userJson = localStorage.getItem(USER_KEY);
      if (userJson) {
        try {
          return JSON.parse(userJson) as User;
        } catch (error) {
          console.error('Error parsing user data from localStorage:', error);
          localStorage.removeItem(USER_KEY);
        }
      }
    }
    return new User();
  }

  loginWithGoogle(idToken: string): Observable<userResponse> {
    return this.http.post<userResponse>(url.USERS_BASE + '/google-login', { idToken }).pipe(
      tap({
        next: (res) => {
          const newUser = {
            ...res.user,
            token: res.token,
          };
          this.setUserToLocalStorage(newUser);
          this.userSubject.next(newUser);
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }
}
