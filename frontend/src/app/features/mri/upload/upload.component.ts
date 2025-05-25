import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import gsap from 'gsap';
import { MriScanService } from '../../../core/services/mri-scan.service';
import { AiService } from '../../../core/services/ai.service';
import { MetaData, MriScan } from '../../../core/models/mri-scan.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css',
})
export class UploadComponent implements AfterViewInit {
  @ViewChild('video') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('uploadEl') upload!: ElementRef<any>;
  @ViewChild('textEl') text!: ElementRef<any>;
  @Input() metadata :MetaData = {} as MetaData;
  t1 = gsap.timeline();

  uploadedFileUrls: string[] = [];
  uploadedTypes = {
    'axial':false,
    'coronal':false,
    'sagittal':false,
  }
  allUploaded = false;
  constructor(
    private toastr : ToastrService,
    private aiService : AiService
  ){
    // Clear any previously stored MRI scans from localStorage
    localStorage.clear();
    const keys = Object.keys(localStorage).filter(key => key.startsWith('mriscan_') || key.startsWith('scan_'));
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
  uploadFinished(event:string){

    this.uploadedTypes[event as keyof typeof this.uploadedTypes] = true;
    this.checkAllTypesUploaded();
    this.toastr.success(`${event} Files uploaded successfully`.toUpperCase());
    
  }
  checkAllTypesUploaded(){
    if (Object.values(this.uploadedTypes).every(value => value === true)) {
      this.allUploaded = true;
    }
  }
  base64ToFile(base64DataUrl: string, filename: string): File {
    if (!base64DataUrl || typeof base64DataUrl !== 'string') {
      throw new Error('Invalid base64 data');
    }
  
    const parts = base64DataUrl.split(',');
    if (parts.length !== 2) {
      throw new Error('Malformed base64 data URL');
    }
  
    const mimeMatch = parts[0].match(/data:(.*);base64/);
    if (!mimeMatch) {
      throw new Error('Could not extract MIME type from base64 string');
    }
    const mimeType = mimeMatch[1];
    const base64 = parts[1];
  
    const binary = atob(base64);
    const length = binary.length;
    const array = new Uint8Array(length);
  
    for (let i = 0; i < length; i++) {
      array[i] = binary.charCodeAt(i);
    }
  
    return new File([array], filename, { type: mimeType });
  }
  
  
  

  retrieveScansFromLocalStorage(): MriScan[] {
    const scans: MriScan[] = [];
    const axial_keys = Object.keys(localStorage).filter(key => key.startsWith(`axial`));
    const coronal_keys = Object.keys(localStorage).filter(key => key.startsWith(`coronal`));
    const sagittal_keys = Object.keys(localStorage).filter(key => key.startsWith(`sagittal`));
    console.log(sagittal_keys);
    
    axial_keys.forEach(key => {
      let fileData = localStorage.getItem(key);
      if (fileData) {
        try {
          // Try to parse as JSON (for new format)
          const parsed = JSON.parse(fileData);
          if (parsed && parsed.base64Image) {
            fileData = parsed.base64Image;
          }
        } catch (e) {
          // If parsing fails, assume it's a plain base64 string (old format)
        }
        const fileName = `scan_${Date.now()}.${this.metadata?.fileType || 'png'}`;
        const file = fileData ? this.base64ToFile(fileData, fileName) : new File([], fileName);
        if (!this.metadata) {
          this.metadata = {} as any; // or use the correct type/interface for metadata
        }
        const scan: MriScan = {
          metadata: {...this.metadata,view_type:'axial'},
          imageFile: file
        };
        scans.push(scan);
      }
    });
    sagittal_keys.forEach(key => {
      let fileData = localStorage.getItem(key);
      if (fileData) {
        try {
          // Try to parse as JSON (for new format)
          const parsed = JSON.parse(fileData);
          if (parsed && parsed.base64Image) {
            fileData = parsed.base64Image;
          }
        } catch (e) {
          // If parsing fails, assume it's a plain base64 string (old format)
        }
        // If you store additional metadata, parse it here
        const mimeType = this.metadata?.fileType ? `image/${this.metadata.fileType}` : 'image/png';
        const fileName = `scan_${Date.now()}.${this.metadata?.fileType || 'png'}`;
        const file = fileData ? this.base64ToFile(fileData, fileName) : new File([], fileName);
        
        const scan: MriScan = {
          metadata: {...this.metadata,view_type:'sagittal'},
          imageFile: file
        };
        scans.push(scan);
      }
    });
    coronal_keys.forEach(key => {
      let fileData = localStorage.getItem(key);
      if (fileData) {
        try {
          // Try to parse as JSON (for new format)
          const parsed = JSON.parse(fileData);
          if (parsed && parsed.base64Image) {
            fileData = parsed.base64Image;
          }
        } catch (e) {
          // If parsing fails, assume it's a plain base64 string (old format)
        }
        // If you store additional metadata, parse it here
        const mimeType = this.metadata?.fileType ? `image/${this.metadata.fileType}` : 'image/png';
        const fileName = `scan_${Date.now()}.${this.metadata?.fileType || 'png'}`;
        const file = fileData ? this.base64ToFile(fileData, fileName) : new File([], fileName);
        if (!this.metadata) {
          this.metadata = {} as any;
        }
        
        const scan: MriScan = {
          metadata: {...this.metadata,view_type:'coronal'},
          imageFile: file
        };
        scans.push(scan);
      }
    });
    console.log(scans);
    console.log(this.metadata);
    
    
    return scans;
  }
  

  

  submitFiles(): void {
    const scans = this.retrieveScansFromLocalStorage();
    console.log('scans',scans);
    
    if (scans.length === 0) {
      this.toastr.error('No scans to submit.');
      return;
    }
    this.toastr.info('Submitting scans...');
    // Implement the logic to submit scans to the server
    this.aiService.processMRI(scans).subscribe(
      {
        
        next:(res)=>{
        console.log(res);
        this.toastr.success('Scans submitted successfully.');
      },
      error:(err)=>{
        console.log(err);
        this.toastr.error('Error submitting scans.');
      }
    }
    );
  }
}
