import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NotificationService } from '../../../../core/services/notification.service';
import { LoaderService } from '../../../../core/services/loader.service';
import { UserService } from '../../../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css',
})
export class AppLayoutComponent implements OnInit, AfterViewInit {
  showNotificationsMenu: boolean = false;
  @Input() title: string = 'ACLyze AI';
  notificationCount: number = 0;
  @ViewChild('Count') notifCount!: ElementRef;

  constructor(
    private notificationService: NotificationService,
    private loadingService: LoaderService,
    private toast: ToastrService,
    private userService: UserService
  ) {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.loadingService.LoaderStatus) {
        this.toast.success(`Hello ${this.userService.currentUser.name}`)

      }
      this.loadingService.hideLoader();
    }, 2000);
  }

  ngOnInit(): void {
    this.notificationService.notification$.subscribe({
      next: (res) => {
        this.notificationCount = res.length;
        console.log('checked');
        
        if (this.notifCount?.nativeElement) {
          if (!this.notifCount.nativeElement.classList.contains('new-notif') && this.notificationCount > 0) {
            
            this.notifCount.nativeElement.classList.add('new-notif');
          }
        }
      },
    });
  }
  showNotifications() {
    this.showNotificationsMenu = !this.showNotificationsMenu;
    if (this.notifCount?.nativeElement) {
      this.notifCount.nativeElement.classList.remove('new-notif');
    }
  }
  handleEmitter(event: boolean) {
    this.showNotificationsMenu = event;
    if (this.notifCount?.nativeElement) {
      this.notifCount.nativeElement.classList.remove('new-notif');
    }
  }
  handelReadEmitter() {
    this.notificationCount--;
  }
  handleReadAll() {
    this.notificationCount = 0;
  }
  handleNewNotif(event: boolean) {
  }
}
