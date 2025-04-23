import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { HistoryComponent } from './history/history.component';
import { ReportComponent } from './report/report.component';
import { AuthGuard } from '../../guards/auth.guard';
import { AnalyzeComponent } from './analyze/analyze.component';

const routes: Routes = [
  { path: 'analyze', component: AnalyzeComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'report', component: ReportComponent },

]
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MriRoutingModule { }
