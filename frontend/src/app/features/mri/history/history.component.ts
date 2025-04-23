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
  page: number = 1;
  totalPages: number = 1;

  constructor(private toast: ToastrService, private scansService: MriScanService) {}

  ngOnInit(): void {
    this.loadScans(this.page);
  }


  loadScans(page: number = 1) {
    this.scansService.getScans({ page }).subscribe({
      next: (res: ScanResponse) => {
        this.mriScans = Object.values(res.scans);
        this.page = res.page;
        this.totalPages = res.totalPages;
      },
      error: (err) => {
        this.toast.error('Failed to load');
      }
    });
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.filterScans(page);
  }
  filterScans(page: number = 1) {
    // If both filters are at their default, load all scans
    if (
      (this.selectedDate === 'Date' || !this.selectedDate) &&
      (this.selectedStatus === 'Diagnostic status' || !this.selectedStatus)
      && (!this.searchTerm.trim()) && page==1
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
    if (this.searchTerm.trim()) {
      params.name = this.searchTerm;    
    }
    params.page = page;

    this.scansService.getScans(params).subscribe({
      next: (res: ScanResponse) => {
        this.mriScans = Object.values(res.scans);
        this.page = res.page;
        this.totalPages = res.totalPages;
        if (this.mriScans.length === 0) {
          this.toast.info('No scans found for the selected filters');
        }
      },
      error: (err) => {
        this.mriScans = [];
        this.toast.info('No scans found for the selected filters');
      }
    });
  }

  reset(){
    this.selectedDate = 'Date';
    this.selectedStatus = 'Diagnostic status';
    this.searchTerm = '';
    this.loadScans();
  }

  viewDetails(scan:MriDiagnosticResponse){
    this.scansService.viewed(scan._id).subscribe({
     next: (res:MriDiagnosticResponse) => {
      this.scansService.updateMriScan(scan);
      this.toast.success('Successfully viewed');
     }, 
    })
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

  scrollToTop(){
    window.scrollTo(0,0)
  }
}
