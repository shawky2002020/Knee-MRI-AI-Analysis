import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { AppLayoutComponent } from './components/layout/app-layout/app-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ModalComponent } from './components/modal/modal.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { NotificationModule } from './components/notification/notification.module';
import { HomeLayoutComponent } from './components/layout/home-layout/home-layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AppLayoutComponent,
    NavbarComponent,
    ModalComponent,
    FileUploaderComponent,
    HomeLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NotificationModule
  ],
  exports: [
    SidebarComponent,
    FileUploaderComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    AppLayoutComponent,
    HomeLayoutComponent
  ]
})
export class SharedModule { }
