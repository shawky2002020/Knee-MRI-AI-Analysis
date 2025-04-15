import { Component, OnInit } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
import { MriScanService } from '../../../core/services/mri-scan.service';
import { MriDiagnosticResponse } from '../../../core/models/ai-result.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent implements OnInit {
  mriScans : MriDiagnosticResponse[] =[]
  constructor(private toast: ToastrService, private mriService: MriScanService) {}
  ngOnInit(): void {
    this.mriService.getScans().subscribe({
      next:(res)=>{
        this.mriScans =Object.values(res) 
      },
      error:(err)=>{
        this.toast.error('Failed to load')
      }
    })
  }
  viewDetails(scan:MriDiagnosticResponse){
    this.mriService.updateMriScan(scan)
  }

}
