import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import gsap from 'gsap';
import { MriScanService } from '../../../core/services/mri-scan.service';
import { AiService } from '../../../core/services/ai.service';
import { MriScan } from '../../../core/models/mri-scan.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class UploadComponent implements AfterViewInit {
  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('uploadEl') upload!: ElementRef<any>;
  @ViewChild('textEl') text!: ElementRef<any>;
  t1 = gsap.timeline();

  uploadedFileUrls: string[] = [];
  constructor(
    private toastr : ToastrService,
    private aiService : AiService
  ){
    // Clear any previously stored MRI scans from localStorage
    const keys = Object.keys(localStorage).filter(key => key.startsWith('mriscan_'));
    keys.forEach(key => localStorage.removeItem(key));
  }
  ngAfterViewInit(): void {
    // Retrieve mriscan from local storage
    const mriscanData = localStorage.getItem('mriscan');
    if (mriscanData) {
      const mriscan = JSON.parse(mriscanData);
      console.log('Retrieved mriscan:', mriscan);
      // Use the mriscan object as needed
    }

  }

  onUploadSuccess(fileUrls: string[]) {
    this.uploadedFileUrls = [...this.uploadedFileUrls, ...fileUrls];
    this.uploadedFileUrls = Array.from(new Set(this.uploadedFileUrls));
  }
  test(){
    console.log('uploadedFileUrls',this.retrieveScansFromLocalStorage());
    
  }
  base64ToFile(base64: string, filename: string, mimeType: string): File {
    const arr = base64.split(',');
    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
  
    return new File([u8arr], filename, { type: mimeType });
  }
  

  retrieveScansFromLocalStorage(): MriScan[] {
    const scans: MriScan[] = [];
    const keys = Object.keys(localStorage).filter(key => key.startsWith('mriscan_'));
  
    keys.forEach(key => {
      const scanData = localStorage.getItem(key);
      if (scanData) {
        const mriscanRaw = JSON.parse(scanData);
  
        const base64 = mriscanRaw.base64Image; // stored base64 string
        const mimeType = mriscanRaw.metadata?.fileType ? `image/${mriscanRaw.metadata.fileType}` : 'image/png';
        const fileName = `scan_${Date.now()}.${mriscanRaw.metadata?.fileType || 'png'}`;
        const file = this.base64ToFile(base64, fileName, mimeType);
  
        const scan: MriScan = {
          metadata: mriscanRaw.metadata,
          imageFile: file
        };
  
        scans.push(scan);
      }
    });
  
    return scans;
  }
  

  

  submitFiles(): void {
    const scans = this.retrieveScansFromLocalStorage();
    console.log('scans',scans);
    
    if (scans.length === 0) {
      this.toastr.error('No scans to submit.');
      return;
    }
  
    // Implement the logic to submit scans to the server
    this.aiService.processMRI(scans).subscribe(
      (response) => {
        this.toastr.success('Scans submitted successfully.');
        console.log('Scans submitted successfully:', response);
      }
    );
  }
}
