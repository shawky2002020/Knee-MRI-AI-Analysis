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

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit {
  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  @ViewChild('textEl') text!: ElementRef;
  @ViewChild('btnEl') btn!: ElementRef;
  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;
  t1 = gsap.timeline();

  ngAfterViewInit() {
    const text1 = document.querySelector('.text-container h1') as HTMLElement;
    const words = text1?.textContent?.split(' ');
    text1.innerHTML =
      words?.map((word) => `<span>${word}</span>`).join(' ') || '';
    const spans = document.querySelectorAll('.text-container h1 span');

    const video = this.videoElement.nativeElement;
    video.play().catch(() => {
      console.log('Autoplay prevented, attempting to play manually.');
      video.muted = true;
      video.play();
    });

    this.t1
      .fromTo(
        this.videoElement.nativeElement,
        { opacity: 0, x: '100vw',scaleX: 3.8 },

        { opacity: 1, duration: 3, x: 0,scaleX:1 ,ease: 'power2.out' }
      )
      .fromTo(
        '.text-container h1',
        { opacity: 0 , y:50 },
        { opacity: 1, y: 0, ease: 'power1' },
        '>-1'
      )
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
  }
}
