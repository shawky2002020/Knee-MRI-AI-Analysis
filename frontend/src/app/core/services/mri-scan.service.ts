import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { MriDiagnosticResponse, MriScan } from '../models/mri-scan.model';
import * as url from '../../data/url';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class MriScanService {
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  uploadMri(mriscan: MriScan): Observable<HttpEvent<any>> {
    const form = new FormData();
    form.append('scan', mriscan.imageFile);
    form.append('metadata', JSON.stringify(mriscan.metadata));

    return this.http.post<MriDiagnosticResponse>(url.MRI_UPLOAD, form, {
      reportProgress: true,
      observe: 'events',
    });
  }

  getScans ():Observable<MriDiagnosticResponse[]>{
    return this.http.get<MriDiagnosticResponse[]>(url.MRI_GET_SCANS)
  }
}

