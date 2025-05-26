import { Component, Input, OnInit } from '@angular/core';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css'
})
export class AppLayoutComponent implements OnInit {
  showNotificationsMenu: boolean = true;
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
  handleReadAll(){
    this.notificationCount =0;
  }
}
