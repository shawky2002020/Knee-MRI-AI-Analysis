import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MriRoutingModule } from './mri-routing.module';
import { UploadComponent } from './upload/upload.component';
import { HistoryComponent } from './history/history.component';
import { ReportComponent } from './report/report.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnalyzeComponent } from './analyze/analyze.component';
import { LoaderModule } from '../../shared/components/loader/loader.module';

@NgModule({
  declarations: [
    UploadComponent,
    HistoryComponent,
    ReportComponent,
    AnalyzeComponent,
  ],
  imports: [
    CommonModule,
    MriRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderModule
  ]
})
export class MriModule { }
