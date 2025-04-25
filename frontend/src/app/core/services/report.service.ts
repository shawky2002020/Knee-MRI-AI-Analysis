import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as url from '../../data/url';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient) { }
  generateReport(patientId: string, diagnosis: string, confidence: number, views: string[], date: Date, heatmapUrls: string[]) {
    const reportData = {
      patientId,
      diagnosis,
      confidence,
      views,
      date,
      heatmapUrls
    };

    return this.http.post(url.GET_REPORT, reportData, { responseType: 'blob' });
  }
}
