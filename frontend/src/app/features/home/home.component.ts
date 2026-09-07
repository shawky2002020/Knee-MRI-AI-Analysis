import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  Inject,
  Renderer2,
  OnDestroy,
} from '@angular/core';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  @ViewChild('textEl') text!: ElementRef;
  @ViewChild('btnContainerEl') btnContainer!: ElementRef;
  @ViewChild('hand1El') hand1!: ElementRef;
  @ViewChild('hand2El') hand2!: ElementRef;
  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;

  private prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  loading(): void {
    // Navigates via routerLink
  }

  ngAfterViewInit() {
    if (this.prefersReducedMotion) {
      // Skip all GSAP animations in reduced-motion mode; just show content
      return;
    }

    const h2Elements = this.document.querySelectorAll('.h2-wrap');
    const stepElements = this.document.querySelectorAll('.step');
    const cta = this.document.querySelector('.cta') as HTMLElement;
    const quote = this.document.querySelector('.quote .text') as HTMLElement;
    const video = this.videoElement.nativeElement;

    // LIGHTNING EFFECT — word-by-word reveal in the quote section
    if (quote) {
      const words = quote.textContent?.split(' ') ?? [];
      quote.innerHTML = words.map((word) => `<span>${word}</span>`).join(' ');
      const spans = this.document.querySelectorAll('.quote .text span');

      const lightTwine = gsap.timeline({
        scrollTrigger: {
          trigger: quote,
          toggleActions: 'play reset play restart',
        },
      });
      lightTwine
        .from(quote, { opacity: 0, y: 100 })
        .fromTo(
          spans,
          { opacity: 0.1 },
          {
            opacity: 1,
            duration: 1,
            stagger: { amount: 1.5 },
            ease: 'power4.out',
          }
        );
    }

    // H2 SECTION HEADING ANIMATIONS
    Array.from(h2Elements).forEach((h2, i) => {
      const h2Tl = gsap.timeline({
        scrollTrigger: {
          trigger: h2,
          toggleActions: 'play reverse play reverse',
        },
        defaults: { ease: 'power3.inOut' },
      });

      h2Tl.from(h2, {
        opacity: 0,
        y: i === 0 ? 50 : 0,
        x: i === 0 ? 0 : i % 2 ? '-120%' : '120%',
        duration: 1,
      });
      h2Tl.from(
        h2.children,
        { y: 150, duration: 2, ease: 'power2.out' },
        '>-.5'
      );
    });

    // HERO SECTION
    const heroTl = gsap.timeline();
    heroTl
      .fromTo(
        video,
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
        { opacity: 0 },
        { opacity: 1, duration: 1, y: 0, ease: 'power2.out' },
        '>'
      )
      .fromTo(
        this.btnContainer.nativeElement,
        { opacity: 0 },
        { opacity: 1, duration: 1, y: 0, ease: 'power2.out' },
        '>'
      );

    ScrollTrigger.refresh();

    // HOW IT WORKS SECTION — hand animations
    if (this.hand1 && this.hand2) {
      const handTl = gsap.timeline({
        scrollTrigger: {
          trigger: this.hand1.nativeElement,
          start: '300% bottom',
          end: '450% center',
          scrub: 1,
        },
      });

      handTl
        .fromTo(
          this.hand1.nativeElement,
          { x: 700, y: -700, filter: 'brightness(0)', opacity: 0 },
          { x: 0, y: 0, opacity: 1, filter: 'brightness(2)', ease: 'power2.out' }
        )
        .fromTo(
          this.hand2.nativeElement,
          { x: -700, y: 700, filter: 'brightness(0)', opacity: 0 },
          { x: 0, y: 0, opacity: 1, filter: 'brightness(1)', ease: 'power2.out' },
          0
        )
        .to(this.hand1.nativeElement, {
          x: 700,
          y: -700,
          opacity: 0,
          filter: 'brightness(0)',
          ease: 'power2.in',
        })
        .to(this.hand2.nativeElement, {
          x: -700,
          y: 700,
          opacity: 0,
          filter: 'brightness(0)',
          ease: 'power2.in',
        });
    }

    // STEP REVEAL ANIMATIONS
    stepElements.forEach((step) => {
      gsap.from(step, {
        x: -400,
        opacity: 0,
        ease: 'power4.inOut',
        duration: 1,
        scrollTrigger: {
          trigger: step,
          toggleActions: 'play resume resume reset',
        },
      });
    });

    // FEATURES SECTION
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
      .from(
        '.feature-item',
        {
          opacity: 0,
          duration: 1,
          stagger: { amount: 1 },
          ease: 'power3.out',
        },
        '>-1.5'
      );

    // CTA SECTION
    if (cta) {
      gsap.from(cta.children, {
        opacity: 0,
        stagger: 0.3,
        duration: 1,
        scrollTrigger: {
          trigger: '.cta button, .cta a',
          toggleActions: 'play reverse play reverse',
        },
      });
    }

    // VIDEO PLAY
    video.play().catch(() => {
      video.muted = true;
      video.play();
    });

    setTimeout(() => ScrollTrigger.refresh(), 100);
  }

  ngOnDestroy() {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  }
}
