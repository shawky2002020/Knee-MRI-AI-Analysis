import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationSchema } from '../../../core/models/notification.model';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
//const notifications = [
//   { title: 'New Message', message: 'You have received a new message.' },
//   { title: 'System Update', message: 'A new system update is available.' },
//   { title: 'Reminder', message: 'Your appointment is scheduled for tomorrow.' }
// ];
export class NotificationComponent implements OnInit {
  constructor(private notificationService : NotificationService) {
  }
  ngOnInit(): void {
    this.notificationService.getAllNotifications().subscribe({
      next:(res)=>{
        this.notifications=res;
      }
    })
  }

  notifications !: NotificationSchema[];



  // Control visibility
  @Input () isVisible = true; // Property to control visibility
  @Output() VisibleEmitter = new EventEmitter<boolean>();

  closeNotification(index: number): void {
    this.notificationService.deleteNotification(this.notifications[index]).subscribe({
      next:()=>{
        this.notifications = this.notifications.splice(index,1);
        this.notifications = this.notificationService.notifications;
      }
    });
    const notificationCloseBtns = document.querySelectorAll('.notification .read-btn');
    notificationCloseBtns[index].classList.add('read');

    
  }

  closeNotificationView(): void {
    this.isVisible = false; // Set visibility to false
    this.VisibleEmitter.emit(this.isVisible); // Emit the visibility change
  }
}
