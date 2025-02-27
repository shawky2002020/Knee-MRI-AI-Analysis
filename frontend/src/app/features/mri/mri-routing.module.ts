import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { HistoryComponent } from './history/history.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  { path: 'upload', component: UploadComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'report', component: ReportComponent }
]
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MriRoutingModule { }
