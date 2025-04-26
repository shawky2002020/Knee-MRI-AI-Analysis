import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NotificationSchema } from '../../../core/models/notification.model';
import { NotificationService } from '../../../core/services/notification.service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit, OnChanges {
  constructor(private notificationService: NotificationService) {}
  ngOnInit(): void {
    this.notificationService.getAllNotifications().subscribe({
      next: (res) => {
        this.notifications = res;
      },
    });
  }

  notifications!: NotificationSchema[];

  // Control visibility
  @Input() isVisible = true; // Property to control visibility
  @Output() VisibleEmitter = new EventEmitter<boolean>();

  closeNotification(index: number): void {
    this.notificationService
      .deleteNotification(this.notifications[index])
      .subscribe({
        next: () => {
          this.notifications = this.notifications.splice(index, 1);
          this.notifications = this.notificationService.notifications;
        },
      });
    const notificationCloseBtns = document.querySelectorAll(
      '.notification .read-btn'
    );
    notificationCloseBtns[index].classList.add('read');
  }

  closeNotificationView(): void {
    const notificationContianer = document.querySelector('.notifications');
    if (notificationContianer) {
      gsap.to(notificationContianer, {
        opacity: 0,
        x: '100%',
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          this.isVisible = false; // Set visibility to false after animation
          this.VisibleEmitter.emit(this.isVisible); // Emit the visibility change
        }
      });
    } else {
      // fallback if container not found
      this.isVisible = false;
      this.VisibleEmitter.emit(this.isVisible);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isVisible'] && changes['isVisible'].currentValue) {
      // Only animate when becoming visible
      setTimeout(() => {
        const notificationContianer = document.querySelector('.notifications');
        if (notificationContianer) {
          gsap.set(notificationContianer, { opacity: 0, x: '100%' });
          gsap.to(
            notificationContianer,
            { opacity: 1, x: '0%', duration: 0.5, ease: 'power2.out' }
          );
        }
      });
    }
  }
}
