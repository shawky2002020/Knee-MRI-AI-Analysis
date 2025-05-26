import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NotificationSchema } from '../../../core/models/notification.model';
import { NotificationService } from '../../../core/services/notification.service';
import { gsap } from 'gsap';
import { ToastrService } from 'ngx-toastr';
import { MriDiagnosticResponse } from '../../../core/models/ai-result.model';
import { MriScanService } from '../../../core/services/mri-scan.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit, OnChanges ,AfterViewInit {
  loading: boolean = false;
  constructor(private notificationService: NotificationService,private toast:ToastrService,
    private scansService:MriScanService
  ) {}
  ngAfterViewInit(): void {
    
  }
  ngOnInit(): void {
    
    this.loading =true;
    this.notificationService.onNotification((data: any) => {
      this.toast.success('notification recieved');
      this.notifications = [data, ...this.notifications];
    });
    this.notificationService.getAllNotifications().subscribe({
      next: (res) => {
        this.loading =false;
        this.notifications = res;
      },
      error: (err) => {
        this.loading =false;
        
        this.toast.error(err.error.message);
      }
     
      
    });
  }

  notifications!: NotificationSchema[];

  // Control visibility
  @Input() isVisible = true; // Property to control visibility
  @Output() VisibleEmitter = new EventEmitter<boolean>();
  @Output() readEmitter = new EventEmitter<boolean>();
  @Output() readAllEmitter = new EventEmitter<boolean>();

  readNotification(index: number): void {
    this.notificationService
      .deleteNotification(this.notifications[index])
      .subscribe({
        next: () => {
          this.notifications = this.notifications.splice(index, 1);
          this.notifications = this.notificationService.notifications;
          this.readEmitter.emit(true);
        },
      });
    const notificationCloseBtns = document.querySelectorAll(
      '.notification .read-btn'
    );
    notificationCloseBtns[index].classList.add('read');
  }
  readAllNotifications(): void {
    this.notificationService.deleteAllNotifications().subscribe({
      next: () => {
        this.notifications = [];
        this.notifications = this.notificationService.notifications;
        this.readAllEmitter.emit(true);
      },
    });
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
  @ViewChild('notificationsContainer') notificationElement!: ElementRef;
  
  ngOnChanges(changes: SimpleChanges): void {
    // Only run animation when isVisible changes to true
    if (changes['isVisible'] && changes['isVisible'].currentValue === true) {
      // Use ViewChild instead of querySelector
      setTimeout(() => {
        
        if (this.notificationElement) {
          gsap.set(this.notificationElement.nativeElement, { opacity: 0, x: '100%' });
          gsap.to(
            this.notificationElement.nativeElement,
            { opacity: 1, x: '0%', duration: 0.5, ease: 'power2.out' }
          );
        }
      }, 0);
    }
  }



  viewDetails(scanId:string){
    this.scansService.getScanById(scanId).subscribe({
      next: (res) => {
        this.scansService.updateMriScan(res);
      },
      error: (err) => {
        this.toast.error(err.error.message);
      }
    })
    this.scansService.viewed(scanId).subscribe({
     next: (res:MriDiagnosticResponse) => {
      this.toast.success('Successfully viewed');
     }, 
    })
  }
}
