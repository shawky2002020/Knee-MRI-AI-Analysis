import { Component, OnInit } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
import { MriScanService } from '../../../core/services/mri-scan.service';
import { MriResponse } from '../../../core/models/mri-scan.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent implements OnInit {
  mriScans : MriResponse[] =[]
  constructor(private toast: ToastrService, private mriService: MriScanService) {}
  ngOnInit(): void {
    this.mriService.getScans().subscribe({
      next:(res)=>{
        this.mriScans =Object.values(res) 
      },
      error:(err)=>{
        this.toast.warning(err.error,'failed to load')
      }
    })
  }

}
