import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  showNotificationsMenu: boolean = false;
  @Input() title: string = '';
  notificationCount !: number ;
  constructor(private notificationService : NotificationService){

  }
  ngOnInit(): void {
this.notificationService.getNotificationsCount().subscribe({
  next:(resCount)=>{
    this.notificationCount = resCount.count;
  }
})  
this.notificationService.onNotification((data)=>{
  this.notificationCount++
})
}
  showNotifications() {
    this.showNotificationsMenu = !this.showNotificationsMenu;
  }
  handleEmitter(event: boolean) {
    this.showNotificationsMenu = event;
  }
  handelReadEmitter(){
    this.notificationCount--;
  }
}
