import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';

@NgModule({
  declarations: [NotificationComponent],
  imports: [CommonModule],
  exports: [NotificationComponent], // So other modules can use it
})
export class NotificationModule {}
