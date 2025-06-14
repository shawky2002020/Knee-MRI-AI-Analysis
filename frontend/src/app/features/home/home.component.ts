import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  Inject,
  Renderer2,
  QueryList,
  ViewChildren,
} from '@angular/core';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UserService } from '../../core/services/user.service';
import { ThemeService } from '../../core/services/theme.service';

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
    userService: UserService,
    private themeService : ThemeService
  ) {
    userService.logout()
    themeService.switchToDarkTheme()
    localStorage.removeItem('activeItem')
  }

  @ViewChild('textEl') text!: ElementRef;
  @ViewChild('btnContainerEl') btnContainer!: ElementRef;
  @ViewChild('btnEl') btn!: ElementRef;
  @ViewChild('hand1El') hand1!: ElementRef;
  @ViewChild('hand2El') hand2!: ElementRef;
  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChildren('Question') questionELem!: QueryList<ElementRef>;
  t1 = gsap.timeline();

  ngAfterViewInit() {
    let h2Elemnts = this.document.querySelectorAll('.h2-wrap');
    let stepElemnts = this.document.querySelectorAll('.step');
    const cta = this.document.querySelector('.cta') as HTMLElement
    //LIGHTENING EFFECT
    const quote = document.querySelector('.quote .text') as HTMLElement;
    const words = quote?.textContent?.split(' ');
    quote.innerHTML =
      words?.map((word) => `<span>${word}</span>`).join(' ') || '';
    const spans = document.querySelectorAll('.quote .text span');

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

    const lighttwine = gsap.timeline({
      scrollTrigger:{
        trigger: quote,
        toggleActions:'play reset play restart'
      },
    })
    lighttwine
    .from(quote,{
      opacity:0,
      y:100
    })
    .fromTo(
        spans,
        { opacity: 0.1, delay: .2 },
        {
          y: '0%',
          opacity: 1,
          duration: 1,
          stagger: { amount: 1.5 },
          ease: 'power4.out',
        }
       )

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
        '>-2'
      )
      .fromTo(
        '.text-container p',
        { opacity: 0},
        { opacity: 1, duration: 1, y: 0, ease: 'power2.out' },
        '>'
      )
      .fromTo(
        this.btnContainer.nativeElement,
        { opacity: 0},
        { opacity: 1, duration: 1, y: 0, ease: 'power2.out' },
        '>'
      );
      ScrollTrigger.refresh();


    //HOW IT WORKS SECTION
    const t2 = gsap.timeline({
      scrollTrigger: {
        trigger: this.hand1.nativeElement, // Single trigger for both
        start: '300% bottom',
        end: '450% center',
        scrub: 1, // Enables smooth scrolling animation
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
    );
    t2.to(
      this.hand2.nativeElement,
      {
        x: -700, y: 700,
        opacity: 0,
        filter: 'brightness(0)',
        ease: 'power2.in',
      }
    );

    stepElemnts.forEach((step)=>{
      
      gsap.from(step, {
        x: -400,
        stagger: {
          amount: 0.5,
        },
        opacity: 0,
        ease: 'power4.inOut',
        duration: 1,
        scrollTrigger: {
          trigger: step,
          toggleActions:'play resume resume reset'
        },
      });
    })

    //FEATURES SECTION
    gsap.timeline({
      scrollTrigger: {
        trigger: '.features',
        start: 'top 80%', 
        toggleActions: 'play none none reverse',
      },
    })
      .from('.features img', {
        x: 1000,
        opacity: 0.6,
        duration: 2.5,
        ease: 'power3.out',
      })
      .from('.feature-item', {
        opacity: 0,
        duration: 1,
        stagger: { amount: 1 },
        ease: 'power3.out',
      });
    
    // Apply the infinite animation separately
    gsap.to('.features img', {
      opacity: 1,
      scale:.9,
      y:50,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    });
            video.play().catch(() => {
      console.log('Autoplay prevented, attempting to play manually.');
      video.muted = true;
      video.play();
      video.play();
    });

    this.questionELem.forEach((question)=>{
      question.nativeElement.addEventListener('click',()=>{
        console.log('clicked');
        
        if (question.nativeElement.classList.contains('active')) {
          question.nativeElement.classList.remove('active')    
        }
        else{
          console.log('added');
          
          question.nativeElement.classList.add('active')
        }
      })
    })

    gsap.from(cta.children,{
      opacity:0,
      stagger:.3,
      duration:1,
      scrollTrigger:{
        trigger:'.cta button',
        toggleActions:'play reverse play reverse',
      }
    })
    setTimeout(() => ScrollTrigger.refresh(), 100);
  }
  loading(){
    this.btn.nativeElement.classList.add('loading');
    console.log(this.btn.nativeElement);
    
  }
 
}
