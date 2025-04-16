import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { ModalComponent } from './components/modal/modal.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NotificationModule } from "./components/notification/notification.module";



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    FileUploaderComponent,
    ModalComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NotificationModule
],
  exports:[
    NavbarComponent,
    SidebarComponent,
    FileUploaderComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
