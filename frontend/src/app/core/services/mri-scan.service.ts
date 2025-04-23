import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { DiagnosticResult, MriDiagnosticResponse, ScanResponse } from '../models/ai-result.model';
import * as url from '../../data/url';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class MriScanService {
  constructor(private http: HttpClient, private toastr: ToastrService,private router:Router) {}

private mriScanSubject = new BehaviorSubject<MriDiagnosticResponse>(new MriDiagnosticResponse());
public mriScan$ = this.mriScanSubject.asObservable();

updateMriScan(scan: MriDiagnosticResponse) {
  this.mriScanSubject.next(scan);
  this.router.navigate(['/mri/report'])
}

getMriScan(): MriDiagnosticResponse {
  return this.mriScanSubject.value;
}
  getScans(filters: {  // Added all fillters here
    page?: number,
    limit?: number,
    timeRange?: string,
    name?: string,
    status?: string
  } = {}): Observable<ScanResponse> {
    let params = new HttpParams();
    if (filters.page) params = params.append('page', filters.page);
    if (filters.limit) params = params.append('limit', filters.limit);
    if (filters.timeRange) params = params.append('timeRange', filters.timeRange);
    if (filters.name) params = params.append('name', filters.name);
    if (filters.status) params = params.append('status', filters.status);
    return this.http.get<ScanResponse>(url.MRI_GET_SCANS, { params });
  }

  getScanByName(name: string, page?: number, limit?: number, timeRange?: string): Observable<ScanResponse> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }
    if (limit) {
      params = params.append('limit', limit);
    }
    if (timeRange) {
      params = params.append('timeRange', timeRange);
    }
    return this.http.get<ScanResponse>(url.MRI_GET_SCANS + '/' + name, { params })
  }

  getScanByStatus(status: string, page?: number, limit?: number, timeRange?: string): Observable<ScanResponse> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page);
    }
    if (limit) {
      params = params.append('limit', limit);
    }
    if (timeRange) {
      params = params.append('timeRange', timeRange);
    }
    return this.http.get<ScanResponse>(url.MRI_GET_SCANS_BY_STATUS + '/' + status, { params })
  }
}

