import { Component, OnInit } from '@angular/core';
import { DiagnosisDistributionResponse, UserScanDistributionResponse } from '../../../../core/models/admin/scans-result';
import { UsersStatsResponse } from '../../../../core/models/admin/users-result';
import { User } from '../../../../core/models/user.model';
import { AdminService } from '../../../../core/services/admin/admin.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrl: './admin-reports.component.css'
})
export class AdminReportsComponent implements OnInit {
  constructor(private adminService : AdminService ,private toast:ToastrService){}
  ngOnInit(): void {
    this.loadAll();
    
  }

  usersStats! : UsersStatsResponse;
  scanDistribution! : DiagnosisDistributionResponse;
  usersScanCount! : UserScanDistributionResponse;
  mostActiveUsers! : User[];
  mostRecentUsers! : User[];
  loading=true;

  loadAll() {
    forkJoin({
      stats: this.getUsersStats(),
      distribution: this.getScanDistribution(),
      scanCount: this.getUsersScanCount()
    }).subscribe({
      next: (results) => {
        this.usersStats = results.stats;
        this.mostActiveUsers = results.stats.mostActiveUsers;
        this.scanDistribution = results.distribution;
        this.mostRecentUsers = results.stats.mostRecentUsers;
        this.usersScanCount = results.scanCount;
        console.log('All data loaded');
        this.loading =false;
      },
      error: (error) => {
        this.toast.error('Error loading data',error.error)
      }
    });
  }
  
  getUsersStats() {
    return this.adminService.getUserStats();
  }
  
  getScanDistribution() {
    return this.adminService.getDiagnosisDistribution();
  }
  
  getUsersScanCount() {
    return this.adminService.getUserScans();
  }
}  