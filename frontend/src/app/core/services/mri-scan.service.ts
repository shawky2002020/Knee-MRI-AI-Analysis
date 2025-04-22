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
  getScans (page ?:number , limit ?: number):Observable<ScanResponse>{
    let params = new HttpParams();
    if(page){
      params = params.append('page', page);
    }
    if(limit){
      params = params.append('limit', limit);
    }
    return this.http.get<ScanResponse>(url.MRI_GET_SCANS, {params})
  }
  getScanByName(name:string):Observable<ScanResponse>{
    return this.http.get<ScanResponse>(url.MRI_GET_SCANS + '/' + name)
  }
}

