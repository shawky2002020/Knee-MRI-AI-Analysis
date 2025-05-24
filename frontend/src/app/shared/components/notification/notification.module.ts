import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { SharedModule } from "../../shared.module";
import { LoaderModule } from '../loader/loader.module';

@NgModule({
  declarations: [NotificationComponent],
  imports: [CommonModule,LoaderModule],
  exports: [NotificationComponent], // So other modules can use it
})
export class NotificationModule {}
