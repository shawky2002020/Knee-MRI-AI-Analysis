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
        this.mriScans = [];
        if (err.error && err.error.message) {
          this.toast.error(err.error.message);
        } else {
          this.toast.error('Scan not found');
        }
      }
    });
  }
  filterScans() {
    // If both filters are at their default, load all scans
    if (
      (this.selectedDate === 'Date' || !this.selectedDate) &&
      (this.selectedStatus === 'Diagnostic status' || !this.selectedStatus)
    ) {
      this.loadScans();
      return;
    }

    // Prepare query params
    const params: any = {};
    if (this.selectedDate !== 'Date' && this.selectedDate) {
      params.timeRange = this.selectedDate;
    }
    if (
      this.selectedStatus !== 'Diagnostic status' &&
      this.selectedStatus !== '' &&
      this.selectedStatus
    ) {
      params.status = this.selectedStatus.toLowerCase();
    }

    this.scansService.getScans(params).subscribe({
      next: (res: ScanResponse) => {
        this.mriScans = Object.values(res.scans);
      },
      error: (err) => {
        this.mriScans = [];
        this.toast.error('No scans found for the selected filters');
      }
    });
  }

  viewDetails(scan:MriDiagnosticResponse){
    this.scansService.updateMriScan(scan)
  }

  statusDropdownOpen = false;
  dateDropdownOpen = false;

  selectStatus(status: string) {
    this.selectedStatus = status;
    this.statusDropdownOpen = false;
    this.filterScans();
  }

  selectDate(date: string) {
    this.selectedDate = date;
    this.dateDropdownOpen = false;
    this.filterScans();
  }
}
