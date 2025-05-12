import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as url from '../../data/url'
import { Observable, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ScanResponse } from '../models/ai-result.model';
import { usersResponse, UsersStatsResponse } from '../models/admin/users-result';
import { DiagnosisDistributionResponse, UserScanDistributionResponse } from '../models/admin/scans-result';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http : HttpClient,private toast : ToastrService) { }

  //USERS
  getAllUsers(
    filters: {
      // Added all fillters here
      page?: number;
      limit?: number;
      timeRange?: string;
      name?: string;
    } = {}
  ): Observable<usersResponse> {
    let params = new HttpParams();
    if (filters.page) params = params.append('page', filters.page);
    if (filters.limit) params = params.append('limit', filters.limit);
    if (filters.timeRange)
      params = params.append('timeRange', filters.timeRange);
    if (filters.name) params = params.append('name', filters.name);
    
    return this.http.get<usersResponse>(url.ADMIN_GET_USERS,{params}).pipe(tap({
      next : (res) => {
        this.toast.success('Get all users successfully')
        console.log(res);
      },
      error : (err) => {
        console.log(err);
        this.toast.error('Get all users failed')
      }
    }))
  }
  
  deleteUser(id : string){
    return this.http.delete(url.ADMIN_DELETE_USER+'/' + id).pipe(tap({
      next : (res) => {
        this.toast.success('Delete user successfully')
        console.log(res);
      },
      error : (err) => {
        console.log(err);
        this.toast.error('Delete user failed')
      }
    }))
  }
  updateUser(id : string, user : any){
    return this.http.put(url.ADMIN_UPDATE_USER +'/'+id, user)
  }
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


