import { Component, OnInit } from '@angular/core';
import { DiagnosisDistributionResponse, UserScanDistributionResponse } from '../../../../core/models/admin/scans-result';
import { UsersStatsResponse } from '../../../../core/models/admin/users-result';
import { User } from '../../../../core/models/user.model';
import { AdminService } from '../../../../core/services/admin/admin.service';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrl: './admin-reports.component.css'
})
export class AdminReportsComponent implements OnInit {
  constructor(private adminService : AdminService){}
  ngOnInit(): void {
    this.getUsersStats();
    this.getScanDistribution();
    this.getUsersScanCount();
  }

  usersStats! : UsersStatsResponse;
  scanDistribution! : DiagnosisDistributionResponse;
  usersScanCount! : UserScanDistributionResponse;
  mostActiveUsers! : User[];

  getUsersStats(){
    this.adminService.getUserStats().subscribe({
      next : (res) => {
        this.usersStats = res;
        this.mostActiveUsers = this.usersStats.mostActiveUsers
      }
    })
  }
  getScanDistribution(){
    this.adminService.getDiagnosisDistribution().subscribe({
      next : (res) => {
        this.scanDistribution = res;
          
      }
    })
  }

  getUsersScanCount(){
    this.adminService.getUserScans().subscribe({
      next : (res) => {
        this.usersScanCount = res;
      }
    })
  }
  
}
