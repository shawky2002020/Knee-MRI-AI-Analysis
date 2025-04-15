import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent {
  notifications = [
    { title: 'New Message', message: 'You have received a new message.' },
    { title: 'System Update', message: 'A new system update is available.' },
    { title: 'Reminder', message: 'Your appointment is scheduled for tomorrow.' }
  ];

  @Input () isVisible = true; // Property to control visibility
  @Output() VisibleEmitter = new EventEmitter<boolean>();


  constructor() {}

  closeNotification(index: number): void {
    this.notifications.splice(index, 1);
  }

  closeNotificationView(): void {
    this.isVisible = false; // Set visibility to false
    this.VisibleEmitter.emit(this.isVisible); // Emit the visibility change
  }
}
