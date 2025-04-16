import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  showNotificationsMenu: boolean = false;
  @Input() title: string = '';
  showNotifications() {
    this.showNotificationsMenu = !this.showNotificationsMenu;
  }
  handleEmitter(event: boolean) {
    this.showNotificationsMenu = event;
  }
}
