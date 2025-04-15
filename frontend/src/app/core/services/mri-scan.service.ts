import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { DiagnosticResult, MriDiagnosticResponse } from '../models/ai-result.model';
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
  getScans ():Observable<MriDiagnosticResponse[]>{
    return this.http.get<MriDiagnosticResponse[]>(url.MRI_GET_SCANS)
  }
}

