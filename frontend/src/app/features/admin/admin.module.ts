import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminSettingsComponent } from './components/admin-settings/admin-settings.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { AdminLogsComponent } from './components/admin-logs/admin-logs.component';
import { AdminReportsComponent } from './components/admin-reports/admin-reports.component';
import { AdminNotificationsComponent } from './components/admin-notifications/admin-notifications.component';
import { UserEditComponent } from './components/user-management/user-edit.component';
import { SharedModule } from "../../shared/shared.module";
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    UserManagementComponent,
    AdminSidebarComponent,
    AdminHeaderComponent,
    AdminSettingsComponent,
    AdminProfileComponent,
    AdminLogsComponent,
    AdminReportsComponent,
    AdminNotificationsComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule
]
})
export class AdminModule { }
