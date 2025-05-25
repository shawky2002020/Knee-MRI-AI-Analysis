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
    
    // Group scans by view type
    const sagittalScans: MriScan[] = [];
    const coronalScans: MriScan[] = [];
    const axialScans: MriScan[] = [];
    
    // Sort scans into their respective view types
    mriScans.forEach(scan => {
      if (scan.metadata.view_type === 'sagittal') {
        sagittalScans.push(scan);
      } else if (scan.metadata.view_type === 'coronal') {
        coronalScans.push(scan);
      } else if (scan.metadata.view_type === 'axial') {
        axialScans.push(scan);
      }
      
    });
    
    
    // Add sagittal scans to form
    sagittalScans.forEach((scan, index) => {
      form.append('sagittal', scan.imageFile, scan.imageFile.name);
    });
    
    // Add coronal scans to form
    coronalScans.forEach((scan, index) => {
      form.append('coronal', scan.imageFile, scan.imageFile.name);
    });
    
    // Add axial scans to form
    axialScans.forEach((scan, index) => {
      form.append('axial', scan.imageFile, scan.imageFile.name);
    });
    
    // Add metadata (combine all metadata into one object)
    const metadata = {
      name: mriScans[0]?.metadata.name || '',
      age: mriScans[0]?.metadata.age || 0,
      gender: mriScans[0]?.metadata.gender || '',
      type: mriScans[0]?.metadata.type || '',
      fileType: mriScans[0]?.metadata.fileType || ''
    };
    
    form.append('metadata', JSON.stringify(metadata));

    this.toast.info('Uploading MRI scans to AI service...');
    console.log('form==>',form.getAll('axial'));
    
    
    return this.http.post<MriDiagnosticResponse>(url.MRI_AI_PROCESS, form, {
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
