import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private theme = new BehaviorSubject<string>(localStorage.getItem('theme') || 'dark');
  public themeObservable = this.theme.asObservable();

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  public get themeValue(): string {
    return this.theme.getValue(); 
  }
  

  applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
      this.switchToLightTheme();
      this.theme.next('light');
    } else {
      this.switchToDarkTheme();
      this.theme.next('dark');
    }
  }

  switchToLightTheme() {
    this.renderer.addClass(document.body, 'light');
    this.theme.next('light');
    localStorage.setItem('theme', 'light');
  }

  switchToDarkTheme() {
    this.renderer.removeClass(document.body, 'light');
    this.theme.next('dark');
    localStorage.setItem('theme', 'dark');
  }
}
