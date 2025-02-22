import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MriRoutingModule } from './mri-routing.module';
import { UploadComponent } from './upload/upload.component';
import { HistoryComponent } from './history/history.component';
import { ReportComponent } from './report/report.component';
import { FileUploaderComponent } from '../../shared/components/file-uploader/file-uploader.component';

@NgModule({
  declarations: [
    UploadComponent,
    HistoryComponent,
    ReportComponent,
    FileUploaderComponent
  ],
  imports: [
    CommonModule,
    MriRoutingModule
  ]
})
export class MriModule { }
