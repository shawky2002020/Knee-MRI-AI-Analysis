import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';
import gsap from 'gsap';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('cardcontainerEl') cardContainer!: ElementRef;
  @ViewChild('bgEl') bg!: ElementRef;
  @ViewChild('headerEl') header!: ElementRef;
  @ViewChild('recentEl') recent!: ElementRef;

  t1 = gsap.timeline();

  constructor(private userService: UserService,private themeService : ThemeService) {
    themeService.switchToLightTheme()
  }
  ngAfterViewInit(): void {
   

    const cards = document.querySelectorAll('.card');


    // this.t1
    //   .from(this.bg.nativeElement, {
    //     opacity: 0,
    //     duration: 1,
    //     ease: 'power3.inOut',
    //   })
    //   .from(
    //     this.header.nativeElement,
    //     {
    //       opacity: 0,
    //       x: -20,
    //       duration: 1,
    //     },
    //     '>'
    //   )
    //   .from(
    //     this.cardContainer.nativeElement.children,
    //     {
    //       opacity: 0,
    //       y: -50,
    //       stagger: {
    //         amount: 0.5,
    //       },
    //       ease: 'back.Out',
    //     },
    //     '>-.5'
    //   )
    //   .from(
    //     this.recent.nativeElement,
    //     {
    //       opacity: 0,
    //       y: '30vh',
    //       duration: 1,
    //     },
    //     '>-.5'
    //   );
  }

  user: User = this.userService.currentUser;
}
