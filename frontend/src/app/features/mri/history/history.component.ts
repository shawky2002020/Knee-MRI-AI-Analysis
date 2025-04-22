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
  selectedDate:string = 'Date';
  selectedStatus:string = 'Diagnostic status';


  constructor(private toast: ToastrService, private scansService: MriScanService) {}

  ngOnInit(): void {
    this.loadScans();
  }

  getStatusColor(status: string): string {
    if (status === 'positive') {
      return 'red';  
    } 
    if (status === 'normal') {
      return 'green'; 
    }
    return 'black';
  }
  round(value:number){
    return Math.round(value*100) 
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
  filterScans() {
    if (this.selectedDate === 'today' && this.selectedStatus === 'all') {
      this.loadScans();
      return; 
    } 
  }

  viewDetails(scan:MriDiagnosticResponse){
    this.scansService.updateMriScan(scan)
  }
}
