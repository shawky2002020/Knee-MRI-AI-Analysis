import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { MriScan } from '../models/mri-scan.model';
import * as url from '../../data/url';
import { MriDiagnosticResponse } from '../models/ai-result.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  constructor(
    private http: HttpClient,
    private toast: ToastrService
  ) { }
  
  processMRI(mriScans: MriScan[]): Observable<HttpEvent<any>> {
    const form = new FormData();
    mriScans.forEach((mriscan, index) => {
        form.append(`scan_${index}`, mriscan.imageFile);
        form.append(`metadata_${index}`, JSON.stringify(mriscan.metadata));
    });

    this.toast.info('Uploading MRI scans to AI service...');
    
    return this.http.post<MriDiagnosticResponse>(url.MRI_UPLOAD, form, {
      reportProgress: true,
      observe: 'events',
    }).pipe(
      tap((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress) {
          // Calculate upload progress
          const progress = Math.round(100 * event.loaded / (event.total || 1));
          if (progress === 100) {
            this.toast.info('Upload complete. Processing MRI scans...');
          }
        } else if (event.type === HttpEventType.Response) {
          // Upload and processing complete
          this.toast.success('MRI scans processed successfully!');
        }
      })
    );
  }
}
