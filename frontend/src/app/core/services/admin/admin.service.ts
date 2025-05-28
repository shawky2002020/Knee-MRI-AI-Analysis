import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DiagnosisDistributionResponse, UserScanDistributionResponse } from '../../models/admin/scans-result';
import { usersResponse, UsersStatsResponse } from '../../models/admin/users-result';
import * as url from '../../../data/url'
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http : HttpClient,private toast : ToastrService) { }


  getUserStats(): Observable<UsersStatsResponse> {
    const timeRange = '30days'
    const params =new HttpParams().set('timeRange',timeRange)
    return this.http.get<UsersStatsResponse>(url.ADMIN_GET_USERSTATES,{params});
  }
  
  
  //SCANS
  getDiagnosisDistribution():Observable<DiagnosisDistributionResponse>{
    return this.http.get<DiagnosisDistributionResponse>(url.ADMIN_GET_DIAGNOSISDISTRIBUTION)
  }
  getUserScans():Observable<UserScanDistributionResponse>{
    return this.http.get<UserScanDistributionResponse>(url.ADMIN_GET_USERSCANS)
  }

  
}


