import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { ThemeService } from '../../../core/services/theme.service';
import gsap from 'gsap';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  user!: User;
  isLight!: boolean;
  constructor(
    private router: Router,
    private userService: UserService,
    private themeService: ThemeService
  ) {
    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    });
    themeService.themeObservable.subscribe((newTheme) => {
      this.isLight = newTheme === 'light';
    });
  }
  logout() {
    this.userService.logout();
  }
  toggleHamburger() {
    const navIcon = document.querySelector('.nav-icon');
    const overlay = document.querySelector('.overlay');
  
    if (navIcon?.classList.contains('active')) {
      this.closeHamburgerMenu();
    } else {
      this.openHamburgerMenu();
    }
  
    overlay?.addEventListener('click', () => {
      this.closeHamburgerMenu();
    });
  }
  
  openHamburgerMenu() {
    const navIcon = document.querySelector('.nav-icon');
    const hamburger = document.querySelector('.hamburger');
    const overlay = document.querySelector('.overlay');
    const navList = document.querySelector('.nav-list');
    const navItems = document.querySelectorAll('.nav-list li');
  
    const twine = gsap.timeline();
  
    twine
      .from(navIcon, {
        opacity: 0,
        duration: 0.1,
        onComplete: () => {
          navIcon?.classList.add('active');
          overlay?.classList.add('active');
          navList?.classList.remove('hidden');
        },
      })
      .to(navList, {
        opacity: 1,
        duration: 0.1,
        ease: 'power2.out',
      })
      .fromTo(
        navItems,
        { opacity: 0 },
        {
          opacity: 1,
          stagger: { amount: 0.5 },
          duration: 1,
          delay: 1,
          ease: 'power2.out',
          onComplete: () => {
            navList?.classList.add('active');
          },
        },
        '<'
      );
  }
  
  closeHamburgerMenu() {
    const navIcon = document.querySelector('.nav-icon');
    const hamburger = document.querySelector('.hamburger');
    const overlay = document.querySelector('.overlay');
    const navList = document.querySelector('.nav-list');
  
    const twine = gsap.timeline({ defaults: { duration: 0.2 } });
  
    twine
      .fromTo(hamburger, { opacity: 1 }, { opacity: 0, duration: 0.1 })
      .fromTo(
        navList,
        { opacity: 1 },
        {
          opacity: 0,
          duration: 0.1,
          ease: 'power2.out',
          onComplete: () => {
            navList?.classList.remove('active');
            navList?.classList.add('hidden');
            navIcon?.classList.remove('active');
            overlay?.classList.remove('active');
            gsap.fromTo(hamburger, { opacity: 0 }, { opacity: 1, duration: 1.5 });
          },
        },
        '0.2'
      );
  }
  
}


