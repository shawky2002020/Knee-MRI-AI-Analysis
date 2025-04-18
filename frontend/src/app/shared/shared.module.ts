import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ModalComponent } from './components/modal/modal.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NotificationComponent } from './components/notification/notification.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { NotificationModule } from './components/notification/notification.module';
import { AppLayoutComponent } from './components/layout/app-layout/app-layout.component';
import { HomeLayoutComponent } from './components/layout/home-layout/home-layout.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    ModalComponent,
    FileUploaderComponent,
    HeaderComponent,
    HeaderComponent,
    HomeLayoutComponent,
    AppLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NotificationModule
  ],
  exports:[
    FileUploaderComponent,
    NavbarComponent,
    SidebarComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
