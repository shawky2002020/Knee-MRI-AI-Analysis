import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { NotificationModule } from "../../shared/components/notification/notification.module";
import { RouterModule } from '@angular/router';
import { LoaderModule } from "../../shared/components/loader/loader.module";


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    RouterModule.forChild([
        { path: '', component: DashboardComponent }
    ]),
    LoaderModule
]
})
export class DashboardModule { }
