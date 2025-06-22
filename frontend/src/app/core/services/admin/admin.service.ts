import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {
  DiagnosisDistributionResponse,
  UserScanDistributionResponse,
} from '../../models/admin/scans-result';
import {
  usersResponse,
  UsersStatsResponse,
} from '../../models/admin/users-result';
import * as url from '../../../data/url';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient, private toast: ToastrService) {}

  getUserStats(): Observable<UsersStatsResponse> {
    const timeRange = '3days';
    const params = new HttpParams().set('timeRange', timeRange);
    return this.http
      .get<UsersStatsResponse>(url.ADMIN_GET_USERSTATES, { params })
      .pipe(
        tap({
          next: (res) => {
            res.mostActiveUsers.map((user) => {
              user.name_letters = '';
              user.name.split(' ').map((name) => {
                user.name_letters += name.charAt(0).toUpperCase();
              });
           

            });
            res.mostRecentUsers.map((user) => {
              user.name_letters = '';
              user.name.split(' ').map((name) => {
                user.name_letters += name.charAt(0).toUpperCase();
              });
              const date = new Date(
                user.lastLogin || user.createdAt || new Date()
              );
              const readableDate = date.toLocaleString('en-US', {
                formatMatcher: 'basic',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
              });

              user.lastLog = readableDate;
            });
          },
        })
      );
  }

  //SCANS
  getDiagnosisDistribution(): Observable<DiagnosisDistributionResponse> {
    return this.http.get<DiagnosisDistributionResponse>(
      url.ADMIN_GET_DIAGNOSISDISTRIBUTION
    );
  }
  getUserScans(): Observable<UserScanDistributionResponse> {
    return this.http.get<UserScanDistributionResponse>(url.ADMIN_GET_USERSCANS);
  }
}
