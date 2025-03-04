import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MriRoutingModule } from './mri-routing.module';
import { UploadComponent } from './upload/upload.component';
import { HistoryComponent } from './history/history.component';
import { ReportComponent } from './report/report.component';
import { SharedModule } from '../../shared/shared.module';
import { HeaderComponent } from '../../layout/header/header.component';

@NgModule({
  declarations: [
    UploadComponent,
    HistoryComponent,
    ReportComponent,
  ],
  imports: [
    CommonModule,
    MriRoutingModule,
    SharedModule
  ]
})
export class MriModule { }
