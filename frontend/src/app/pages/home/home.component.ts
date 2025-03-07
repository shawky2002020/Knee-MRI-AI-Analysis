import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  Inject,
  Renderer2,
} from '@angular/core';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UserService } from '../../core/services/user.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit {
  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    userService: UserService
  ) {
    userService.logout();
  }

  @ViewChild('textEl') text!: ElementRef;
  @ViewChild('btnEl') btn!: ElementRef;
  @ViewChild('hand1El') hand1!: ElementRef;
  @ViewChild('hand2El') hand2!: ElementRef;
  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;
  t1 = gsap.timeline();

  ngAfterViewInit() {
    let h2Elemnts = this.document.querySelectorAll('.h2-wrap');

    //LIGHTENING EFFECT
    const text1 = document.querySelector('.text-container h1') as HTMLElement;
    const words = text1?.textContent?.split(' ');
    text1.innerHTML =
      words?.map((word) => `<span>${word}</span>`).join(' ') || '';
    const spans = document.querySelectorAll('.text-container h1 span');

    const video = this.videoElement.nativeElement;

    Array.from(h2Elemnts).forEach((h2,i) => {
      const h2twine = gsap.timeline({
        scrollTrigger:{
          trigger:h2,
          toggleActions:'play reverse play reverse',
  
        }
        ,defaults:{
          ease:'power3.inOut'
        }
      });
  
      h2twine.from(h2,{
        opacity:0,
        y: i==0? '50' : 0,
        x:i==0? 0 :  i%2?  '-120%':'120%',
        duration:1
      })
      h2twine.from(h2.children, {
        y: 150,
        duration: 2,
        ease: 'power2.out',
      },'>-.5');

    });

    //HERO SECTION
    this.t1
      .fromTo(
        this.videoElement.nativeElement,
        { opacity: 0, x: '100vw', scaleX: 3.8 },

        { opacity: 1, duration: 3, x: 0, scaleX: 1, ease: 'power2.out' }
      )
      .fromTo(
        '.text-container h1',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, ease: 'power1' },
        '>-1'
      )
      .fromTo(
        '.text-container p',
        { opacity: 0, y: 50 },
        { opacity: 1, duration: 1, y: 0, ease: 'power2.out' },
        '-=0.5'
      )
      .fromTo(
        this.btn.nativeElement,
        { opacity: 0, y: 50 },
        { opacity: 1, duration: 1, y: 0, ease: 'power2.out' },
        '-=0.5'
      );

    //HOW IT WORKS SECTION
    const t2 = gsap.timeline({
      scrollTrigger: {
        trigger: this.hand1.nativeElement, // Single trigger for both
        start: '200% bottom',
        end: '300% center',
        scrub: true, // Enables smooth scrolling animation
      },
    });

    // Hand 1 (right side)
    t2.fromTo(
      this.hand1.nativeElement,
      { x: 700, y: -700, filter: 'brightness(0)', opacity: 0 },
      { x: 0, y: 0, opacity: 1, filter: 'brightness(2)', ease: 'power2.out' }
    );

    // Hand 2 (left side) - runs at the same time
    t2.fromTo(
      this.hand2.nativeElement,
      { x: -700, y: 700, filter: 'brightness(0)', opacity: 0 },
      { x: 0, y: 0, opacity: 1, filter: 'brightness(1)', ease: 'power2.out' },
      0 // Starts at the same time as hand1
    );

    // Move both hands back out (with scrub)
    t2.to(
      this.hand1.nativeElement,
      {
        x: 700,
        y: -700,
        opacity: 0,
        filter: 'brightness(0)',
        ease: 'power2.in',
      }
      // Delay before moving back
    );
    t2.to(
      this.hand2.nativeElement,
      {
        x: -700,
        y: 700,
        opacity: 0,
        filter: 'brightness(0)',
        ease: 'power2.in',
      }
      // Moves out at the same time as hand1
    );

    gsap.from('.step', {
      x: -400,
      stagger: {
        amount: 0.5,
      },
      opacity: 0,
      ease: 'power4.inOut',
      duration: 2,
      scrollTrigger: {
        trigger: '.steps',
        end: 'top',
        scrub: true,

        // scrub:1
      },
    });

    //FEATURES SECTION
    gsap.from('.features img', {
      opacity: 0.5,
      y: 50,
      duration: 4,
      repeat:-1,
      yoyo:true,
      ease:'power2.inOut',
      scrollTrigger: {
        trigger: '.features img',
        toggleActions: 'play reverse play reverse',
      },
    });
    gsap.from('.feature-item', {
      stagger: {
        amount: 2,
      },
      scrollTrigger: {
        trigger: '.feature-item',
        toggleActions: 'play reverse play reverse',
      },
      opacity: 0,
      duration: 2,
      ease: 'power3.out',
    });

    video.play().catch(() => {
      console.log('Autoplay prevented, attempting to play manually.');
      video.muted = true;
      video.play();
      video.play();
    });

    // .fromTo(
    //   spans,
    //   { opacity: 0.1, delay: .2 },
    //   {
    //     y: '0%',
    //     opacity: 1,
    //     duration: 1,
    //     stagger: { amount: 3 },
    //     ease: 'power4.out',
    //   }
    // )
  }
}
