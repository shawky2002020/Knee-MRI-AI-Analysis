import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models/user.model';
import { AdminService } from '../../../../core/services/admin/admin.service';
import { DiagnosisDistributionResponse, UserScanDistributionResponse } from '../../../../core/models/admin/scans-result';
import { UsersStatsResponse } from '../../../../core/models/admin/users-result';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{
  constructor(private adminService:AdminService,private toast:ToastrService){}
  ngOnInit(): void {
    this.loadAll();
  }

  usersStats! : UsersStatsResponse;
  scanDistribution! : DiagnosisDistributionResponse;
  usersScanCount! : UserScanDistributionResponse;
  mostActiveUsers! : User[];
  loading : boolean = true;
  loaded = []


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
        this.usersScanCount = results.scanCount;
        console.log('All data loaded');
        this.loading =false;
        this.toast.success('All data loaded')
      },
      error: (error) => {
        console.error('Error loading data:', error);
        this.toast.error('Error loading data',error.error);
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