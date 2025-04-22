import { Component, OnInit } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
import { MriScanService } from '../../../core/services/mri-scan.service';
import { MriDiagnosticResponse, ScanResponse } from '../../../core/models/ai-result.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent implements OnInit {
  mriScans : MriDiagnosticResponse[] =[]
  searchTerm: string = '';

  constructor(private toast: ToastrService, private scansService: MriScanService) {}

  ngOnInit(): void {
    this.loadScans();
  }

  loadScans() {
    this.scansService.getScans().subscribe({
      next:(res:ScanResponse)=>{
        this.mriScans = Object.values(res.scans) 
      },
      error:(err)=>{
        this.toast.error('Failed to load')
      }
    })
  }

  searchScans() {
    if (!this.searchTerm.trim()) {
      this.loadScans();
      return;
    }
    this.scansService.getScanByName(this.searchTerm).subscribe({
      next: (res: ScanResponse) => {
        this.mriScans = Object.values(res.scans);
      },
      error: (err) => {
        this.mriScans = []
        this.toast.error(err.message.body);
      }
    });
  }

  viewDetails(scan:MriDiagnosticResponse){
    this.scansService.updateMriScan(scan)
  }
}
