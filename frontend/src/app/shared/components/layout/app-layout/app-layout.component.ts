import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NotificationService } from '../../../../core/services/notification.service';
import { LoaderService } from '../../../../core/services/loader.service';
import { UserService } from '../../../../core/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css',
})
export class AppLayoutComponent implements OnInit,AfterViewInit {
  showNotificationsMenu: boolean = false;
  @Input() title: string = '';
  notificationCount!: number;
  constructor(
    private notificationService: NotificationService,
    private loadingService: LoaderService,
    private toast:ToastrService,
    private userService: UserService
  ) {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      
      this.loadingService.hideLoader()

    }, 2000);
  }
 
  ngOnInit(): void {

    this.notificationService.getNotificationsCount().subscribe({
      next: (resCount) => {
        this.notificationCount = resCount.count;
      },
    });
    this.notificationService.onNotification((data) => {
      this.notificationCount++;
    });
  }
  showNotifications() {
    this.showNotificationsMenu = !this.showNotificationsMenu;
  }
  handleEmitter(event: boolean) {
    this.showNotificationsMenu = event;
  }
  handelReadEmitter() {
    this.notificationCount--;
  }
  handleReadAll() {
    this.notificationCount = 0;
  }
  handleNewNotif(){
    this.notificationCount++
  }
}
