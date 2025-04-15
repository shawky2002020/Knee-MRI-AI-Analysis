import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MriScan } from '../models/mri-scan.model';
import * as url from '../../data/url';
import { MriDiagnosticResponse } from '../models/ai-result.model';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  constructor(private http:HttpClient) { }
  processMRI(mriscan: MriScan): Observable<HttpEvent<any>> {
    const form = new FormData();
    form.append('scan', mriscan.imageFile);
    form.append('metadata', JSON.stringify(mriscan.metadata));

    return this.http.post<MriDiagnosticResponse>(url.MRI_UPLOAD, form, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
