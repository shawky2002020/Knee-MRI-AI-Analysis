import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { AppLayoutComponent } from './components/layout/app-layout/app-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ModalComponent } from './components/modal/modal.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { HomeLayoutComponent } from './components/layout/home-layout/home-layout.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { PopupComponent } from './components/popup/popup.component';
import { AdminLayoutComponent } from './components/layout/admin-layout/admin-layout.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ScanFilterComponent } from './components/scan-filter/scan-filter.component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationModule } from './components/notification/notification.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AppLayoutComponent,
    NavbarComponent,
    ModalComponent,
    FileUploaderComponent,
    HomeLayoutComponent,
    PopupComponent,
    AdminLayoutComponent,
    PaginationComponent,
    ScanFilterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NotificationModule,
    FormsModule,
  ],
  exports: [
    SidebarComponent,
    FileUploaderComponent,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    AppLayoutComponent,
    HomeLayoutComponent,
    PopupComponent,
    PaginationComponent,
    ScanFilterComponent,
  ]
})
export class SharedModule { }
